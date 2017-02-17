require 'rails_helper'

describe "GET api/v1/photos/one-per-month", type: :request do
  let(:photos) { double }
  let(:user) { create :user }
  it "returns the first photo of each month for a given year as json" do
    expect(Photo).to receive(:one_per_month).with("2016").and_return(photos)
    sign_in user

    get "/api/v1/photos/one-per-month?year=2016"

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Photo).to receive(:one_per_month).with("2016").and_return(photos)

    get "/api/v1/photos/one-per-month?year=2016"

    expect(response).to have_http_status(302)
  end
end
