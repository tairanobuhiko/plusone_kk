import { describe, expect, it } from "vitest";
import { buildNav, LOGO, NAV, SERVICES, SITE } from "@/lib/site";

describe("会社の情報", () => {
  it("ロゴ画像の場所は / で始まる", () => {
    expect(LOGO.mark.src).toBe("/plusone_logos/Plus-One_logo.png");
    expect(LOGO.text.src).toBe("/plusone_logos/Plus-One-CoLtd_text.gif");
  });

  it("写真つきの施工事例が無い間は、メニューに施工事例を出さない", () => {
    expect(buildNav(false)).toEqual([
      { label: "事業内容", href: "/#services" },
      { label: "会社概要", href: "/about" },
      { label: "お問い合わせ", href: "/contact" },
    ]);
  });

  it("写真つきの施工事例があるときは、メニューに施工事例を出す", () => {
    expect(buildNav(true)).toEqual([
      { label: "事業内容", href: "/#services" },
      { label: "施工事例", href: "/#works" },
      { label: "会社概要", href: "/about" },
      { label: "お問い合わせ", href: "/contact" },
    ]);
  });

  it("今は写真が無いので、メニューは 3 件", () => {
    expect(NAV.map((item) => item.label)).toEqual([
      "事業内容",
      "会社概要",
      "お問い合わせ",
    ]);
  });

  it("事業は 4 種で、画像の場所は / で始まる", () => {
    expect(SERVICES.map((s) => s.title)).toEqual([
      "住宅内装リフォーム",
      "店舗改装",
      "外構工事",
      "水廻り工事",
    ]);
    SERVICES.forEach((s) => expect(s.image.startsWith("/")).toBe(true));
  });

  it("サイトの説明文に、取りやめた住宅診断を書かない", () => {
    expect(SITE.description).not.toContain("住宅診断");
  });

  it("電話番号は会社概要と同じ", () => {
    expect(SITE.tel).toBe("027-212-8093");
  });
});
