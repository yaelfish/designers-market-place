import { combineReducers } from 'redux';
import ArtworkReducer from './ArtworkReducer'
import UserReducer from './UserReducer'
import SystemReducer from './SystemReducer';
import ReviewReducer from './ReviewReducer'

const rootReducer = combineReducers({
  system: SystemReducer,
  artwork: ArtworkReducer,
  user: UserReducer,
  review: ReviewReducer
})

export default rootReducer;