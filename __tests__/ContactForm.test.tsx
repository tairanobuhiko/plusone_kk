import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactForm from "@/components/ContactForm";

const REQUIRED_MESSAGE =
  "お名前、メールアドレス、お問い合わせ内容をすべて入力してください。";
const FAILED_MESSAGE =
  "メッセージの送信に失敗しました。問い合わせ先にご連絡ください。（代表）027-212-8093";

async function fillAndSend(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("お名前"), "前橋 太郎");
  await user.type(screen.getByLabelText("メールアドレス"), "taro@example.com");
  await user.type(screen.getByLabelText("お問い合わせ内容"), "見積もりをお願いします");
  await user.click(screen.getByRole("button", { name: "送信" }));
}

describe("問い合わせフォーム", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("何も入力せずに送信すると、送信せずに知らせを表示する", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: "送信" }));
    expect(screen.getByRole("alert")).toHaveTextContent(REQUIRED_MESSAGE);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("空白だけの入力は入力不足として扱う", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText("お名前"), "   ");
    await user.type(screen.getByLabelText("メールアドレス"), "taro@example.com");
    await user.type(screen.getByLabelText("お問い合わせ内容"), "   ");
    await user.click(screen.getByRole("button", { name: "送信" }));
    expect(screen.getByRole("alert")).toHaveTextContent(REQUIRED_MESSAGE);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("送信に成功すると、完了の知らせを表示して入力欄を空にする", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSend(user);

    expect(await screen.findByText("メッセージが送信されました。")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/sendEmail",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          name: "前橋 太郎",
          email: "taro@example.com",
          message: "見積もりをお願いします",
        }),
      })
    );
    expect(screen.getByLabelText("お名前")).toHaveValue("");
    expect(screen.getByLabelText("お問い合わせ内容")).toHaveValue("");
  });

  it("サーバーが失敗を返すと、電話番号入りの知らせを表示して入力内容を残す", async () => {
    fetchMock.mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSend(user);

    expect(await screen.findByText(FAILED_MESSAGE)).toBeInTheDocument();
    expect(screen.getByLabelText("お名前")).toHaveValue("前橋 太郎");
    expect(screen.getByLabelText("お問い合わせ内容")).toHaveValue("見積もりをお願いします");
  });

  it("通信そのものが失敗しても、同じ知らせを表示する", async () => {
    fetchMock.mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSend(user);

    expect(await screen.findByText(FAILED_MESSAGE)).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toHaveValue("taro@example.com");
  });

  it("知らせを閉じると、もう一度入力できる", async () => {
    fetchMock.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillAndSend(user);

    await user.click(await screen.findByRole("button", { name: "閉じる" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
