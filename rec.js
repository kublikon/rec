var yelp = require('yelp-fusion');

module.exports = function(ctx, cb) {

  var getSearch = (token) => {

    var params = ctx.body.text.split(' in '),
        client = yelp.client(token);

    if(!params[1]){
      return cb(null, { text: 'What place do you want the recommendations for? [Example: /rec food in Reno]' });
    }

    client.search({
      term: params[0],
      location: params[1],
      sort_by: 'rating'
    }).then(response => {

      var rec = ':bulb: Here are some recomendations: \n\n',
          limit = (response.jsonBody.businesses.length > 3)? 3 : response.jsonBody.businesses.length;

      for(i = 0; i < limit; i++) {
        rec += response.jsonBody.businesses[i].name + ' - ' +  response.jsonBody.businesses[i].rating + ':star: \n';
      }

      cb(null, { text: rec });

    }).catch(e => {
      console.log(e);
      cb(null, { text: 'Sorry, something went wrong.' });
    });
  };

  const token = yelp.accessToken(ctx.secrets.Y_CLIENT_ID, ctx.secrets.Y_CLIENT_SECRET).then(response => {

    getSearch(response.jsonBody.access_token);

  }).catch(e => {
    console.log(e);
    cb(null, { text: 'Sorry, something went wrong.' });
  });
};
