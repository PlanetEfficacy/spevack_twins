class Comment < ApplicationRecord
  has_many :comments, as: :commentable, dependent: :destroy
  belongs_to :commentable, polymorphic: :true
  belongs_to :user

  validates_presence_of :body

  default_scope { order(created_at: :asc) }
end
