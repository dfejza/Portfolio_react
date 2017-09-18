import axios from 'axios';

function sendContact(data) {
    axios.post('/sendtodb', data)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function sendChat(data) {
	console.log("testing");
	console.log(data);
    axios.post('/insertchat', data);
}

export default { sendChat,sendContact };