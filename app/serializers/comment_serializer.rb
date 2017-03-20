class CommentSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :id, :body, :created_at, :updated_at, :user, :comments

  has_many :comments 
  belongs_to :user

  def created_at
    time_ago_in_words(object.created_at)
    # object.created_at.strftime('%a %b %d, %Y %I:%M %p')
  end
end
