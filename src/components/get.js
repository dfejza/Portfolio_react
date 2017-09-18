import axios from 'axios';

function getChatData() {
	return axios.get('/updatechat')
	.then((response) => {
		console.log(response.data);
		return response.data;
	});
}

export default getChatData