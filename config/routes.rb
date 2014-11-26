Rails.application.routes.draw do
  root "static_pages#root"
  
  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:update, :show, :index]
    resources :entries, only: [:create, :index, :show, :destroy]
  end
  
end
