# Plus One ホームページ作り直し Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Plus One株式会社のサイトを、見本「C プラス記号」の見た目で、動きのある長いトップページを持つサイトに作り直す。

**Architecture:** Next.js 15 の pages 方式はそのまま使う。MUI をやめ、CSS Modules と `styles/globals.css` の色変数で見た目を作る。3 ページ共通の枠（Head、ヘッダー、フッター）を `Layout` 部品 1 つにまとめ、動きは CSS と IntersectionObserver で付ける。

**Tech Stack:** Next.js 15（pages）、React 18、TypeScript、CSS Modules、next/font/google、vitest、@testing-library/react、jsdom

**Spec:** `docs/superpowers/specs/2026-11-15-site-redesign-design.md`

## Global Constraints

- URL は `/`、`/about`、`/contact` のまま。
- `pages/api/sendEmail.ts`、`components/GoogleAnalytics.tsx`、`lib/gtag.js`、`pages/_app.tsx` の処理は変えない。
- 依存の追加は開発用の vitest、@vitejs/plugin-react、@testing-library/react、@testing-library/jest-dom、@testing-library/user-event、jsdom だけ。MUI と emotion は外す。
- 色は `styles/globals.css` の変数だけを使う: `--bg: #f4f5f7`、`--ink: #12154a`、`--blue`（ロゴの紺。ロゴ画像から拾う）、`--yellow: #ffc928`、`--white: #ffffff`。
- 文字は Zen Kaku Gothic New（400 / 700 / 900）と Archivo Black（「+1」だけ）。
- ロゴ画像は `/plusone_logos/...` と先頭に `/` を付けて書き、元の大きさ（`Plus-One_logo.png` は 261×123、`Plus-One-CoLtd_text.gif` は 705×105）より大きく表示しない。ロゴは白か明るい地色の上に置く。
- 架空の事例、実績数、お客様の声は書かない。数字は「2016 年設立」「4 つの工事」「2 つの資格」だけ。
- `prefers-reduced-motion: reduce` のときは動きを止め、完成した状態で見せる。
- JavaScript が動かなくても内容が読める（現れる動きは、JS が動いたときだけ隠してから見せる）。
- 幅 375px で横スクロールが出ない。メニューは幅 640px 未満で開閉式にする。
- 文章に絵文字を使わない。コミットメッセージにも使わない。

## Review Focus

1. 動きを止める設定の利用者: 数字が 0 のまま、ブロックが透明のまま残らないこと（Task 3 でテスト）。
2. 写真が 1 枚も無い状態と、一部だけある状態: 枠が崩れず「写真準備中」が出ること（Task 4 でテスト）。
3. 送信の失敗（API が 500、通信エラー）: 電話番号入りの知らせが出て、入力内容が消えないこと（Task 6 でテスト）。
4. 空白だけの入力: 入力不足として扱い、送信しないこと（Task 6 でテスト）。
5. `/about` や `/contact` から「事業内容」「施工事例」を押したとき: トップページの該当位置へ移動すること（リンク先が `/#services`、`/#works`。Task 2 でテスト）。

---

## ファイルの構成

| ファイル | 役割 |
|---|---|
| `lib/site.ts` | 会社の情報（社名、住所、電話、メニュー項目、事業 4 種、数字）を 1 か所にまとめる |
| `data/works.ts` | 施工事例の一覧 |
| `components/Layout.tsx` + `.module.css` | Head、ヘッダー、本文、フッターの枠 |
| `components/Header.tsx` + `.module.css` | 上部メニュー（開閉式を含む） |
| `components/Footer.tsx` + `.module.css` | フッター（作り直し） |
| `components/Reveal.tsx` | 画面に入ったら現れる枠 |
| `components/CountUp.tsx` | 数え上がる数字 |
| `lib/useInView.ts`、`lib/useReducedMotion.ts` | 上 2 つが使う部品 |
| `components/home/*.tsx` + `Home.module.css` | Hero、Belt、Services、Diagnosis、Numbers、Works、Greeting、ContactCta |
| `components/ContactForm.tsx` + `.module.css` | 問い合わせフォーム（見た目と知らせ方を変更） |
| `components/StatusDialog.tsx` + `.module.css` | 送信中と結果の表示（BasicModal、CircularIndeterminate の置き換え） |
| `pages/index.tsx`、`about.tsx`、`contact.tsx`、`_document.tsx` | 作り直し |
| `styles/globals.css`、`styles/About.module.css` | 色変数、共通の決まり、会社概要の表 |
| `__tests__/*.test.tsx` | テスト |
| 削除 | `components/DrawerAppBar.tsx`、`BasicModal.tsx`、`CircularIndeterminate.tsx`、`HomeContents.tsx`、`HomeContents.module.css`、`About.module.css`（components 側）、`Contact.tsx`（空ファイル）、`styles/Home.module.css` |

