class Year::PhotosController < ApplicationController
  def index
    @photos = Photo.first_of_the_month(params[:year])
    render component: 'App', props: { photos: @photos, componentName: "PhotoList" }, tag: 'span', class: 'todo'
  end
end
