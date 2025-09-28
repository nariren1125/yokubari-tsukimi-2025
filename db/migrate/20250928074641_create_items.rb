class CreateItems < ActiveRecord::Migration[7.2]
  def change
    create_table :items do |t|
      t.string :name
      t.text :desc
      t.string :image_url
      t.string :maker
      t.string :period
      t.string :tweet_text
      t.string :category

      t.timestamps
    end
  end
end
