Rails.application.routes.draw do
  root "static_pages#root"
  
  resources :users, only: [:new, :create]
  
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:update, :show, :index, :update]
    resources :entries, only: [:create, :update, :index, :show, :destroy]
    resources :images, only: [:create, :show, :destroy, :update]
  end
  
end
