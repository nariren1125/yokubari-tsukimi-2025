# spec/requests/items_spec.rb
require 'rails_helper'

RSpec.describe "Items", type: :request do
  describe "GET /index" do
    it "returns http success" do
      Item.create!(name: "テスト商品", desc: "説明", img: "test.png", maker: "メーカー", period: "期間", tweet_text: "#test", category: "meal")
      get "/items"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      item = Item.create!(
        name: "テスト商品",
        desc: "説明",
        img: "test.png",
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
