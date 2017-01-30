Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'photos#show', as: 'root'
  resources :sessions, only: [:new, :create, :destroy]
  resources :photos, only: [:show]

end
