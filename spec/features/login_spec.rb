require 'rails_helper'

RSpec.feature "user logs in" do
  xscenario "using google oauth2" do
    stub_omniauth
    visit root_path
    within ".navbar-fixed" do
      click_link "Sign in with Google"
    end

    within ".navbar-fixed" do
      expect(page).to have_css("img.responsive-img")
      expect(page).to have_css("nav.cyan")
    end
  end
end
