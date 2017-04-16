require 'rails_helper'

describe "GET api/v1/users/:id/favorites", type: :request do
  let(:user) { create :user }
  let(:photo) { double }
  let(:favorite) { double }

  it "returns all favorites for a given user" do
    expect(user).to receive(:photos).and_return([photo])
    sign_in user

    get "/api/v1/favorites"

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(user).to receive(:photos).and_return([photo])

    get "/api/v1/favorites"

    expect(response).to have_http_status(302)
  end
end
