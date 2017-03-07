class Api::V1::CommentsController < ApplicationController
  def index
    render json: photo.comments
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    end
  end

  def update
    comment.update(comment_params)
    if comment.save
      render json: comment
    end
  end

  def destroy
    comment.delete
    head :no_content
  end

  private

  def photo
    Photo.find(params[:photo_id])
  end

  def comment
    Comment.find(params[:id])
  end

  def comment_params
    { commentable: photo, user: current_user, body: params[:comment][:body] }
  end
end
