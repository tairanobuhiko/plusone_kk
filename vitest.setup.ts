import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { resetViewport, setReducedMotion } from "./__tests__/helpers";

// next/font は Next.js のビルド時にしか動かないため、テストでは固定のクラス名を返す
vi.mock("next/font/google", () => ({
  Zen_Kaku_Gothic_New: () => ({ className: "font-body", variable: "font-body-var" }),
  Archivo_Black: () => ({ className: "font-impact", variable: "font-impact-var" }),
}));

resetViewport();
setReducedMotion(false);

afterEach(() => {
  cleanup();
  resetViewport();
  setReducedMotion(false);
});
