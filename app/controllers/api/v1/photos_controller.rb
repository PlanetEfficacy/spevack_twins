class Api::V1::PhotosController < ApplicationController
  def index
    render json: photos
  end

  private

    def photos
      if params[:year] && params[:month]
        Photo.by_year_and_month(params[:year], params[:month])
      else
        Photo.all
      end
    end
end
