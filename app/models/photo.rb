class Photo < ApplicationRecord
  mount_uploader :image, ImageUploader

  validates_presence_of :title
  validates_presence_of :caption
  validates_presence_of :date
end
