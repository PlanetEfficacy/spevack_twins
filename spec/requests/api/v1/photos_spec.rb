require 'rails_helper'

describe "GET api/v1/photos", type: :request do
  it "returns all photos as json" do
    create_list(:photo, 2)
    user = create :user
    sign_in user

    get "/api/v1/photos"
    photos = JSON.parse(response.body)

    expect(response).to be_ok
    expect(photos).to be_instance_of(Array)
    expect(photos.count).to eq(2)
  end

  it "returns 404 if a user is not signed in" do
    create_list(:photo, 2)

    get "/api/v1/photos"
    expect(response).to have_http_status(302)
  end
end
