import axios from 'axios';
import { USERS_URL, PRODUCT_URL, CARTS_URL  } from './constants';

const instance = axios.create({
  baseURL: `http://localhost:5000/`, // Backend Server URL
});

export default instance;