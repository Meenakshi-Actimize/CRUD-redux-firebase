import { FETCH_EMPLOYEES, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../apis/apis';

// Initial state
const initialState = {
  employees: [],
};

// Root reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {

        employees: action.payload,
      };
    // Define cases for other actions like ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE
    default:
      return state;
  }
};

export default rootReducer;
