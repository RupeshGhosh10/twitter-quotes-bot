const { TwitterApi } = require('twitter-api-v2');
const config = require('./config.js');
const cron = require('node-cron');
const axios = require('axios');

const main = async () => {

  const twitterClient = new TwitterApi({
    appKey: config.CONSUMER_KEY,
    appSecret: config.CONSUMER_SECRET,
    accessToken: config.ACCESS_TOKEN,
    accessSecret: config.ACCESS_SECRET
  });

  const response = await axios.get('https://api.quotable.io/random?maxLength=200');
  const quote = response.data;

  const tweet = `"${quote.content}" -${quote.author}`

  await twitterClient.v1.tweet(tweet);
}

cron.schedule('0 */6 * * *', async () => {
  console.log('Stating cron task');
  try {
    await main();
    console.log('Made a tweet');
  }
  catch (e) {
    console.log(`Failed to tweet: ${e.message}`);
  }
});