require 'rails_helper'

RSpec.describe User, type: :model do
  context "valid factory" do
    it "has a valid factory" do
      expect(build(:user)).to be_valid
    end
  end

  context "validations" do
    context "uniqueness" do
      before { create :user }
      it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    end

    context "presence" do
      it { should validate_presence_of    :email }
      it { should validate_presence_of    :name }
      it { should validate_presence_of    :image }
      it { should validate_presence_of    :provider }
      it { should validate_presence_of    :uid }
    end
  end
end
