require 'rails_helper'

RSpec.feature "admin uploads photo" do
  context "completes the photos#new form" do
    it "redirects to the new photo's show page" do
      admin = create :admin
      sign_in admin
      visit new_photo_path

      fill_in "Title", with: "My photo title"
      fill_in "Caption", with: "My photo caption"
      fill_in "Date", with: "2015-12-29"
      attach_file "photo[photo]", Rails.root + "spec/fixtures/dummy.png"
      click_button "Upload"

      expect(current_path).to eq(photo_path(Photo.last))
    end
  end
end
