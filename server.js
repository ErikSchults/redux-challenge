/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const Twit = require('twit')
const T = new Twit({
  consumer_key:         'ruXOsHiqbcaLFxySidpsNvkYX',
  consumer_secret:      'b4bwdqzolO3R79ifxjazNzT7R3oJ5uk4rkjnvU8HhCPG3lIFdT',
  access_token:         '911113284325183488-GvsoP7a0HQwYk7Q0QTptLiMFU8G5gra',
  access_token_secret:  'h0ztBXopcG2RYYDYjKNDYngT1y0M2sy9lp3O1NZ1FWzww',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.get('/hashtags', (req, res) => {
  getTrendingHashtags()
    .then(data => {
      res.write(JSON.stringify(
        data[0].trends
          .splice(0, 5)))
      res.end()
    })
})

app.get('/hashtags/:hashtag/tweets', (req, res) => {
  getTweets(req.params.hashtag)
    .then(data => {
      res.write(JSON.stringify(data))
      res.end()
    })
})

function getTrendingHashtags() {
  return new Promise(function(resolve, reject) {
    T.get('trends/place', {id: 1, count: 5}, (err, data, response) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  });
}

function getTweets(hashtag) {
  return new Promise(function(resolve, reject) {
    T.get('search/tweets', {q: hashtag, count: 10, include_entities: 'false'},
      (err, data, response) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    )
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
