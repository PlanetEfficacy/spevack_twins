require 'rails_helper'

RSpec.describe Photo, type: :model do
  context "valid factory" do
    it "has a valid factory" do
      expect(build(:photo)).to be_valid
    end
  end

  context "validations" do
    context "presence" do
      it { should validate_presence_of    :title }
      it { should validate_presence_of    :caption }
      it { should validate_presence_of    :date }
      it { should validate_presence_of    :image }
    end
  end
end
