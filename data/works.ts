// 施工事例の一覧。
// 写真は public/works/ に置き、image にファイル名を書く（例: "kitchen.jpg"）。
// image が空の事例は表示しない。
// 写真つきの事例が 1 件も無い間は、トップページの「施工事例」のブロックとメニューの項目ごと隠れる。

export type Work = {
  title: string; // 事例の題名
  text: string; // 短い説明（空でもよい）
  image: string; // public/works/ 内のファイル名。写真が無いときは空にする
};

export const WORKS: Work[] = [
  { title: "住宅内装リフォーム", text: "", image: "" },
  { title: "店舗改装", text: "", image: "" },
  { title: "水廻り工事", text: "", image: "" },
];
