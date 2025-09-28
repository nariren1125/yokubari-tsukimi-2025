Item.create!(
  [
    {
      name: "月見バーガー",
      desc: "秋の風物詩としてご好評いただいている定番の「月見バーガー」新商品5種を“月見ファミリー”として9月3日(水)より全国のマクドナルド店舗にて期間限定で販売いたします。",
      img: "meal/meal_mac.png",  # ← seeds では image_path を使わず文字列でOK
      maker: "マクドナルド",
      period: "2024年9月3日〜",
      tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
      official_link: "https://www.mcdonalds.co.jp/campaign/tsukimi/",
      category: "meal"   # ← category も忘れずに
    },
    {
      name: "月見スイーツ",
      desc: "「月見パイ」が進化して登場。つぶあんとやわらかいおもちに、新たにバターフィリングを加え、サクサクのパイで包んだ一品と、山梨県産シャインマスカットの果汁を使用したフルーティーなこの秋限定のマックシェイク。",
      img: "dessert/dessert_mac.png",
      maker: "マクドナルド",
      period: "9月3日〜なくなり次第販売終了",
      tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
      official_link: "https://www.mcdonalds.co.jp/company/news/2025/0825a/",
      category: "dessert"
    },
    {
      name: "BUNNY BRINGS JOY",
      desc: "三日月を運ぶウサギたちの旅をテーマにデザインしました。お気に入りのグッズと一緒にウサギたちと旅に出かけませんか。ウサギたちはあたたかさと豊かさの象徴である三日月を運ぶ旅に出ます。愛と祝福を分かち合うこの旅は、季節の恵みとやさしさをそっと広げていきます。",
      img: "goods/goods_stb_tumbler.png",
      maker: "スターバックス",
      period: "9月3日〜なくなり次第終了",
      tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
      official_link: "https://www.starbucks.co.jp/seasonal-goods/?srsltid=AfmBOoqtbqG9wqHipT-KSJK14OnawWwPCcGRn6JcoMSwtyEy3iStxPU_",
      category: "goods"
    }
  ]
)