class Photo < ApplicationRecord
  validates_presence_of :title
  validates_presence_of :caption
  validates_presence_of :date
  validates_presence_of :image
end
