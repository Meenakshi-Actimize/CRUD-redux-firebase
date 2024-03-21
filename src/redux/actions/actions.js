import axios from 'axios';
import { FETCH_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE,DELETE_EMPLOYEE } from '../apis/apis';

// Action creators
export const fetchEmployees = () => async (dispatch) => {
  try {
    const response = await axios.get('https://crud-first-751c1-default-rtdb.firebaseio.com/employees.json');
    const data = response.data;
    console.log(response.data);
    const employeesArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    dispatch({ type: FETCH_EMPLOYEES, payload: employeesArray });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


// Define other action creators for adding, updating, and deleting employees
