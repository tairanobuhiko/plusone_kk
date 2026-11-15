// 会社の情報をここ 1 か所にまとめる。各ページと部品はここから読む
import { WORKS } from "@/data/works";

export const SITE = {
  name: "Plus One株式会社",
  description:
    "群馬県前橋市の建築・内装工事会社、Plus One株式会社です。住宅内装リフォーム、店舗改装、外構工事、水廻り工事を承ります。",
  url: "https://plusone-kk.vercel.app",
  tel: "027-212-8093",
  fax: "027-212-8049",
  mobile: "070-4128-6043",
  mail: "t.plus-one@outlook.com",
  zip: "〒371-0224",
  address: "群馬県前橋市河原浜町705-9",
} as const;

// width と height は画像の元の大きさ。これより大きく表示しない
export const LOGO = {
  mark: { src: "/plusone_logos/Plus-One_logo.png", width: 261, height: 123 },
  text: {
    src: "/plusone_logos/Plus-One-CoLtd_text.gif",
    width: 705,
    height: 105,
  },
} as const;

// メニューの項目。施工事例は、写真つきの事例があるときだけ出す
export function buildNav(hasWorks: boolean): { label: string; href: string }[] {
  return [
    { label: "事業内容", href: "/#services" },
    ...(hasWorks ? [{ label: "施工事例", href: "/#works" }] : []),
    { label: "会社概要", href: "/about" },
    { label: "お問い合わせ", href: "/contact" },
  ];
}

export const NAV = buildNav(WORKS.some((work) => work.image !== ""));

// text は仮の文章。公開前に代表の確認をもらう
export const SERVICES: { title: string; text: string; image: string }[] = [
  {
    title: "住宅内装リフォーム",
    text: "床や壁紙の張り替えから間取りの変更まで、住まいの内装工事を承ります。",
    image: "/Renovation.png",
  },
  {
    title: "店舗改装",
    text: "店舗の内装工事と改装を承ります。",
    image: "/Renovation2.png",
  },
  {
    title: "外構工事",
    text: "ブロック塀や駐車場など、建物のまわりの工事を承ります。",
    image: "/brickblock.png",
  },
  {
    title: "水廻り工事",
    text: "キッチン、浴室、トイレ、洗面所の工事を承ります。",
    image: "/breakdown.png",
  },
];
