import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Add middleware to createStore
var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import WhiskeyReducer from 'reducers/whiskey';
import UserReducer from 'reducers/user';
import ShowReducer from 'reducers/show';

// Combine Reducers
var reducers = combineReducers({
  whiskeyReducer: WhiskeyReducer,
  userReducer: UserReducer,
  showReducer: ShowReducer
  // more...
});

// Create Store
var store = createStoreWithMiddleware(reducers);

export default store;
