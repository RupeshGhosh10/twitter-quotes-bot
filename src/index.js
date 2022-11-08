const { TwitterApi } = require('twitter-api-v2');
const config = require('./config.js');
const cron = require('node-cron');

const main = async () => {

  const twitterClient = new TwitterApi({
    appKey: config.CONSUMER_KEY,
    appSecret: config.CONSUMER_SECRET,
    accessToken: config.ACCESS_TOKEN,
    accessSecret: config.ACCESS_SECRET
  });

  const data = await fetch('https://api.quotable.io/random?maxLength=200');
  const quote = await data.json();

  const tweet = `"${quote.content}" -${quote.author}`

  await twitterClient.v1.tweet(tweet);
}

cron.schedule('*/1 * * * *', async () => {
  await main();
  console.log('Made a tweet');
});