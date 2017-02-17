require 'rails_helper'

describe "GET api/v1/photos/all-month-year", type: :request do
  let(:user) { create :user }
  let(:photos) { double }

  it "returns all photos per month and year as json" do
    expect(Photo).to receive(:by_year_and_month).with("2016", "6").and_return(photos)
    sign_in user

    get "/api/v1/photos/all-month-year?year=2016&month=6"

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    allow(Photo).to receive(:by_year_and_month).with("2016", "6").and_return(photos)

    get "/api/v1/photos/all-month-year?year=2016&month=6"

    expect(response).to have_http_status(302)
  end
end
