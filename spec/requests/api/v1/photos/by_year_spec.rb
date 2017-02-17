require 'rails_helper'

describe "GET api/v1/photos/one-per-year", type: :request do
  let(:photos) { double }
  let(:user) { create :user }

  it "returns one photo per year as json" do
    expect(Photo).to receive(:one_per_year).and_return(photos)
    sign_in user

    get "/api/v1/photos/one-per-year"

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    allow(Photo).to receive(:one_per_year).and_return(photos)

    get "/api/v1/photos/one-per-year"

    expect(response).to have_http_status(302)
  end
end
