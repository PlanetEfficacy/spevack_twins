class Year::PhotosController < ApplicationController
  def index
    @photos = Photo.first_of_the_month(params[:year])
    render component: 'PhotoList', props: { photos: @photos }, tag: 'span', class: 'todo'
  end
end
