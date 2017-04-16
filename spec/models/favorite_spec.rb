require 'rails_helper'

RSpec.describe Favorite, type: :model do
  describe "valid factory" do
    it "has a valid factory" do
      expect(build(:favorite)).to be_valid
    end
  end

  describe "associations" do
    it { should belong_to :user }
    it { should belong_to :photo }
  end

end
