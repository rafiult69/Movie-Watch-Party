const socket = io();
let username = prompt("Enter your name:");

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Send message on form submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', { user: username, message: input.value });
        input.value = '';
    }
});

// Receive and display messages
socket.on('chat message', function(data) {
    const item = document.createElement('li');
    item.classList.add('message');
    item.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});