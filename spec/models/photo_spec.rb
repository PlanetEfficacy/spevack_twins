require 'rails_helper'

RSpec.describe Photo, type: :model do
  describe "valid factory" do
    it "has a valid factory" do
      expect(build(:photo)).to be_valid
    end
  end

  describe "validations" do
    describe "presence" do
      it { should validate_presence_of    :title }
      it { should validate_presence_of    :caption }
      it { should validate_presence_of    :date }
    end
  end

  describe "associations" do
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe "scopes" do
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

describe Photo, "#one_per_year", type: :model do
  context "when the class method one_per_year is invoked" do
    it "returns one photo per year" do
      create :photo, date: "2016-11-30"
      create :photo, date: "2016-1-1"
      create :photo, date: "2015-12-29"
      create :photo, date: "2015-1-1"
      create :photo, date: "2017-1-1"

      result = Photo.one_per_year.pluck(:date)

      expect(result.length).to eq(3)
      expect(result).to_not include("2015-12-29")
      expect(result).to_not include("2016-1-1")
      expect(result).to_not include("2017-1-1")
    end
  end
end

describe Photo, "#one_per_month(year)", type: :model do
  context "when the class method first_of_the_month is invoked" do
    it "returns the first photo for each month of the selected year" do
      create :photo, date: "2016-11-30"
      subject = create :photo, date: "2016-12-1"
      create :photo, date: "2017-1-1"

      result = Photo.one_per_month("2016")

      expect(result.length).to eq(1)
      expect(result.first).to eq(subject)
    end

    it "returns handles 2015 correctly" do 
      subject = create :photo, date: "2015-12-29"
      create :photo, date: "2015-12-30"
      create :photo, date: "2015-12-31"

      result = Photo.one_per_month("2015")

      expect(result.length).to eq(1)
      expect(result.first).to eq(subject)
    end
  end
end

describe Photo, "#by_year_and_month(year, month)", type: :model do
  context "when the class method by_year_and_month is invoked" do
    it "returns all the photos in a given year month pair" do
      create :photo, date: "2016-11-30"
      create :photo, date: "2016-11-2"
      create :photo, date: "2015-11-30"
      create :photo, date: "2016-12-1"

      result = Photo.by_year_and_month("2016", "11")

      expect(result.length).to eq(2)
      expect(result.pluck(:date)).to include(Date.new(2016,11,30))
      expect(result.pluck(:date)).to include(Date.new(2016,11,2))
    end

    it "returns adjusts month and year correctly for december" do
      create :photo, date: "2016-12-1"
      create :photo, date: "2016-12-31"
      create :photo, date: "2017-1-1"

      result = Photo.by_year_and_month("2016", "12")

      expect(result.length).to eq(2)
      expect(result.pluck(:date)).to include(Date.new(2016,12,1))
      expect(result.pluck(:date)).to include(Date.new(2016,12,31))
    end
  end
end
