class Api::V1::CommentsController < ApplicationController
  def index
    render json: photo.comments
  end

  private

  def photo
    Photo.find(params[:photo_id])
  end
end
