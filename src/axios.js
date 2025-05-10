import axios from 'axios';

const requester = axios.create ({
    baseUrl: 'http://localhost:8000',
})

export default requester;