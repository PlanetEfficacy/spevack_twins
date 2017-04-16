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

  def destroy
    favorite.delete
    head :no_content
  end

  private

  def photo
    Photo.find(params[:photo])
  end

  def favorite
    current_user.favorites.find(params[:id])
  end
end
