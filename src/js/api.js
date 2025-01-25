import axios from 'axios';
import { API_ENDPOINT } from './settings.js';

axios.defaults.baseURL = API_ENDPOINT;

export const fetchCategories = (filter, page, perPage) => {
  const requestParams = {
    filter: filter,
    page: page,
    limit: perPage,
  };
  return axios.get(`/filters`, { params: requestParams });
};

export const fetchExerciseById = (id) => {
  return axios.get(`/exercises/${id}`);
};

export const fetchExercises = (filters) => {
  return axios.get('/exercises', { params:filters });
};

export const submitRating = (id, rate, email, review) => {
  const requestBody = {
    rate,
    email,
    review,
  };
  return axios.patch(`/exercises/${id}/rating`, requestBody);
};
