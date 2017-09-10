import axios from 'axios';

const options = {};
options.baseURL = 'https://jsonplaceholder.typicode.com';

export default axios.create(options);
