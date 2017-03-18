class Api::V1::CommentsController < ApplicationController
  def index
    render json: find_commentable.comments
  end

  def create
    commentable = find_commentable
    comment = commentable.comments.new(user: current_user, body: params[:comment][:body])
    if comment.save
      render json: comment
    end
  end

  def update
    @comment = comment.update(body: params[:comment][:body])
    if @comment.save
      render json: @comment
    end
  end

  def destroy
    comment.delete
    head :no_content
  end

  private

  def comment
    Comment.find(params[:id])
  end

  def find_commentable
    params.each do |name, value|
      if name =~ /(.+)_id$/
        return $1.classify.constantize.find(value)
      end
    end
    nil
  end
end
