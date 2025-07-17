import axios from 'axios';

const httpClient = axios.create({baseURL: 'http://localhost:5000/api'});

export const getProcessors = () => httpClient.get('/processors');

export const createPhone = (value) => httpClient.post('/phones');

export const getPhones = () => httpClient.get('/phones');