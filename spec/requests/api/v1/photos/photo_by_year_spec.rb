require 'rails_helper'

describe "GET api/v1/photos/one-per-year", type: :request do
  it "returns one photo per year as json" do
    photos = double
    allow(Photo).to receive(:one_per_year).and_return(photos)
    user = create :user
    sign_in user

    get "/api/v1/photos/one-per-year"
    photos = JSON.parse(response.body)

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    create_list(:photo, 2)

    get "/api/v1/photos/one-per-year"
    expect(response).to have_http_status(302)
  end
end
