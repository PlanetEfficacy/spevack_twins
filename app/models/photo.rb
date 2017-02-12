class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates_presence_of :title
  validates_presence_of :caption
  validates_presence_of :date

  default_scope { order(date: :desc) }

  # def self.by_year(year)
  #   where(date: full_year_range(year))
  # end

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
end
