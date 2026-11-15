import { Archivo_Black, Zen_Kaku_Gothic_New } from "next/font/google";

// 本文と見出しの文字
export const bodyFont = Zen_Kaku_Gothic_New({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// 冒頭の「+1」だけに使う文字
export const impactFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-impact",
});
