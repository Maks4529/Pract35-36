import axios from 'axios';
import queryString from "query-string";

const httpClient = axios.create({baseURL: 'http://localhost:5000/api'});

export const getProcessors = () => httpClient.get('/processors');

export const createPhone = (value) => httpClient.post('/phones', value);

export const getPhones = (page) => httpClient.get(`/phones?${queryString.stringify(page)}`);