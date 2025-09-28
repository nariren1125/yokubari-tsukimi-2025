# spec/requests/items_spec.rb
RSpec.describe "Items", type: :request do
  describe "GET /index" do
    it "returns http success" do
      Item.create!(
        name: "テスト商品",
        desc: "説明",
        img: "ogp_image.png",   # ← 存在する画像名に変更
        maker: "メーカー",
        period: "期間",
        tweet_text: "#test",
        category: "meal"
      )
      get "/items"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      item = Item.create!(
        name: "テスト商品",
        desc: "説明",
        img: "ogp_image.png",   # ← こちらも変更
        maker: "メーカー",
        period: "期間",
        tweet_text: "#test",
        category: "meal"
      )

      get "/items/#{item.id}.json"
      expect(response).to have_http_status(:success)
    end
  end
end
