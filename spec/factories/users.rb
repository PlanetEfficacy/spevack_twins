FactoryGirl.define do
  factory :user do
    email "faker@example.com"
    name "Trey Anastasio"
    image "https://robohash.org/#{Time.now}?set=set3"
    provider [:google, :twitter, :facebook, :linkedin].shuffle.pop
    uid "12345"

    factory :admin do
      email ENV["MY_EMAIL"]
    end
  end
end
