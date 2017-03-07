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

  describe "scopes" do
    it "orders by date from earliest to latest" do
      comment_1 = create :comment, created_at: Date.new(2016,1,1)
      comment_2 = create :comment, created_at: Date.new(2017,1,1)
      comment_3 = create :comment, created_at: Date.new(2015,12,29)

      subject = Comment.all

      expect(subject.first).to eq(comment_3)
      expect(subject.second).to eq(comment_1)
      expect(subject.third).to eq(comment_2)
    end
  end
end
