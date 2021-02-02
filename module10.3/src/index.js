const wsUri = 'wss://echo.websocket.org/';

const btnSendMessage = document.getElementById('send-message');
const btnSendGeo = document.getElementById('send-geo');

let websocket;
websocket = new WebSocket(wsUri)

function writeToScreen(message) {
    const chatWindow = document.getElementById('chat');

    let pre = document.createElement('div');
    pre.innerHTML = message;
    chatWindow.appendChild(pre);
}

websocket.onopen = function (evt) {
    const startMessage = document.getElementById('start-message');
    writeToScreen('Your interlocutor is online')
    startMessage.remove();
}


btnSendMessage.addEventListener('click', () => {
    const enterMessage = document.getElementById('enter-message').value;

    websocket.onmessage = function (evt) {
        writeToScreen(
          '<div class="bot-message">' + 'Echo Bot: ' + '</div>'
          + '<br/>'
          + '<div class="bot-message message-style">' + evt.data + '</div>'
          );
    }
    writeToScreen(
      '<div class="user-message">' + 'Your message: ' + '</div>'
      + '<br/>'
      + '<div class="user-message message-style">' + enterMessage + '</div>'
      );
    websocket.send(enterMessage);
    console.log(websocket.onopen)
});

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapLink = document.getElementById('mapLink')

    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Your geo-location';
}

btnSendGeo.addEventListener('click', () => {

    if(!navigator.geolocation) {
        writeToScreen(
            '<div class="user-message">' + 'Your message: ' + '</div>'
            + '<br/>'
            + '<div class="user-message message-style">' + 'Geolacation not supported by your browser' + '</div>'
        );
    } else {
        writeToScreen(
            '<div class="user-message">' + 'Your message: ' + '</div>'
            + '<br/>'
            + '<div class="user-message message-style">' + '<a id="mapLink">' + navigator.geolocation.getCurrentPosition(success)  + '</a>' + '</div>'
        );
    }
});