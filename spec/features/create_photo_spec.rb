require 'rails_helper'

RSpec.feature "admin uploads photo" do
  context "completes the photos#new form" do
    it "redirects to the photo index page" do
      Fog.mock!
      Fog::Mock.delay = 0
      service = Fog::Storage.new({
        provider: 'Google',
        google_storage_access_key_id: ENV['google_storage_access_key_id'],
        google_storage_secret_access_key: ENV['google_storage_secret_access_key']
      })
      service.directories.create(:key => 'photo-of-the-day')
      admin = create :admin
      sign_in admin
      visit new_photo_path

      fill_in "Title", with: "My photo title"
      fill_in "Caption", with: "My photo caption"
      fill_in "Date", with: "2015-12-29"
      attach_file "photo[image]", Rails.root + "spec/fixtures/dummy.png"
      click_button "Upload"

      expect(current_path).to eq(photos_path)
    end
  end
end
