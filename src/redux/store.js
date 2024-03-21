import { createStore } from 'redux';
import rootReducer from '../redux/reducer/reducers';

const store = createStore(rootReducer);

export default store;
