require 'rails_helper'

describe "GET api/v1/favorites", type: :request do
  let(:user) { create :user }
  let(:photo) { double }

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

describe "POST api/v1/favorites", type: :request do
  let(:user) { create :user }
  let(:photo) { double }
  let(:favorite) { double }

  it "creates a favorite for a given user" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(Favorite).to receive(:new).and_return(favorite)
    expect(favorite).to receive(:user=).with(user)
    expect(favorite).to receive(:photo=).with(photo)
    expect(favorite).to receive(:save)
    sign_in user

    post "/api/v1/favorites", params: { photo: '1' }

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(Favorite).to receive(:new).and_return(favorite)
    allow(favorite).to receive(:user=).with(user)
    allow(favorite).to receive(:photo=).with(photo)
    allow(favorite).to receive(:save)

    post "/api/v1/favorites", params: { photo: '1' } 

    expect(response).to have_http_status(302)
  end
end

describe "DELETE api/v1/favorites/:id", type: :request do
  let(:user) { create :user }
  let(:favorite) { double }

  it "deletes a favorite for a given user" do
    allow(Favorite).to receive(:find).with('1').and_return(favorite)
    expect(favorite).to receive(:delete)
    sign_in user

    delete api_v1_favorite_path('1')

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Favorite).to receive(:find).with('1').and_return(favorite)
    allow(favorite).to receive(:delete)

    delete api_v1_favorite_path('1')

    expect(response).to have_http_status(302)
  end
end
