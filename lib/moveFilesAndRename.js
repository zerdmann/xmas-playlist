var fs = require('fs');
var Promise = require('promise');
var _ = require('lodash');
var child_process = require('child_process');

var playlistFN = 'playlist.json';
var exportDir = '/Users/zacherdmann/Dropbox/xmas_export';

var exportFN = 'upload.json';

var playlist = JSON.parse(fs.readFileSync(playlistFN)).tracklist;
var source, target, id3, cp;


playlist.forEach( (track,idx) => {
	source = track.localPath;
	target = exportDir+'/'+track.artist+' - '+track.name+'.mp3';
	track.exportPath = target;
	cp = "cp \""+source+"\" \""+target+"\"";
	id3 = "id3tag --album=\"Yule Be Rockin'\" --year=\'2016\' --song=\""+track.name+"\" --artist=\""+track.artist+"\" --genre=12 --total=136 --track="+(idx+1)+" \""+target+"\"";
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
var fileObj = _.map(playlist, (e) => {return {name: e.name, artist:e.artist, localPath:e.exportPath, duration:e.duration}})
fs.writeFileSync(exportFN, JSON.stringify(fileObj, null, '\t'));
console.log('Done 🎅')
