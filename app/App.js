import React, { Component } from 'react';
import './App.css';
import HashtagSelect from './components/HashtagSelect'
import TweetList from './components/TweetList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Select a hashtag</h2>
          <h3 style={{position: 'absolute', top: '20px'}}>to see tweets</h3>
        </div>
        <div className="App-tweets">
          <HashtagSelect />
          <TweetList />
        </div>
      </div>
    );
  }
}

export default App
