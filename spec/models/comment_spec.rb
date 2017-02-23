require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe "valid factory" do
    it "has a valid factory" do
      expect(build(:comment)).to be_valid
    end
  end

  describe "validations" do
    describe "presence" do
      it { should validate_presence_of    :body }
    end
  end

  describe "associations" do
    it { should belong_to :user }
    it { should belong_to :commentable }
    it { should have_many(:comments).dependent(:destroy) }
  end
end
