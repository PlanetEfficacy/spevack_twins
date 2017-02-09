ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'capybara/rails'

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end

def stub_google
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new({
    provider: "google",
    uid: 1234,
    info: {
      name: "Jamie Lannister",
      email: "google@example.com",
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
      email: "twitter@example.com",
      image: "https://robohash.org/#{Time.now}?set=set3",
    },
    credentials: {
      token: "My twitter token",
      secret: "My twitter secret"
    }
  })
end

def stub_facebook
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:facebook] = OmniAuth::AuthHash.new({
    provider: "facebook",
    uid: "9101",
    info: {
      name: "Luke Skywalker",
      email: "facebook@example.com",
      image: "https://robohash.org/#{Time.now}?set=set3",
    },
    credentials: {
      token: "My facebook token",
    }
  })
end


def stub_linkedin
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:linkedin] = OmniAuth::AuthHash.new({
    provider: "linkedin",
    uid: "1121",
    info: {
      name: "Michael Jordan",
      email: "linkedin@example.com",
      image: "https://robohash.org/#{Time.now}?set=set3",
    },
    credentials: {
      token: "My linkedin token",
      secret: "My linkedin secret",
    }
  })
end

def stub_admin
  OmniAuth.config.test_mode = true
  OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new({
    provider: "google",
    uid: 1234,
    info: {
      name: "Jamie Lannister",
      email: ENV["MY_EMAIL"],
      image: "https://lh3.googleusercontent.com/-ZI4ojL91GxA/AAAAAAAAAAI/AAAAAAAAGVo/1F5PGMtlgHI/s50-c/photo.jpg",
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
