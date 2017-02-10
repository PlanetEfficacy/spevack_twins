class Year::PhotosController < ApplicationController
  def index
    @photos = Photo.by_year(params[:year])
    render component: 'PhotoList', props: { photos: @photos }, tag: 'span', class: 'todo'
  end
end
