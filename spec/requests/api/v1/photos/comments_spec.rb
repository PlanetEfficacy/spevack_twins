require 'rails_helper'

describe "GET api/v1/photo/:id/comments", type: :request do
  let(:user) { create :user }
  let(:photo) { double }
  let(:photo_comments) { double }

  it "returns all comments for a given photo" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    expect(photo).to receive(:comments).and_return(photo_comments)
    sign_in user

    get "/api/v1/photos/1/comments"

    expect(response).to be_ok
  end

  it "returns 404 if a user is not signed in" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(photo).to receive(:comments).and_return(photo_comments)

    get "/api/v1/photos/1/comments"

    expect(response).to have_http_status(302)
  end
end
