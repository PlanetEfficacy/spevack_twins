require 'rails_helper'

describe "GET api/v1/photos", type: :request do
  let(:photos) { double }
  let(:user) { create :user }
  it "returns all photos as json" do
    sign_in user
    expect(Photo).to receive(:all).and_return(photos)

    get "/api/v1/photos"

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    allow(Photo).to receive(:all).and_return(photos)

    get "/api/v1/photos"
    
    expect(response).to have_http_status(302)
  end
end
