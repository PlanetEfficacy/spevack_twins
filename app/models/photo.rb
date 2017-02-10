class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates_presence_of :title
  validates_presence_of :caption
  validates_presence_of :date

  default_scope { order(date: :desc) }

  def self.by_year(year)
    where(date: full_year_range(year))
  end

  private
  def self.full_year_range(year)
    Date.new(year.to_i,1,1)...Date.new(year.to_i + 1,1,1)
  end
end
