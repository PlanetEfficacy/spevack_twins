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


describe "Get api/v1/photos with month and year params", type: :request do
  it "returns all the photos as json for a give year and month" do
    photos = double
    allow(Photo).to receive(:by_year_and_month).with("2016", "11").and_return(photos)
    user = create :user
    sign_in user

    get "/api/v1/photos?year=2016&month=11"
    photos = JSON.parse(response.body)
    expect(response).to be_ok
  end
end
