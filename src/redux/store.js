import { createStore, combineReducers } from 'redux';
import transactionsReducer from './reducers/transactionsReducer';

const rootReducer = combineReducers({
  transactions: transactionsReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;