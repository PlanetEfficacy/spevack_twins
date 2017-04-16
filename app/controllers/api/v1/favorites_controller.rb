class Api::V1::FavoritesController < ApplicationController
  def index
    render json: current_user.photos
  end
  def create
    favorite = Favorite.new
    favorite.user = current_user
    favorite.photo = photo
    favorite.save
    render json: favorite 
  end

  private

  def photo
    Photo.find(params[:photo])
  end
end
