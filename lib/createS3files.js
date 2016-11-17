var fs = require('fs');
var Promise = require('promise');
var _ = require('lodash');
var child_process = require('child_process');
var crypto = require('crypto');
var hash = crypto.createHash('md5');

var playlistFN = 'playlist.json';
var exportDir = '/Users/zacherdmann/Dropbox/xmas_s3/';

var exportFN = 'playlist.json';

var playlist = JSON.parse(fs.readFileSync(playlistFN));
var source, target, id3, cp, hash;


playlist.forEach( (track,idx) => {
	hash = crypto.createHash('md5');
	hash.update(track.name)
	hash.update(track.artist)
	source = track.localPath;
	track.hashName = hash.digest('hex')+'.mp3'
	target = exportDir+track.hashName;
	cp = "cp \""+source+"\" \""+target+"\"";
	id3 = "id3tag --album='coal' --year='' --song='bah' --artist='humbug' --total=0 --track=0 \""+target+"\"";

	child_process.exec(id3, 
		(error, stdout, stderr) => {  
			if (error) {
    		console.error(`exec error: ${error}`);
    		return;
  			}
	
	}
	)

	// console.log(idx+1,'/136')
} )
var fileObj = _.map(playlist, (e) => {return {name: e.name, artist:e.artist, localPath:e.localPath, filePath:e.hashName, duration:e.duration}})
fs.writeFileSync(exportFN, JSON.stringify(fileObj, null, '\t'));
console.log('Done 🎅');