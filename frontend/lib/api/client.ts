import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://35.236.141.80:8000/';

// client.defaults.baseURL = '';
//client.defaults.withCredentials = true;

export default client;
