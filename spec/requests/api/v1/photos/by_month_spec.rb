require 'rails_helper'

describe "GET api/v1/photos/one-per-month", type: :request do
  it "returns the first photo of each month for a given year as json" do
    photos = double
    allow(Photo).to receive(:one_per_month).with("2016").and_return(photos)
    user = create :user
    sign_in user

    get "/api/v1/photos/one-per-month?year=2016"
    photos = JSON.parse(response.body)

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    create_list(:photo, 2)

    get "/api/v1/photos/one-per-month?year=2016"
    expect(response).to have_http_status(302)
  end
end