---

### Task 1: 土台（依存、テスト環境、色と文字、共通の情報）

**Files:**
- Modify: `package.json`、`.gitignore`、`styles/globals.css`、`pages/_document.tsx`
- Create: `vitest.config.ts`、`vitest.setup.ts`、`lib/site.ts`、`__tests__/site.test.ts`

**Interfaces:**
- Produces（`lib/site.ts`）:
  - `SITE: { name: "Plus One株式会社"; description: string; url: "https://plusone-kk.vercel.app"; tel: "027-212-8093"; fax: "027-212-8049"; mobile: "070-4128-6043"; mail: "t.plus-one@outlook.com"; zip: "〒371-0224"; address: "群馬県前橋市河原浜町705-9" }`
  - `LOGO: { mark: { src: "/plusone_logos/Plus-One_logo.png"; width: 261; height: 123 }; text: { src: "/plusone_logos/Plus-One-CoLtd_text.gif"; width: 705; height: 105 } }`
  - `NAV: { label: string; href: string }[]` = 事業内容 `/#services`、施工事例 `/#works`、会社概要 `/about`、お問い合わせ `/contact`
  - `SERVICES: { title: string; text: string; image: string }[]`（住宅内装リフォーム `/Renovation.png`、店舗改装 `/Renovation2.png`、外構工事 `/brickblock.png`、水廻り工事 `/breakdown.png`）
  - `NUMBERS: { value: number; unit: string; label: string }[]` = `{2016, "年", "設立"}`、`{4, "つ", "の工事"}`、`{2, "つ", "の資格"}`

- [ ] **Step 1:** `npm uninstall @mui/material @mui/icons-material @emotion/react @emotion/styled` と、開発用の道具の `npm install -D` を実行する。`package.json` の scripts に `"test": "vitest run"` を足す。
- [ ] **Step 2:** `vitest.config.ts`（environment `jsdom`、`@` を作業フォルダ直下に向ける alias、CSS Modules のクラス名はそのまま返す設定）と `vitest.setup.ts`（`@testing-library/jest-dom/vitest` の読み込み、`IntersectionObserver` と `matchMedia` の代わりの部品）を作る。
- [ ] **Step 3:** 失敗するテスト `__tests__/site.test.ts` を書く。確認する内容: `LOGO` の 2 つの `src` が `/` で始まる、`NAV` が上の 4 件と一致する、`SERVICES` が 4 件、`NUMBERS` の値が `[2016, 4, 2]`。
- [ ] **Step 4:** `npm test` が失敗することを確かめ、`lib/site.ts` を書いて通す。
- [ ] **Step 5:** `styles/globals.css` を、色変数、`body` の地色と文字色、`a` の既定、`prefers-reduced-motion` の決まりに書き換える（今の `html { display:flex; height:100vh }` は消す）。`_document.tsx` の `lang` を `ja` にする。`.gitignore` に `.claude/` を足す。
- [ ] **Step 6:** コミット `chore: MUI を外しテスト環境と共通の情報を用意`

### Task 2: Layout、Header、Footer

**Files:**
- Create: `components/Layout.tsx`、`Layout.module.css`、`Header.tsx`、`Header.module.css`、`__tests__/Header.test.tsx`、`__tests__/Footer.test.tsx`
- Modify: `components/Footer.tsx`、`Footer.module.css`、`components/OGP.tsx`（変更なしで `Layout` から呼ぶ）

**Interfaces:**
- Consumes: `SITE`、`LOGO`、`NAV`
- Produces:
  - `Layout({ title?: string; children: ReactNode })`。`<title>` は `title` があれば `${title} | Plus One株式会社`、無ければ `Plus One株式会社 | 前橋のリフォーム・内装工事`。description は `SITE.description`。フォントのクラスを最上位に付ける。
  - `Header()`、`Footer()`

- [ ] **Step 1:** 失敗するテストを書く。
  - Header: ロゴ画像の `alt` が `Plus One株式会社`、`src` が `/plusone_logos/Plus-One_logo.png`、ロゴのリンク先が `/`。メニュー 4 件のリンク先が `NAV` と一致。開閉ボタン（`aria-label="メニューを開く"`）を押すと `aria-expanded` が `true` になり、もう一度押すと `false` に戻る。開いた状態でメニューのリンクを押すと閉じる。
  - Footer: 文字ロゴの `src` が `/plusone_logos/Plus-One-CoLtd_text.gif`。住所と電話番号が表示される。
