var fs = require('fs');
var mm = require('musicmetadata');
var Promise = require('promise');
var _ = require('lodash');

var localFileDir = (process.env.HOME + '/Dropbox/Christmas\ Music');
var jsonFname = 'spotifyData.json';
var outputFname = 'playlist.json';

var loadData = function() {
	fs.readFile(jsonFname, findFiles)
}

var findFiles = function(err, data) {
		if(err)
		{	
			console.log(err)
			throw err
		}
		var files = fs.readdirSync(localFileDir).filter( (e) => {return e !== '.DS_Store'})
		var toSheets = JSON.parse(data).tracklist;
		console.log('files in dir loaded: ',files.length)
		fProms = files.map( (e,idx) => {
			// console.log('making promise '+(idx+1)+' of '+files.length)
		 	var mmURL = localFileDir +'/'+ e;
		 	var fStream = fs.createReadStream(mmURL)
			var parser = Promise.denodeify(mm);
			return parser(fStream, {}).catch(e => {console.log('error in parser',e)});

		});
		var c = 0;
		Promise.all(fProms).then( (results) => {
			results.forEach( (e,idx) => {
				var i = _.findIndex(toSheets, (f) =>{ 
					return (f.name.toUpperCase().trim() === e.title.toUpperCase().trim() &&  f.artist.toUpperCase().trim() === e.artist[0].toUpperCase().trim()) 
				})
			  	if(i > -1)
			  	{
			  	 toSheets[i].localPath = localFileDir +'/'+ files[idx];
			  	 c++;
			  	}
			})
			var fileObj = {
				count: toSheets.length,
				localCount:toSheets.filter( (e) => e.local).length,
				withFile: toSheets.filter( (e) => !!e.localPath).length,
				tracklist: toSheets,
			}
			var toGet = toSheets.reduce( (sum, each, idx, arr) => {
				if(!!!each.localPath)
					sum.push(each.name +" -- "+each.artist+" -- "+each.duration)
				return sum;
			}, [])
			fs.writeFile(outputFname, JSON.stringify(fileObj, null, '\t'));
			fs.writeFile('getList.txt', toGet.join('\n'));
			console.log(c +' files matched of '+toSheets.length + "🎄")
			console.log('Data written to: ', outputFname)

		}).catch( e => { console.log(e)})
}

loadData()
