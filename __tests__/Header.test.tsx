import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NAV } from "@/lib/site";

describe("ヘッダー", () => {
  it("会社名の場所にロゴ画像を置き、トップページへ戻れる", () => {
    render(<Header />);
    const logo = screen.getByAltText("Plus One株式会社");
    expect(logo).toHaveAttribute("src", "/plusone_logos/Plus-One_logo.png");
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("メニュー 4 件のリンク先が正しい", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    NAV.forEach((item) => {
      expect(within(nav).getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href
      );
    });
  });

  it("ボタンでメニューが開閉する", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "メニューを開く" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("メニューを閉じる");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("開いた状態でメニューの項目を押すと閉じる", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const button = screen.getByRole("button", { name: "メニューを開く" });
    await user.click(button);
    await user.click(screen.getByRole("link", { name: "事業内容" }));
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

describe("フッター", () => {
  it("文字ロゴ、住所、電話番号を表示する", () => {
    render(<Footer />);
    expect(screen.getByAltText("Plus One Co., Ltd.")).toHaveAttribute(
      "src",
      "/plusone_logos/Plus-One-CoLtd_text.gif"
    );
    expect(screen.getByText(/群馬県前橋市河原浜町705-9/)).toBeInTheDocument();
    expect(screen.getByText(/027-212-8093/)).toBeInTheDocument();
  });
});
