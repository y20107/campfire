class Message < ApplicationRecord
  belongs_to :user
  
  after_create_commit :create_broadcastjob
  after_update_commit :update_broadcastjob

  def create_broadcastjob
    @action = "create_commit"
    MessageBroadcastJob.perform_later(self, @action)
  end

  def update_broadcastjob
    @action = "update_commit"
    MessageBroadcastJob.perform_later(self, @action)
  end
end
