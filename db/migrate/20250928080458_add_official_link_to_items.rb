class AddOfficialLinkToItems < ActiveRecord::Migration[7.2]
  def change
    add_column :items, :official_link, :string
  end
end
