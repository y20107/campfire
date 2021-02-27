Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  root to: 'rooms#show'
end
