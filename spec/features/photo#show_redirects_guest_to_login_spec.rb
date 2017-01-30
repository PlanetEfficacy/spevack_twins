require 'rails_helper'

RSpec.feature "guest visits photos#show" do
  it "redirects to login" do
    photo = create :photo
    visit photo_path(photo)
    expect(current_path).to eq(new_session_path)
  end
end
