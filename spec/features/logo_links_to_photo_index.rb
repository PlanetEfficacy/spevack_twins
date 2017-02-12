require 'rails_helper'

RSpec.feature "user visits photo index" do
  context "by clicking the logo" do
    it "renders the photo index" do
      user = create :user

      sign_in user
      visit years_photo_path
      click_link "Spevack Twins"

      expect(current_path).to eq(photos_path)
    end
  end
end
