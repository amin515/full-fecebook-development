import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux';
import rootReducers from './rootReducers';
import thunk from 'redux-thunk';

const middleware = [thunk]

// create store
const store = createStore( rootReducers, composeWithDevTools( applyMiddleware(...middleware)) );


// export store
export default store;