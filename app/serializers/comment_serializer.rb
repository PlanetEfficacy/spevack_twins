class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :user, :comments

  has_many :comments
  belongs_to :user
end
