import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Works from "@/components/home/Works";
import Home from "@/pages/index";
import About from "@/pages/about";

describe("施工事例", () => {
  it("写真つきの事例が 1 件も無いときは、ブロックごと表示しない", () => {
    const { container } = render(
      <Works works={[{ title: "店舗改装", text: "", image: "" }]} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("事例が空のときも、ブロックごと表示しない", () => {
    const { container } = render(<Works works={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("写真がある事例は写真と題名を表示する", () => {
    render(
      <Works works={[{ title: "キッチンの入れ替え", text: "説明", image: "a.jpg" }]} />
    );
    expect(screen.getByRole("heading", { name: "施工事例" })).toBeInTheDocument();
    const img = screen.getByAltText("キッチンの入れ替え");
    expect(img).toHaveAttribute("src", "/works/a.jpg");
    expect(screen.getByText("説明")).toBeInTheDocument();
  });

  it("写真がある事例と無い事例が混ざると、写真がある事例だけを表示する", () => {
    render(
      <Works
        works={[
          { title: "A", text: "", image: "a.jpg" },
          { title: "B", text: "", image: "" },
        ]}
      />
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.queryByText("B")).not.toBeInTheDocument();
  });
});

describe("トップページ", () => {
  it("冒頭の見出し、事業 4 種、住宅診断、問い合わせ先を表示する", () => {
    const { container } = render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "暮らしに、プラスワン。" })
    ).toBeInTheDocument();
    ["住宅内装リフォーム", "店舗改装", "外構工事", "水廻り工事"].forEach((title) => {
      expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: /住宅診断/ })).toBeInTheDocument();
    expect(container.querySelector("#services")).not.toBeNull();
    // 写真つきの施工事例が無い間は、施工事例と数字のブロックを出さない
    expect(container.querySelector("#works")).toBeNull();
    expect(screen.queryByText("写真準備中")).not.toBeInTheDocument();
    expect(screen.queryByText(/の資格/)).not.toBeInTheDocument();
    expect(container.querySelector('a[href="tel:0272128093"]')).not.toBeNull();
    expect(container.querySelector('main a[href="/contact"]')).not.toBeNull();
  });
});

describe("会社概要ページ", () => {
  it("ロゴ、代表挨拶、会社概要の表を表示する", () => {
    const { container } = render(<About />);
    expect(container.querySelector('main img[src="/plusone_logos/Plus-One_logo.png"]')).not.toBeNull();
    expect(screen.getByRole("heading", { name: "代表挨拶" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "会社概要" })).toBeInTheDocument();
    expect(container.querySelector("table tbody")).not.toBeNull();
    expect(screen.getByText("2016年7月")).toBeInTheDocument();
    expect(
      screen.getByText(/一般建設業 \/ 群馬県知事 許可 \(般-1\) 第25281号/)
    ).toBeInTheDocument();
  });
});
