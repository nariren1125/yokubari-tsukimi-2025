# db/seeds.rb
items = [
  {
    name: "月見バーガー",
    desc: "秋の風物詩としてご好評いただいている定番の「月見バーガー」新商品5種を“月見ファミリー”として販売。",
    img: "meal/meal_mac.png",
    maker: "マクドナルド",
    period: "2024年9月3日〜",
    tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
    official_link: "https://www.mcdonalds.co.jp/campaign/tsukimi/",
    category: "meal"
  },
  {
    name: "月見スイーツ",
    desc: "つぶあんとおもち＋新たにバターフィリング入りの「月見パイ」と、秋限定マックシェイク。",
    img: "dessert/dessert_mac.png",
    maker: "マクドナルド",
    period: "9月3日〜なくなり次第販売終了",
    tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
    official_link: "https://www.mcdonalds.co.jp/company/news/2025/0825a/",
    category: "dessert"
  },
  {
    name: "BUNNY BRINGS JOY",
    desc: "三日月を運ぶウサギたちの旅をテーマにしたスターバックスの限定グッズ。",
    img: "goods/goods_stb_tumbler.png",
    maker: "スターバックス",
    period: "9月3日〜なくなり次第終了",
    tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
    official_link: "https://www.starbucks.co.jp/seasonal-goods/",
    category: "goods"
  }
]

items.each do |attrs|
  Item.find_or_create_by!(name: attrs[:name]) do |item|
    item.assign_attributes(attrs)
  end
end
