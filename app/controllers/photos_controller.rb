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
    @photos = Photo.all
    @photo = Photo.find(params[:id])
    render_photo_show
  end

  private

  def photo_params
    params.require(:photo).permit(:title, :caption, :date, :image)
  end

  def render_photo_show
    render component: 'App', props: { photo: @photo, photos: @photos, componentName: "PhotoShow" }, tag: 'span', class: 'todo'
  end
end
