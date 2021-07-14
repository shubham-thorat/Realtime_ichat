const socket = io('http://localhost:8000')


const form = document.getElementById('form')
const messageInp = document.getElementById('message')
const messagecontainer = document.querySelector(".container")
var audio = new Audio('ringtone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if (position == 'left')
        audio.play();
}
document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You : ${message}`, 'right')
    socket.emit('send', message);
    messageInp.value = "";

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`You : ${message}`, 'right')
    socket.emit('send', message);
    messageInp.value = "";
})
const Name = prompt("Enter your name to join");
// console.log('good');
socket.emit('new-user-joined', Name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', data => {
    append(`${data} : left the chat :)`, 'left')
})
