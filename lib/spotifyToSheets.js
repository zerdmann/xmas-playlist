var spotifyPlaylist = require('spotify-playlist');
var _ = require('lodash');
var fs = require('fs');
var readline = require('readline');
var mm = require('musicmetadata');
var Promise = require('promise');



// var google = require('googleapis');
// var googleAuth = require('google-auth-library');

var startRow = 2;
var endRow = 87;

var localFileDir = (process.env.HOME + '/Dropbox/Christmas\ Music');
var xmasURI = 'spotify:user:1238473535:playlist:14YrLCRQqM36uCDl2KFd6n';



// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-xmas.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Sheets API.
  authorize(JSON.parse(content), pullData);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}



var toSheets = [];

var callback = function(err, result) {
	// console.log(result)
    result.playlist.tracks.forEach( track => {
    	if(track.href.match(/spotify\:local\:(.*)/))
	    	toSheets.push({
	    		name:track.name,
	    		artist:track.artists.join(','),
	    		local:(!!track.href.match(/spotify\:local\:(.*)/)),
	    		// trackMeta: (!!track.href.match(/spotify\:local\:(.*)/)) ? track.href.split(':').slice(2).map( e => { return decodeURIComponent(e).replace(/\+/g, ' ') }) : null,
	    	})
    })
    // console.log(toSheets)
    findFiles();
}

spotifyPlaylist.playlistUri(xmasURI, callback); //Normal spotify URI.
var findFiles = function() {
		var files = fs.readdirSync(localFileDir)
		// console.log(files.length)
		fProms = files.map( (e) => {
		 	var mmURL = localFileDir +'/'+ e;
		 	var fStream = fs.createReadStream(mmURL)
			var parser = Promise.denodeify(mm);
			parser.url = mmURL;
			return parser(fStream, {});

		});
		console.log(fProms.length)
		// fProms[0].then( (result) => console.log('0',result))
		Promise.all(fProms).then( (results) => {
			results.forEach( (e,idx) => {
				var i = _.findIndex(toSheets, {name:e.title})
			  	if(i > -1)
			  	{
			  	 toSheets[i].localPath = localFileDir +'/'+ files[idx];
			  	}
			})
			console.log(toSheets)
		})
}
