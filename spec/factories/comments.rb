FactoryGirl.define do
  factory :comment do
    body "Pants"
    association :commentable, factory: :photo
    user
  end
end
