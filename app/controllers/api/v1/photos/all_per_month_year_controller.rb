class Api::V1::Photos::AllPerMonthYearController < ApplicationController
  def index
    render json: Photo.by_year_and_month(params[:year], params[:month])
  end
end
