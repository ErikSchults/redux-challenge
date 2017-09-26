import {getTweets} from '../lib/twitterServices'

const initState = {
  tweets: []
}
const tweetSelector = tweet => ({id: tweet.id, tweet: tweet.text})


const TWEET_LOAD = 'TWEET_LOAD'

export const loadTweets = tweets =>
  ({type: TWEET_LOAD, payload: tweets})

export const fetchTweets = hashtag => {
  return (dispatch) => {
    getTweets(hashtag)
      .then(tweets => dispatch(loadTweets(tweets.statuses.map(tweetSelector))))
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TWEET_LOAD:
      return {...state,
        tweets: action.payload
      }
    default:
      return state
  }
}
