Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  namespace :api do
    resources :messages, only: :index, defaults: { format: 'json' }
  end
  resources :users ,only: [:index, :edit ,:update]
  resources :groups ,only: [:index,:new ,:create,:edit,:update] do
    resources :messages ,only: [:index ,:create]
  end
end
