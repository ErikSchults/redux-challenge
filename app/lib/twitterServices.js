export const getTrendingHashtags = () => {
  return fetch('http://localhost:3000/hashtags').then(res => res.json())
}

export const getTweets = (hashtag) => {
  return fetch(`http://localhost:3000/hashtags/${hashtag}/tweets`)
    .then(res => res.json())
}
