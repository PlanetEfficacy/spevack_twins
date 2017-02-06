FactoryGirl.define do
  factory :photo do
    title "My title"
    caption "My caption"
    date "2017-01-30"
    image { Faker::Placeholdit.image }
  end
end
