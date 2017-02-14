require 'rails_helper'

describe "GET api/v1/photos/all-month-year", type: :request do
  it "returns all photos per month and year as json" do
    photos = double
    allow(Photo).to receive(:by_year_and_month).with("2016", "6").and_return(photos)
    user = create :user
    sign_in user

    get "/api/v1/photos/all-month-year?year=2016&month=6"
    photos = JSON.parse(response.body)

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    create_list(:photo, 2)

    get "/api/v1/photos/all-month-year?year=2016&month=6"
    expect(response).to have_http_status(302)
  end
end
