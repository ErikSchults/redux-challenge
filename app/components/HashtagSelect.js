import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTweets} from '../reducers/tweets'
import {fetchHashtags} from '../reducers/hashtag'

const SelectItem = (props) => (
  <option value={props.hashtag.query}>{props.hashtag.name}</option>
)

class HashtagSelect extends Component {
  componentDidMount() {
    this.props.fetchHashtags()
  }

  onHashtagSelect = event => {
    this.props.fetchTweets(event.target.value)
  }

  render() {
    return (
      <div className="HashtagSelect">
        <select onChange={this.onHashtagSelect} className="HashtagList">
          <option disabled selected>Select hashtag</option>
          {this.props.hashtags.map((hashtag, i) =>
            <SelectItem key={i} hashtag={hashtag} />
          )}
        </select>
      </div>
    )
  }
}


export default connect(
  (state) => ({
    hashtags: state.hashtag.hashtags,
  }),
  {fetchTweets, fetchHashtags}
)(HashtagSelect)
