require 'rails_helper'

describe "GET api/v1/photos/:id/comments", type: :request do
  let(:user) { create :user }
  let(:photo) { double }
  let(:photo_comments) { double }

  it "returns all comments for a given photo" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    expect(photo).to receive(:comments).and_return(photo_comments)
    sign_in user

    get "/api/v1/photos/1/comments"

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(photo).to receive(:comments).and_return(photo_comments)

    get "/api/v1/photos/1/comments"

    expect(response).to have_http_status(302)
  end
end

describe "POST api/v1/photos/:id/comments", type: :request do
  let(:user) { create :user }
  let(:photo) { double }
  let(:comment_list) { double }
  let(:comment) { double }

  it "returns the newly posted comment for a given photo" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(photo).to receive(:comments).and_return(comment_list)
    allow(comment_list).to receive(:new).with(user: user, body: 'pants').and_return(comment)
    expect(comment).to receive(:save).and_return(true)
    sign_in user

    post api_v1_photo_comments_path('1'), params: { comment: { body: 'pants' } }

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Photo).to receive(:find).with('1').and_return(photo)
    allow(Comment).to receive(:new).with(photo: photo, user: user, body: 'pants').and_return(comment)
    allow(comment).to receive(:save).and_return(true)

    post api_v1_photo_comments_path('1'), params: { comment: { body: 'pants' } }

    expect(response).to have_http_status(302)
  end
end

describe "GET api/v1/comments/:id/comments", type: :request do
  let(:user) { create :user }
  let(:comment) { double }
  let(:comment_list) { double }

  it "returns all comments for a given photo" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    expect(comment).to receive(:comments).and_return(comment_list)
    sign_in user

    get "/api/v1/comments/1/comments"

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    allow(comment).to receive(:comments).and_return(comment_list)

    get "/api/v1/comments/1/comments"

    expect(response).to have_http_status(302)
  end
end

describe "POST api/v1/comments/:comment_id/comments", type: :request do
  let(:user) { create :user }
  let(:comment) { double } 
  let(:comment_list) { double }
  let(:child_comment) { double }

  it "returns the newly created comment for a given comment" do 
    allow(Comment).to receive(:find).with('1').and_return(comment)
    allow(comment).to receive(:comments).and_return(comment_list)
    allow(comment_list).to receive(:new).with(user: user, body: 'pants').and_return(child_comment)
    expect(child_comment).to receive(:save).and_return(true)
    sign_in user

    post api_v1_comment_comments_path('1'), params: { comment: { body: 'pants' } }

    expect(response).to be_ok
  end

  it "returns a 401 if the user is not signed in " do  
    allow(Comment).to receive(:find).with('1').and_return(comment)
    allow(comment).to receive(:comments).and_return(comment_list)
    allow(comment_list).to receive(:new).with(user: user, body: 'pants').and_return(child_comment)
    allow(child_comment).to receive(:save).and_return(true)

    post api_v1_photo_comments_path('1'), params: { comment: { body: 'pants' } }

    expect(response).to_not be_ok
  end
end

describe "PATCH api/v1/comments/:id", type: :request do
  let(:user) { create :user }
  let(:comment) { double }

  it "returns the newly updated comment for a given commentable" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    expect(comment).to receive(:update).with(body: 'pants').and_return(comment)
    expect(comment).to receive(:save).and_return(true)
    sign_in user

    patch api_v1_comment_path('1', '1'), params: { comment: { body: 'pants' } }

    expect(response).to be_ok
  end

  it "returns 302 if a user is not signed in" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    allow(comment).to receive(:update).with(user: user, body: 'pants').and_return(comment)
    allow(comment).to receive(:save).and_return(true)

    patch api_v1_comment_path('1', '1'), params: { comment: { body: 'pants' } }

    expect(response).to have_http_status(401)
  end
end

describe "DELETE api/v1/comments/:id", type: :request do
  let(:user) { create :user }
  let(:comment) { double }

  it "returns an ok status" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    expect(comment).to receive(:delete)
    sign_in user

    delete api_v1_comment_path('1')

    expect(response).to have_http_status(:no_content)
  end

  it "returns 302 if a user is not signed in" do
    allow(Comment).to receive(:find).with('1').and_return(comment)
    allow(comment).to receive(:delete)

    delete api_v1_comment_path('1')

    expect(response).to have_http_status(302)
  end
end
