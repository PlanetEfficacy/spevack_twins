require 'rails_helper'

describe "user logs in with google oauth2" do
  xit "redirects user to photo show" do
    photo = create :photo
    stub_google
    visit new_user_session_path
    expect_page_to_have_sign_out_and_not_sign_in

    click_link "Sign in with Google"

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

def expect_page_to_have_sign_in_and_not_sign_out
  expect(page).to have_content("Sign out")
  expect(page).to_not have_content("Sign in")
end

def expect_page_to_have_sign_out_and_not_sign_in
  expect(page).to have_content("Sign in")
  expect(page).to_not have_content("Sign out")
end


def stub_google
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
    provider: "google",
    uid: 1234,
    info: {
      name: "Jamie Lannister",
      email: "jaime@example.com",
      image: "https://robohash.org/#{Time.now}?set=set3",
    },
    credentials: {
      token: "my_token",
      refresh_token: "another_token",
      expires_at: "1477945241",
      expires: "true"
    },
    extra: {
      local: "en"
    }
  })
end

def stub_twitter
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
    provider: "twitter",
    uid: 5678,
    info: {
      name: "Another Name",
      image: "https://robohash.org/#{Time.now}?set=set3",
    },
    credentials: {
      token: "My twitter token",
      secret: "My twitter secret"
    }
  })
end
