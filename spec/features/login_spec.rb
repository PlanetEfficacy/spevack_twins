require 'rails_helper'

describe "user logs in with google oauth2" do
  it "redirects user to photo show" do
    photo = create :photo
    stub_google
    visit new_user_session_path
    expect_page_to_have_sign_out_and_not_sign_in

    click_link "Sign in with Google Oauth2"

    expect_page_to_have_sign_in_and_not_sign_out
    expect(current_path).to eq(photo_path(photo))
  end
end

describe "user logs in with twitter" do
  it "redirects user to photo show" do
    photo = create :photo
    stub_twitter
    visit new_user_session_path
    expect_page_to_have_sign_out_and_not_sign_in

    click_link "Sign in with Twitter"

    expect_page_to_have_sign_in_and_not_sign_out
    expect(current_path).to eq(photo_path(photo))
  end
end

describe "user logs in with facebook" do
  it "redirects user to photo show" do
    photo = create :photo
    stub_facebook
    visit new_user_session_path
    expect_page_to_have_sign_out_and_not_sign_in

    click_link "Sign in with Facebook"

    expect_page_to_have_sign_in_and_not_sign_out
    expect(current_path).to eq(photo_path(photo))
  end
end

describe "user logs in with linkedin" do
  it "redirects user to photo show" do
    photo = create :photo
    stub_linkedin
    visit new_user_session_path
    expect_page_to_have_sign_out_and_not_sign_in

    click_link "Sign in with Linkedin"

    expect_page_to_have_sign_in_and_not_sign_out
    expect(current_path).to eq(photo_path(photo))
  end
end

def expect_page_to_have_sign_in_and_not_sign_out
  expect(page).to have_content("Sign out")
  expect(page).to_not have_content("Sign in")
end

def expect_page_to_have_sign_out_and_not_sign_in
  expect(page).to have_content("Sign in")
  expect(page).to_not have_content("Sign out")
end
