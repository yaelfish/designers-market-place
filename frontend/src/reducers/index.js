import { combineReducers } from 'redux';
import ArtworkReducer from './ArtworkReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';
import ReviewReducer from './ReviewReducer';
import OrderReducer from './OrderReducer'

const rootReducer = combineReducers({
  system: SystemReducer,
  artwork: ArtworkReducer,
  user: UserReducer,
  review: ReviewReducer,
  order: OrderReducer 
})

export default rootReducer;