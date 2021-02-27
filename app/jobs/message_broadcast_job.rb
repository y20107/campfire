class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message,action)
    # Do something later
    if action == "create_commit"
      ActionCable.server.broadcast 'room_channel', { message: render_message(message), id: message.id, user_id: message.user_id }
    else
      ActionCable.server.broadcast 'room_channel', { message: message.content, id: message.id, user_id: message.user_id}
    end
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
