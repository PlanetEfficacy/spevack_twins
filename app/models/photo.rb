class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates_presence_of :title
  validates_presence_of :caption
  validates_presence_of :date

  default_scope { order(date: :desc) }

  BDAY = Date.new(2015,12,29)

  def self.one_per_year
    where("date IN (?)", first_of_the_year_dates).select('distinct on (date) *')
  end

  def self.first_of_the_month(year)
    where("date IN (?)", first_of_the_month_dates(year)).select('distinct on (date) *')
  end

  def self.by_year_and_month(year, month)
    where(date: full_month_range(year, month))
  end

  private
  def self.full_year_range(year)
    Date.new(year.to_i,1,1)...Date.new(year.to_i + 1,1,1)
  end

  def self.full_month_range(year, month)
    Date.new(year.to_i, month.to_i, 1)...Date.new(year.to_i, month.to_i + 1, 1)
  end

  def self.first_of_the_month_dates(year)
    dates = []
    12.times { |i| dates.push(Date.new(year.to_i, i + 1, 1)) }
    dates
  end

  def self.first_of_the_year_dates
    years_of_life.map { |year| year == 2015 ? BDAY : Date.new(year,1,1) }
  end

  def self.years_of_life
    (2015..first.date.year).to_a
  end
end
