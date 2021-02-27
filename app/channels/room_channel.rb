class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    # ActionCable.server.broadcast 'room_channel', message: data['message']
    Message.create! content: data['message'], user_id: data['user']
  end

  def speak_update(data)
    message = Message.find(data['id'])
    # ActionCable.server.broadcast 'room_channel', message: data['message']
    message.update! content: data['message'], user_id: data['user']
    # after_update_commit { ActionCable.server.broadcast 'room_channel', {message: data, id: data["id"]} }
  end
end