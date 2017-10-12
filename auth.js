var request = require('request');

module.exports = function (ctx, done) {

  var options = {
    url: 'https://slack.com/api/oauth.access',
    method: 'POST',
    json: true,
    form: {
      client_id: ctx.secrets.CLIENT_ID,
      client_secret:ctx.secrets.CLIENT_SECRET,
      code: ctx.data.code,
      redirect_uri: 'https://wt-e168b97e6551dfeca6cc36ee717d131c-0.run.webtask.io/oauth'
    }
  }

  request(options, function(err, response, body) {
    if(err){
      console.log('Error:', err);
    } else {
      done(null, 'Application connected to Slack!');
    }
  });
}
