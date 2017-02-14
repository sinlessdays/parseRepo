// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  serverURL: "https://uber619.herokuapp.com/parse",
  databaseURI: databaseUri || 'mongodb://heroku_2j9lph57:9e5manc52h8s4kc81e8o5h8gmg@ds149049.mlab.com:49049/heroku_2j9lph57',
  publicServerURL: process.env.PARSE_PUBLIC_SERVER_URL || 'https://uber619.herokuapp.com/parse',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'uber123ljfdsakj324czdfe',
  masterKey: process.env.MASTER_KEY || 'kajsfkjwekqrj34324dc' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
