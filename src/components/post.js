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

export default sendContact