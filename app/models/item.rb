class Item < ApplicationRecord
  def image_url
    # 例: https://yokubari-.../assets/meal/meal_mac-xxxx.png に解決される
    ActionController::Base.helpers.image_url(img)
  end
end
