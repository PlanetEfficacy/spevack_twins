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

  context "associations" do
    it { should have_many(:comments).dependent(:destroy) }
  end

  context "administrative priveleges" do
    it "uses email address to determine role" do
      user = create :admin
      expect(user.admin?).to eq(true)
    end

    it "defaults to non admin" do
      user = create :user
      expect(user.admin?).to eq(false)
    end
  end
end
