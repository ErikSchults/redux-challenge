import {getTrendingHashtags} from '../lib/twitterServices'

const initState = {
  hashtags: []
}
const hashtagsInit = [
  'first',
  'second',
  'third',
  'fourth',
]

const HASHTAG_LOAD = 'HASHTAG_LOAD'

export const loadHashtags = hashtags =>
  ({type: HASHTAG_LOAD, payload: hashtags})

export const fetchHashtags = () => {
  return (dispatch) => {
    getTrendingHashtags()
      .then(hashtags => dispatch(loadHashtags(hashtags)))
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case HASHTAG_LOAD:
      return {...state,
        hashtags: action.payload
      }
    default:
      return state
  }
}
