Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: "users/omniauth_callbacks"
  }

  devise_scope :user do
    get    'sign_in',  to: 'devise/sessions#new',     as: :new_user_session
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'photos#index', as: 'root'

  resources :photos, only: [:new, :create, :index]

  namespace :api do
    namespace :v1 do
      resources :photos, only: [:index] do
        resources :comments, only: [:index, :create, :update, :destroy]
      end

      namespace :photos do
        get 'one-per-year',     to: 'one_per_year#index'
        get 'one-per-month',    to: 'one_per_month#index'
        get 'all-month-year',   to: 'all_per_month_year#index'
      end
    end
  end
end