- [ ] **Step 2:** 失敗を確かめ、3 つの部品を書いて通す。ヘッダーは上部固定で白地。ロゴは高さ 44px。640px 未満ではメニューを開閉式にする。フッターは白地にして文字ロゴを幅 280px 以下で置く。
- [ ] **Step 3:** コミット `feat: 共通の枠とヘッダー、フッターを作り直し`

### Task 3: 動きの部品

**Files:**
- Create: `lib/useInView.ts`、`lib/useReducedMotion.ts`、`components/Reveal.tsx`、`components/CountUp.tsx`、`__tests__/CountUp.test.tsx`、`__tests__/Reveal.test.tsx`

**Interfaces:**
- Produces:
  - `useReducedMotion(): boolean`
  - `useInView<T extends Element>(): [RefObject<T>, boolean]`（一度 true になったら戻らない）
  - `Reveal({ children, delay?: number, as?: keyof JSX.IntrinsicElements, className?: string })`。マウント後に `data-reveal="hidden"`、画面に入ったら `data-reveal="shown"`。動きを止める設定では最初から `shown`。サーバーが出す HTML には `data-reveal` を付けない。
  - `CountUp({ value: number, duration?: number })`。サーバーが出す HTML と動きを止める設定では `value` をそのまま表示。画面に入ったら 0 から `value` まで数え上げ、最後は必ず `value` になる。

- [ ] **Step 1:** 失敗するテストを書く。
  - CountUp: 動きを止める設定で `2016` をすぐ表示。通常の設定では、画面に入った合図のあと時間を進めると最後に `2016` を表示（vitest の偽タイマーと `requestAnimationFrame` の代わりを使う）。
  - Reveal: 動きを止める設定では `data-reveal="shown"`。通常の設定ではマウント直後 `hidden`、画面に入った合図のあと `shown`。
- [ ] **Step 2:** 失敗を確かめ、部品を書いて通す。`globals.css` に `[data-reveal="hidden"]`（透明、下に 24px）と `[data-reveal="shown"]`（0.7 秒で現れる）を足す。
- [ ] **Step 3:** コミット `feat: 現れる動きと数え上げの部品を追加`

### Task 4: トップページ

**Files:**
- Create: `data/works.ts`、`components/home/Hero.tsx`、`Belt.tsx`、`Services.tsx`、`Diagnosis.tsx`、`Numbers.tsx`、`Works.tsx`、`Greeting.tsx`、`ContactCta.tsx`、`Home.module.css`、`public/works/.gitkeep`、`__tests__/Works.test.tsx`、`__tests__/Home.test.tsx`
- Modify: `pages/index.tsx`

**Interfaces:**
- Consumes: `Layout`、`Reveal`、`CountUp`、`SITE`、`SERVICES`、`NUMBERS`
- Produces:
  - `type Work = { title: string; text: string; image: string }`（`image` は `public/works/` 内のファイル名。空文字なら写真なし）
  - `WORKS: Work[]`（初期値は 住宅内装リフォーム、店舗改装、水廻り工事 の 3 件。`image` はすべて空、`text` も空）
  - `Works({ works?: Work[] })`（既定値 `WORKS`）

- [ ] **Step 1:** 失敗するテストを書く。
  - Works: `image` が空の事例は「写真準備中」を表示し `img` を出さない。`image: "a.jpg"` の事例は `src="/works/a.jpg"`、`alt` が題名の `img` を出し「写真準備中」を出さない。空の一覧では事例の枠を出さず「準備中です」の一文を出す。
  - Home: `pages/index.tsx` を描くと、見出し「暮らしに、プラスワン。」、事業名 4 件、「住宅診断」、`id="services"` と `id="works"` の要素、電話番号 `027-212-8093`、`/contact` へのリンクがある。
