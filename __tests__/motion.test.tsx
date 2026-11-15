import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Reveal from "@/components/Reveal";
import { enterViewport, setReducedMotion } from "./helpers";

describe("現れる動き", () => {
  it("画面に入る前は隠れ、入ると現れる", () => {
    render(<Reveal>内容</Reveal>);
    const el = screen.getByText("内容");
    expect(el).toHaveAttribute("data-reveal", "hidden");

    act(() => enterViewport());
    expect(el).toHaveAttribute("data-reveal", "shown");
  });

  it("動きを止める設定では、最初から現れている", () => {
    setReducedMotion(true);
    render(<Reveal>内容</Reveal>);
    expect(screen.getByText("内容")).toHaveAttribute("data-reveal", "shown");
  });
});
