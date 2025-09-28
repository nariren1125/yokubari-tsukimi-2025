class SeedInitialItems < ActiveRecord::Migration[7.0]
  def up
    return if Rails.env.test?  # ← テスト環境では実行しない
    
    Item.create!(
      [
        {
          name: "月見バーガー",
          desc: "秋の風物詩としてご好評いただいている定番の「月見バーガー」...",
          img: "meal/meal_mac.png",
          maker: "マクドナルド",
          period: "2024年9月3日〜",
          tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
          official_link: "https://www.mcdonalds.co.jp/campaign/tsukimi/",
          category: "meal"
        },
        {
          name: "月見スイーツ",
          desc: "「月見パイ」が進化して登場...",
          img: "dessert/dessert_mac.png",
          maker: "マクドナルド",
          period: "9月3日〜なくなり次第販売終了",
          tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
          official_link: "https://www.mcdonalds.co.jp/company/news/2025/0825a/",
          category: "dessert"
        },
        {
          name: "BUNNY BRINGS JOY",
          desc: "三日月を運ぶウサギたちの旅をテーマにデザインしました...",
          img: "goods/goods_stb_tumbler.png",
          maker: "スターバックス",
          period: "9月3日〜なくなり次第終了",
          tweet_text: "#お月見限定商品を楽しもう #秋のミニアプリweek",
          official_link: "https://www.starbucks.co.jp/seasonal-goods/",
          category: "goods"
        }
      ]
    )
  end

  def down
    Item.delete_all
  end
end
