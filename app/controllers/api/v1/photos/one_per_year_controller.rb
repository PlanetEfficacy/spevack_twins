class Api::V1::Photos::OnePerYearController < ApplicationController
  def index
    render json: Photo.one_per_year
  end
end
