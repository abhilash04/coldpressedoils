import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

// Initial State
const initialUserState = {
  userData: null,
  userError: null,
  loading: false
};

// User Reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'GET_USER_START':
      return { ...state, loading: true };
    case 'GET_USER_SUCCESS':
      return { ...state, loading: false, userData: action.payload, userError: null };
    case 'GET_USER_FAILURE':
      return { ...state, loading: false, userError: action.payload };
    case 'LOGOUT':
      return initialUserState;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
