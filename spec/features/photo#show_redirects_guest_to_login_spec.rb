require 'rails_helper'

RSpec.feature "guest visits photos#index" do
  it "redirects to login" do
    visit photos_path
    expect(current_path).to eq(new_user_session_path)
  end
end
