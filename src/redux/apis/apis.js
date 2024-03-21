    
// api.js
import axios from 'axios';

const baseURL = 'https://crud-first-751c1-default-rtdb.firebaseio.com/employees.json';

export const FETCH_EMPLOYEES = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    const jsonData = response.data;

    if (jsonData === null) {
      return [];
    } else {
      return Object.keys(jsonData).map((key) => ({ id: key, ...jsonData[key] }));
    }
  } catch (error) {
    console.log('error occured')
  }
};

export const ADD_EMPLOYEE = async (formData) => {
  try {
    await axios.post(`${baseURL}`, formData);
  } catch (error) {
    console.log('error occured')
  }
};

export const UPDATE_EMPLOYEE = async (id, formData) => {
  try {
    await axios.put(`${baseURL}/${id}.json`, formData);
  } catch (error) {
    console.log('error occured')
  }
};

export const DELETE_EMPLOYEE = async (id) => {
  try {
    await axios.delete(`${baseURL}/${id}.json`);
  } catch (error) {
    console.log('error occured')
  }
};
