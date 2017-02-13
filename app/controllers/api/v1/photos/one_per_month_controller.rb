class Api::V1::Photos::OnePerMonthController < ApplicationController
  def index
    render json: Photo.one_per_month(params[:year])
  end
end
