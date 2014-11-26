Rails.application.routes.draw do
  root "static_pages#root"
  
  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api do
    resources :posts, only: [:create, :index, :show, :destroy]
  end
  
end
