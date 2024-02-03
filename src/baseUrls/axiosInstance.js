import axios from 'axios';
// import { privateKey, publicKey } from './keys';

const generateMD5Hash = (str) => {
    let md5 = require('blueimp-md5');
    return md5(str);
};

const publicKey = localStorage.getItem("publicKey");
const privateKey = localStorage.getItem("privateKey");

const ts = new Date().getTime();
const hash = generateMD5Hash(ts + privateKey + publicKey);

const baseURL = 'https://gateway.marvel.com/v1/public/';

const createMarvelAPIUrl = (apiUrl, additionalParams = {}) => {
    const params = {
        ts,
        apikey: publicKey,
        hash,
        ...additionalParams,
    };

    const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

    return `${baseURL}${apiUrl}?${queryString}`;
};

const axiosInstance = axios.create();

export { axiosInstance, createMarvelAPIUrl };
