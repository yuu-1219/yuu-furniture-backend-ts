export interface ColorType {
  colorId: string;
  colorLabel: string;
  hex: string; 
}

const colors = [
    { colorId: "white", colorLabel: "ホワイト", hex: "#ffffff" },
    { colorId: "black", colorLabel: "ブラック", hex: "#000000" },
    { colorId: "gray", colorLabel: "グレー", hex: "#cccccc" },
    { colorId: "natural", colorLabel: "ベージュ", hex: "#cba135" },
    { colorId: "brown", colorLabel: "ブラウン", hex: "#b19b64" },
    { colorId: "red", colorLabel: "レッド", hex: "#f8320b" },
    { colorId: "orange", colorLabel: "オレンジ", hex: "#f88c0b" },
    { colorId: "yellow", colorLabel: "イエロー", hex: "#fef126" },
    { colorId: "green", colorLabel: "グリーン", hex: "#6dc412" },
    { colorId: "blue", colorLabel: "ブルー", hex: "#1c8cdf" },
    { colorId: "pink", colorLabel: "ピンク", hex: "#eb6eff" },
    { colorId: "gold", colorLabel: "ゴールド", hex: "#f0c752" },
    { colorId: "silver", colorLabel: "シルバー", hex: "#edebe5" },
    { colorId: "clear", colorLabel: "クリア", hex: "#f9f9f9" },
    { colorId: "othecolorI", colorLabel: "その他", hex: "#a05bd7" },
  ];

  module.exports = { colors };