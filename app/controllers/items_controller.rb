class ItemsController < ApplicationController
  def index
    @items = Item.all
    respond_to do |format|
      format.html
      format.json { render json: @items.as_json(methods: :image_url) }
    end
  end

  def show
    @item = Item.find(params[:id])
    respond_to do |format|
      format.html  # OGP を埋めた show.html.erb を表示
      format.json { render json: @item.as_json(methods: :image_url) }
    end
  end
end
