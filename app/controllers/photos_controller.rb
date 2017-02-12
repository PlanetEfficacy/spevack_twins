class PhotosController < ApplicationController
  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      redirect_to photos_path
    end
  end

  def index
  end

  def show
    @photo = Photo.find(params[:id])
    @photos = Photo.all
    render component: 'App', props: { photo: @photo, photos: @photo }, tag: 'span', class: 'todo'
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :caption, :date, :image)
  end
end
