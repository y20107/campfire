import consumer from "./consumer"

const appRoom = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if ( document.getElementById(`form_${data["id"]}`) ) {
      // Called when there's incoming data on the websocket for this channel
      let changeForm = document.getElementById(`form_${data["id"]}`)
      changeForm.value = data["message"];
    } else {
      const messages = document.getElementById('messages');
      messages.insertAdjacentHTML('beforeend', data['message']);
    }
    let userSelect = document.getElementById(`select_${data["id"]}`)
    userSelect[data["user_id"]].selected = true ;
  },

  speak: function(message, user) {
    return this.perform('speak', {message: message, user: user});
  },

  speak_update: function(id, message, user) {
    return this.perform('speak_update', {id: id, message: message, user: user});
  }
});

function room() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    let userSelect = document.getElementById("user_select").value
    let form = document.getElementById("form").value;
    appRoom.speak(form, userSelect);
    form.value = '',
    e.preventDefault();
  });

  const changes = document.querySelectorAll(".change_send");
  changes.forEach(function (change) {
    change.addEventListener("click", (e) => { 
    // ここにクリックした時に行う「何らかの処理」を記述していく
      let messageId = change.getAttribute("data-id");
      let userSelect = document.getElementById(`select_${messageId}`).value
      let changeForm = document.getElementById(`form_${messageId}`).value;
      appRoom.speak_update(messageId, changeForm, userSelect);
      // form.value = '',
      e.preventDefault();
    });
  });
}

window.addEventListener('load', room)