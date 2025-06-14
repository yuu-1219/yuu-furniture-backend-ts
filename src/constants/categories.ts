export interface CategoryType {
  ategoryId: string;
  categoryLabel: string;
  description: string;
}


const categories = [
  {
    categoryId: "storage_furniture", categoryLabel: "収納家具",
    description: "さまざまなスペースで有効活用できる収納アイテムが揃っています。大切なアルバムや工具まで、整理整頓が簡単に。限られたスペースを最大限に活用することで、ライフスタイルにもっと楽しみが広がります。"
  },
  {
    categoryId: "small_storage", categoryLabel: "小物収納",
    description: "スウェーデンのデザイン哲学を基に、シンプルでありながら機能的。クリアタイプの収納ボックスをはじめ、あらゆるニーズに応える豊富なバリエーションをご用意しています。スマートな収納で、衣替えの服から季節外のスポーツ用品まで、すべてが整然と収まり、毎日がもっとスムーズに。"
  },
  {
    categoryId: "sofas・armchairs", categoryLabel: "ソファ＆パーソナルチェア",
    description: "さまざまなデザインやタイプのものから、お気に入りのソファを見つけてください。"
  },
  {
    categoryId: "textiles", categoryLabel: "クッション&寝具",
    description: "あなたらしい空間づくりの秘訣は、テキスタイルにあります。お気に入りの色合いのラグや、こだわりの手作りカーテンが、心地よいくつろぎの時間を演出してくれます。季節や気分に合わせてベッドリネンを替えるような手軽さで、暮らしに新鮮な彩りと温もりのある活気をプラスできます。"
  },
  {
    categoryId: "beds・mattresses", categoryLabel: "ベッド・マットレス",
    description: "モダンでスタイリッシュなデザインから、温かみのあるトラディショナルなスタイルまで。また、コンパクトな1人用から、ゆったりとした2人用まで、様々なサイズをお選びいただけます。"
  },
  {
    categoryId: "tables・chairs", categoryLabel: "テーブル・チェア",
    description: "北欧テイストのスタイリッシュなものからモダンなデザインのテーブルセット、ゆったりくつろげるテーブル＆チェア、省スペースに便利な折りたたみテーブルなど、さまざまなライフスタイルやインテリアにマッチする組み合わせが見つかるはずです。"
  },
  {
    categoryId: "desk・deskchairs", categoryLabel: "デスク・チェア",
    description: "デザイン性と機能性に優れたデスクやデスクチェアを、お手頃な価格で豊富に取り揃えています。小さなスペースにもぴったりなコンパクトタイプから、広々とした作業スペースを確保できる大型デスクまで、あなたのワークスタイルやお部屋のレイアウトにフィットする一台が見つかるはずです。"
  },
  {
    categoryId: "lighting", categoryLabel: "照明",
    description: "見上げても見回しても、目を凝らす必要はありません。照明は、あらゆる場所に設置できます。読書や調理する時、失せ物を探す時など、日常のあらゆる場面で私たちの生活をサポートします。"
  },
  {
    categoryId: "rugs・mats", categoryLabel: "ラグ・カーペット",
    description: "一日の最初の一歩も、家の中を動き回るときも、ラグが部屋に心地よさをプラスします。"
  },
  {
    categoryId: "decoration", categoryLabel: "インテリア雑貨",
    description: ""
  },
  // {
  //   categoryId: "kitchenware・tableware", categoryLabel: "調理器具・食器", 
  //   description: ""
  // },
  // {
  //   categoryId: "bathroom_products", categoryLabel: "洗面所収納・バスタオル", 
  //   description: "賢くて楽しいアクセサリーを上手に使えば、バスルームを簡単にパーソナライズし、きちんと整理整頓して時間も節約できます。シャワーバスケットや吸盤付きフック、ソープディスペンサー、おしゃれなバスケット、きれいで実用的な小物入れなど、各種アクセサリーをさまざまなデザインや色からお選びいただけます。"
  // },
  // {
  //   categoryId: "kitchen・appliances", categoryLabel: "キッチン収納",
  //   description: "探しているのは、自由にカスタマイズできるフルカスタマイズのシステムキッチン？ それとも、シンプルだけれど必要な機能が全部そろった、1日で設置できるキッチン？ あなたのニーズや好きなスタイル、予算に合った理想のキッチンがきっと見つかります。"
  // }
];

export default categories;