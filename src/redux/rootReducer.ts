import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import imageReducer from './slices/imagesGCS';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  image: imageReducer
  // others reducers
});

export { rootPersistConfig, rootReducer };
