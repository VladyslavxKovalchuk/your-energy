import axios from 'axios';
import { API_ENDPOINT } from './settings.js';

axios.defaults.baseURL = API_ENDPOINT;

export const fetchCategories = (filter, page, perPage) => {
  const requestParams = {
    filter: filter,
    page: page,
    limit: perPage,
  };
  return axios.get(`/api/filters`, { params: requestParams });
};

export const fetchExerciseById = (id) => {
  return axios.get(`/api/exercises/${id}`);
};

export const fetchExercises = (filters) => {
  return axios.get('/api/exercises', { params:filters });
};
