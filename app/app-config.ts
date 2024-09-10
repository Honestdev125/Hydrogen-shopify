export const appConfig = {
  site: {
    name: "UNINOVERSE",
  },
  product: {
    /**
     * カテゴリ
     */
    categories: [
      {
        name: "革靴",
        slug: "leather-shoes",
        children: [
          { name: "オックスフォード", slug: "oxford" },
          { name: "ローファー", slug: "loafer" },
          { name: "ブーツ", slug: "boots" },
        ],
      },
      {
        name: "スニーカー",
        slug: "sneakers",
        children: [{ name: "スニーカー", slug: "b1" }],
      },
      {
        name: "ゴルフシューズ",
        slug: "golf-shoes",
        children: [{ name: "ゴルフシューズ", slug: "c1" }],
      },
      {
        name: "ゴルフウェア",
        slug: "golf-wear",
        children: [{ name: "ゴルフウェア", slug: "d1" }],
      },

      {
        name: "インソール",
        slug: "insole",
        children: [{ name: "インソール", slug: "e1" }],
      },
    ] as const,
    /**
     * カラー
     */
    colors: [
      { label: "ブラック", slug: "black" },
      { label: "オフホワイト", slug: "off-white" },
      { label: "グレー", slug: "gray" },
      { label: "アンティークグレー", slug: "antique-gray" },
      { label: "グリーン", slug: "green" },
      { label: "ワインレッド", slug: "wine-red" },
      { label: "ピンク", slug: "pink" },
      { label: "ブラウン", slug: "brown" },
      { label: "ダークブラウン", slug: "dark-brown" },
    ] as const,

    /**
     * 素材
     */
    materiels: [
      { name: "カーフスキン", slug: "calfskin" },
      { name: "アリゲーター（腹）", slug: "alligator-belly" },
      { name: "アリゲーター（背）", slug: "alligator-back" },
      { name: "西德皮", slug: "cordovan" },
      { name: "篮球皮", slug: "basketball" },
      { name: "スエード", slug: "suede" },
      { name: "ディア", slug: "deer" },
      { name: "オーストリッチ", slug: "ostrich" },
      { name: "バロン", slug: "baron" },
      { name: "カンガルー", slug: "kangaroo" },
      { name: "甩纹牛皮", slug: "pebble-grain" },
    ],
    methods: [
      { name: "セメント", slug: "cement" },
      { name: "グッドイヤー", slug: "goodyear" },
      { name: "ノルウェージャン", slug: "norwegian" },
    ],
    brands: [
      { name: "FUJI UNI", slug: "fuji-uni" },
      { name: "UNINOVERSE", slug: "uninoverse" },
      { name: "UNI PREMIUM", slug: "uni-premium" },
    ],
    cases: [
      { name: "ビジネス", slug: "business" },
      { name: "ゴルフ", slug: "golf" },
      { name: "結婚式・パーティー", slug: "wedding-party" },
      { name: "カジュアル", slug: "casual" },
    ],
  },
  features: {
    languageSwitcher: false,
    login: false,
    search: false,
    cart: false,
  },
}
