class ItemsController < ApplicationController
  def index
    @items = Item.all
    respond_to do |format|
      format.html # デフォルトのHTMLテンプレート (必要なら)
      format.json { render json: @items }
    end
  end

  def show
    @item = Item.find(params[:id])
    respond_to do |format|
      format.html # ← これで app/views/items/show.html.erb を使う
      format.json { render json: @item }
    end
  end
end

