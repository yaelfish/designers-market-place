import { combineReducers } from 'redux';
import ArtworkReducer from './ArtworkReducer'
// import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  system: SystemReducer,
  artwork: ArtworkReducer,
  // user: UserReducer
})

export default rootReducer;