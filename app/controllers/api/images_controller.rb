class Api::ImagesController < ApplicationController
    
  def paths
  # app/assets/images内の全画像ファイルのパスを動的生成
    image_files = Dir.glob(Rails.root.join('app/assets/images/*.{png,jpg,jpeg,gif}'))
    .map { |path| File.basename(path) }
    image_paths = image_files.each_with_object({}) do |filename, hash|
      hash[filename] = ActionController::Base.helpers.image_path(filename)
  end
  
  render json: { image_paths: image_paths }
  end
end
