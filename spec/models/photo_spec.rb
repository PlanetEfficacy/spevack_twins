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
    end
  end

  context "scopes" do
    it "orders by date from latest to earliest" do
      photo_1 = create :photo, date: Date.new(2016,1,1)
      photo_2 = create :photo, date: Date.new(2017,1,1)
      photo_3 = create :photo, date: Date.new(2015,12,29)

      subject = Photo.all

      expect(subject.first).to eq(photo_2)
      expect(subject.second).to eq(photo_1)
      expect(subject.third).to eq(photo_3)
    end
  end
end

describe Photo, "#by_year(year)", type: :model do
  context "when the class method by_year is invoked" do
    it "returns all the photos in a given year" do
      create :photo, date: "2016-11-30"
      create :photo, date: "2016-12-1"
      create :photo, date: "2015-12-31"
      create :photo, date: "2017-1-1"

      result = Photo.by_year("2016").pluck(:date)
      expect(result.length).to eq(2)
      expect(result).to_not include("2015-12-31")
      expect(result).to_not include("2017-1-1")
    end
  end
end
