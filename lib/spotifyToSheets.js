var spotifyPlaylist = require('spotify-playlist');
var _ = require('lodash');
var fs = require('fs');
var readline = require('readline');
var mm = require('musicmetadata');
var Promise = require('promise');

var localFileDir = (process.env.HOME + '/Dropbox/Christmas\ Music');
var xmasURI = 'spotify:user:1238473535:playlist:14YrLCRQqM36uCDl2KFd6n';
var jsonFname = 'spotifyData.json'

var toSheets = [];

var toTime = function(ms){
  var min = (ms/1000/60) << 0,
   sec = Math.trunc((ms/1000) % 60, 2);
   if(String(sec).length < 2)
   		sec = "0"+sec;
return (min + ':' + sec);

}

var callback = function(err, result) {
	// console.log(result.playlist.tracks)
    result.playlist.tracks.forEach( track => {
	    	toSheets.push({
	    		name:track.name,
	    		artist:track.artists[0],
	    		local:(!!track.href.match(/spotify\:local\:(.*)/)),
	    		duration: toTime(track.duration),
	    		// trackMeta: (!!track.href.match(/spotify\:local\:(.*)/)) ? track.href.split(':').slice(2).map( e => { return decodeURIComponent(e).replace(/\+/g, ' ') }) : null,
	    	})
    })
    console.log('toSheets loaded: ',toSheets.length)
    findFiles();
}

spotifyPlaylist.playlistUri(xmasURI, callback); //Normal spotify URI.
var findFiles = function() {
		var files = fs.readdirSync(localFileDir).filter( (e) => {return e !== '.DS_Store'})

		console.log('files in dir loaded: ',files.length)
		fProms = files.map( (e,idx) => {
			// console.log('making promise '+(idx+1)+' of '+files.length)
		 	var mmURL = localFileDir +'/'+ e;
		 	var fStream = fs.createReadStream(mmURL)
			var parser = Promise.denodeify(mm);
			return parser(fStream, {}).catch(e => {console.log('error in parser',e)});

		});
		Promise.all(fProms).then( (results) => {
			console.log('proms complete', results.length)
			results.forEach( (e,idx) => {
				var i = _.findIndex(toSheets, {name:e.title, artist:e.artist[0]})
			  	if(i > -1)
			  	{
			  	 toSheets[i].localPath = localFileDir +'/'+ files[idx];
			  	}
			})
			var fileObj = {
				count: toSheets.length,
				localCount:toSheets.filter( (e) => e.local).length,
				withFile: toSheets.filter( (e) => !!e.localPath).length,
				tracklist: toSheets,
			}
			fs.writeFile(jsonFname, JSON.stringify(fileObj, null, '\t'))
			console.log('Data written to: ', jsonFname)

		}).catch( e => { console.log(e)})
}
