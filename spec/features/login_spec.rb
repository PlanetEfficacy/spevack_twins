require 'rails_helper'

describe "user logs in with google oauth2" do
  it "redirects user to photo index" do
    photo = create :photo
    stub_google
    visit new_user_session_path
    expect_page_to_have_sign_in_and_not_sign_out

    click_link "Google"

    expect(current_path).to eq(photos_path)
  end
end

describe "user logs in with twitter" do
  it "redirects user to photo index" do
    photo = create :photo
    stub_twitter
    visit new_user_session_path
    expect_page_to_have_sign_in_and_not_sign_out

    click_link "Twitter"

    expect(current_path).to eq(photos_path)
  end
end

describe "user logs in with facebook" do
  it "redirects user to photo index" do
    photo = create :photo
    stub_facebook
    visit new_user_session_path
    expect_page_to_have_sign_in_and_not_sign_out

    click_link "Facebook"

    expect(current_path).to eq(photos_path)
  end
end

describe "user logs in with linkedin" do
  it "redirects user to photo index" do
    photo = create :photo
    stub_linkedin
    visit new_user_session_path
    expect_page_to_have_sign_in_and_not_sign_out

    click_link "LinkedIn"

    expect(current_path).to eq(photos_path)
  end
end

describe "admin logs in" do
  it "redirects user to photo create" do
    stub_admin
    visit new_user_session_path
    expect_page_to_have_sign_in_and_not_sign_out

    click_link "Google"

    expect(current_path).to eq(new_photo_path)
  end
end

def expect_page_to_have_sign_in_and_not_sign_out
  expect(page).to have_css("#sign-in")
  expect(page).to_not have_css("#sign-out")
end
