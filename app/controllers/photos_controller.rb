class PhotosController < ApplicationController
  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      redirect_to photo_path(@photo)
    end
  end

  def show
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :caption, :date, :image)
  end
end
