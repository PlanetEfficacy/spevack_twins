require 'rails_helper'

RSpec.feature "user visits photo by year page" do
  context "clicks 2016 link" do
    xit "renders a page with one photo per month of the year" do
      user = create :user

      sign_in user
      visit photos_path
      click_link "2016"

      expect(current_path).to eq(year_photos_path)
    end
  end
end
