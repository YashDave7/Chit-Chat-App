// const socket = io('http://localhost:8080');
const socket = io('http://localhost:8080',{transports:['websocket']});

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");
const send = document.getElementById('submit');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

// GETTING USERNAME.
const name = prompt("Enter Your Name");

// JOINED MESSAGE TO HIMSELF.
append(`You Joined the chat`,'center');

// JOINED MESSAGE TO SERVER.
socket.emit('new-user-joined', name);

// JOINED MESSAGE TO ALL OTHER USERS.
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center');
})


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const message = messageInput.value;
    append(`${message}`, 'right');
    
    // MESSAGE SENT TO SERVER.
    socket.emit('send', message);
    messageInput.value = '';
})

// SEND MESSAGE TO ALL OTHER USERS.
socket.on('receive', data => {
    append(`${data.name}  ${data.message}`, 'left');
})

// MESSAGE OF LEAVING THE CHAT TO OTHERS.
socket.on('left', name => {
    append(`${name} left the chat` , 'center');
});