class Api::V1::PhotosController < ApplicationController
  def index
    render json: Photo.all
  end
end
