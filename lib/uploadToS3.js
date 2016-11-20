var fs = require('fs');
var Promise = require('promise');
var _ = require('lodash');
require('dotenv').config();

var knox = require('knox');

var client = knox.createClient({
    key: process.env.AWS_KEY,
    secret:process.env.AWS_SECRET,
  	bucket: 'zach.christmas',
  	region:'us-west-2',
});

var exportDir = '/Users/zacherdmann/Dropbox/xmas_s3/';
var upload = Promise.denodeify(client.putFile).bind(client)

var filePath,
newFileName,
headers = {
    'Content-Type': 'audio/mpeg3',
    'x-amz-acl': 'public-read'
  };

var playlist = JSON.parse(fs.readFileSync('playlist.json'));
var testlist = playlist.slice(0, 5)


var promiseArray = playlist.map( (track, idx) => {
	filePath = exportDir + track.filePath;
	newFileName = 'tunes/' + track.filePath;
	return upload(filePath, newFileName, headers).then( e => {console.log('promised'); e.resume()}).catch( err => console.log('error!',err))
})

Promise.all(promiseArray).then( (err, res) => { console.log('done!')})
