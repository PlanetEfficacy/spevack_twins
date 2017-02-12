require 'rails_helper'

RSpec.describe "PhotosController", type: :request do

  it "renders show template" do
    photo = create :photo
    user = create :user

    sign_in user
    get photo_path(photo)
    expect(response).to be_ok
  end

end
