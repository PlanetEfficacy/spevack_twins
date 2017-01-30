require 'rails_helper'

RSpec.feature "guest visits photos#show" do
  it "redirects to login" do
    photo = build :photo
    visit photo_path(photo)
    expect(current_path).to eq(login_path)
  end
end
