class RenameImageUrlToImgInItems < ActiveRecord::Migration[7.2]
  def change
    rename_column :items, :image_url, :img
  end
end
