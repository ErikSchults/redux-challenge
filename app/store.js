import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import hashtagReducer from './reducers/hashtag'
import tweetReducer from './reducers/tweets'

const reducers = combineReducers({
  hashtag: hashtagReducer,
  tweet: tweetReducer
})

export default createStore(
  reducers,
  applyMiddleware(thunk)
)
