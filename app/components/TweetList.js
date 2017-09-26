import React from 'react'
import {connect} from 'react-redux'

const TweetItem = props => (
  <li>{props.tweet.tweet}</li>
)

const TweetList = (props) => {
  return (
    <ul>
      {props.tweets.map((tweet, i) =>
        <TweetItem key={i} tweet={tweet} />
      )}
    </ul>
  )
}
export default connect(
  (state) => ({
    tweets: state.tweet.tweets,
  }),
)(TweetList)