- [ ] **Step 2:** 失敗を確かめ、部品を書いて通す。決める内容は次のとおり。
  - Hero: 左に見出し（太さ 900）と文「内装も、水廻りも、外構も。前橋の住まいと店舗に、もうひとつの良さを足します。」、ボタン 2 つ（「お問い合わせ」`/contact`、「事業内容を見る」`#services`）。右に Archivo Black の「+1」。「+」は黄色で 9 秒に 1 回 90 度回り、「1」は紺。高さは内容に合わせる（100vh にしない）。「+1」には `aria-hidden` を付ける。
  - Belt: 黄色の帯。事業名 4 件と「住宅診断」を「＋」でつないだ並びを 2 回続けて置き、18 秒で左へ流す。2 回目には `aria-hidden` を付ける。
  - Services: `id="services"`。白いカード 4 枚（幅が広いとき 4 列、中くらいで 2 列、狭いとき 1 列）。イラスト、事業名、説明文。マウスを乗せると 4px 浮く。
  - Diagnosis: 紺の帯に白文字。見出し「大切な住まいの点検・管理 "住宅診断" 承ります」と `/contact` へのボタン。
  - Numbers: 3 つの数字を `CountUp` で表示。
  - Works: `id="works"`。写真なしの枠は紺の斜め縞の地に「写真準備中」。
  - Greeting: 代表挨拶の 1 文目と署名、「会社概要を見る」`/about`。
  - ContactCta: 電話番号（`tel:` リンク）と「フォームで問い合わせる」`/contact`。
- [ ] **Step 3:** コミット `feat: トップページを作り直し`

### Task 5: 会社概要ページ

**Files:**
- Modify: `pages/about.tsx`
- Create: `styles/About.module.css`、`__tests__/About.test.tsx`

- [ ] **Step 1:** 失敗するテストを書く。ロゴ画像がある、見出し「代表挨拶」「会社概要」がある、表に `tbody` がある、「一般建設業 / 群馬県知事 許可 (般-1) 第25281号」と「2016年7月」が表示される。
- [ ] **Step 2:** 失敗を確かめ、`Layout title="会社概要"` を使って書き直して通す。文章は今のものを一字も変えない。表は左列を紺の太字、行の間に細い線。
- [ ] **Step 3:** コミット `feat: 会社概要ページを新しい見た目に合わせる`

### Task 6: 問い合わせページ

**Files:**
- Modify: `pages/contact.tsx`、`components/ContactForm.tsx`、`components/ContactForm.module.css`
- Create: `components/StatusDialog.tsx`、`StatusDialog.module.css`、`__tests__/ContactForm.test.tsx`

**Interfaces:**
- Produces: `StatusDialog({ open: boolean; loading: boolean; message: string; onClose: () => void })`。`role="dialog"`。送信中は「送信しています」、終わったら `message` と「閉じる」ボタン。

- [ ] **Step 1:** 失敗するテストを書く（`fetch` は代わりの部品にする）。
  - 3 項目とも空で「送信」を押すと `fetch` を呼ばず、`role="alert"` で「お名前、メールアドレス、お問い合わせ内容をすべて入力してください。」を表示する。
  - 空白だけの入力も同じ扱いにする。
  - 入力して送信し `ok: true` が返ると「メッセージが送信されました。」を表示し、入力欄が空になる。`fetch` は `/api/sendEmail` に `{ name, email, message }` を POST する。
  - `ok: false` のとき、また `fetch` が失敗したとき、「メッセージの送信に失敗しました。問い合わせ先にご連絡ください。（代表）027-212-8093」を表示し、入力内容が残る。
- [ ] **Step 2:** 失敗を確かめ、書き直して通す。入力欄の上に項目名（お名前、メールアドレス、お問い合わせ内容）を `label` で付ける。`alert` は使わない。送信の流れと送る内容は今のまま。
- [ ] **Step 3:** コミット `feat: 問い合わせページを新しい見た目に合わせる`

### Task 7: 片付け、説明書、確認

**Files:**
- Delete: ファイルの構成の表にある削除対象
- Modify: `README.md`

- [ ] **Step 1:** 使わなくなったファイルを消す。`grep -r "@mui\|@emotion" --include="*.ts*" .`（node_modules を除く）が 0 件になることを確かめる。
- [ ] **Step 2:** `README.md` に、手元での動かし方と、施工写真の差し替え手順を画面操作の順で書く（写真を `public/works/` に置く、`data/works.ts` のどの行に何を書くか、表示の確かめ方）。
- [ ] **Step 3:** `npm test`、`npm run lint`、`npm run build` を実行し、すべて通ることを確かめる。
- [ ] **Step 4:** `npm run dev` で立ち上げ、3 ページを幅 1280px と 375px で開いて画面を撮り、崩れと横スクロールが無いことを確かめる。
- [ ] **Step 5:** テストケースと結果を `~/.claude/test_result/plusone_redesign_test_cases.md` と `plusone_redesign_test_result.txt` に保管する。
- [ ] **Step 6:** コミット `chore: 使わないファイルを削除し README を更新`
