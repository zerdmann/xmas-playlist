import _ from 'lodash'
import shuffle from 'shuffle-seed';

var playlist = [
	{
		"name": "(Merry Christmas) We Must Be Having One",
		"artist": "Tammy Wynette",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Tammy Wynette - (Merry Christmas) We Must Be Having One.mp3",
		"filePath": "eda88aef588c901f582fa3e615762776.mp3",
		"duration": "2:30"
	},
	{
		"name": "I'll Be Home For Christmas",
		"artist": "Bing Crosby",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bing Crosby - I'll Be Home For Christmas.mp3",
		"filePath": "9aad0f0a125c75a060d75ac5efc19368.mp3",
		"duration": "2:55"
	},
	{
		"name": "Linus And Lucy",
		"artist": "Vince Guaraldi Trio",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Vince Guaraldi Trio - Linus And Lucy.mp3",
		"filePath": "e3cfa7855894fe1e488dca3e4fb9defe.mp3",
		"duration": "3:05"
	},
	{
		"name": "Father Christmas",
		"artist": "The Kinks",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Kinks - Father Christmas.mp3",
		"filePath": "61ff5340aac49479263e8102f76bf4c2.mp3",
		"duration": "3:42"
	},
	{
		"name": "Silver And Gold",
		"artist": "Burl Ives",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Burl Ives - Silver And Gold.mp3",
		"filePath": "042864480476fb9ab73f33d5e5568620.mp3",
		"duration": "1:45"
	},
	{
		"name": "The Christmas Song (Merry Christmas To You)",
		"artist": "Nat King Cole",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Nat King Cole - The Christmas Song (Merry Christmas To You).mp3",
		"filePath": "2e6e84ecc70bef1321a39e31f8ad1da9.mp3",
		"duration": "3:12"
	},
	{
		"name": "God Rest Ye Merry, Gentlemen",
		"artist": "Nat King Cole",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Nat King Cole - God Rest Ye Merry, Gentlemen.mp3",
		"filePath": "2e73cf8048237b81620a7d6735a80e49.mp3",
		"duration": "1:28"
	},
	{
		"name": "O Tannenbaum",
		"artist": "Nat King Cole",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Nat King Cole - O Tannenbaum.mp3",
		"filePath": "ba960e094a908328bd014e9167b62ee1.mp3",
		"duration": "3:03"
	},
	{
		"name": "I Saw Three Ships",
		"artist": "Nat King Cole",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Nat King Cole - I Saw Three Ships.mp3",
		"filePath": "63398b5336ff2a970244da0a9f3e2b0f.mp3",
		"duration": "1:28"
	},
	{
		"name": "The Christmas Waltz",
		"artist": "She & Him",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/She & Him - The Christmas Waltz.mp3",
		"filePath": "8a9a3081713217a1e49b30d1e3970480.mp3",
		"duration": "2:37"
	},
	{
		"name": "Have Yourself a Merry Little Christmas",
		"artist": "She & Him",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/She & Him - Have Yourself a Merry Little Christmas.mp3",
		"filePath": "e87676856da4d2083cdd2531d37c514f.mp3",
		"duration": "3:42"
	},
	{
		"name": "Santa Claus Is Comin' to Town",
		"artist": "Bruce Springsteen",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bruce Springsteen - Santa Claus Is Comin' to Town.mp3",
		"filePath": "582b10c0de51f63070a5bab1627e36a4.mp3",
		"duration": "4:27"
	},
	{
		"name": "Did I Make You Cry On Christmas Day?",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Did I Make You Cry On Christmas Day? (Well, You Deserved It).mp3",
		"filePath": "8185c89f3f2e54d58cc9247d8791f88c.mp3",
		"duration": "3:21"
	},
	{
		"name": "Sister Winter",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Sister Winter.mp3",
		"filePath": "a68aba61796370860ad5306e1e436f0c.mp3",
		"duration": "5:04"
	},
	{
		"name": "Christmas Time Is Here",
		"artist": "Vince Guaraldi Trio",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Vince Guaraldi Trio - Christmas Time Is Here.mp3",
		"filePath": "89832ada75c57223b37d299adf66e3dd.mp3",
		"duration": "2:46"
	},
	{
		"name": "Happy Xmas",
		"artist": "John Lennon",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/John Lennon - Happy Xmas.mp3",
		"filePath": "4574030b77ee9f0ba670fb62442b26ee.mp3",
		"duration": "3:33"
	},
	{
		"name": "It's the Most Wonderful Time of the Year",
		"artist": "Andy Williams",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Andy Williams - It's the Most Wonderful Time of the Year.mp3",
		"filePath": "5b78ca957710e25e6c53de699082849f.mp3",
		"duration": "2:31"
	},
	{
		"name": "Just Like Christmas",
		"artist": "Low",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Low - Just Like Christmas.mp3",
		"filePath": "308cc5d4d479592ae212b1efac7fdbc8.mp3",
		"duration": "3:08"
	},
	{
		"name": "Christmas Treat",
		"artist": "Julian Casablancas",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Julian Casablancas - Christmas Treat.mp3",
		"filePath": "f71d1980ca89992c58bd58ec30850058.mp3",
		"duration": "3:11"
	},
	{
		"name": "Christmas Is Coming Soon!",
		"artist": "Blitzen Trapper",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Blitzen Trapper - Christmas Is Coming Soon!.mp3",
		"filePath": "272bcaa82ba05b4621ce745affc34130.mp3",
		"duration": "3:03"
	},
	{
		"name": "Everything Is One Big Christmas Tree",
		"artist": "The Magnetic Fields",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Magnetic Fields - Everything Is One Big Christmas Tree.mp3",
		"filePath": "ea90dffaa5b8365f0c8a31f25fab52f0.mp3",
		"duration": "2:24"
	},
	{
		"name": "All I Want For Christmas",
		"artist": "Yeah Yeah Yeahs",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Yeah Yeah Yeahs - All I Want For Christmas.mp3",
		"filePath": "2e8dbfa9baa000747a14925495b827df.mp3",
		"duration": "3:23"
	},
	{
		"name": "All I Wonderful Christmas Is You",
		"artist": "Summer Camp",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Summer Camp - All I Wonderful Christmas Is You.mp3",
		"filePath": "88408c4acafe6843eb8b7734c144ec04.mp3",
		"duration": "2:51"
	},
	{
		"name": "Christmas Party",
		"artist": "The Walkmen",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Walkmen - Christmas Party.mp3",
		"filePath": "6a4f747b58bde8fbae8f6d0032cf9fc0.mp3",
		"duration": "3:19"
	},
	{
		"name": "Christmas Will Be Just Another Lonely Day",
		"artist": "Wye Oak",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Wye Oak - Christmas Will Be Just Another Lonely Day.mp3",
		"filePath": "e8bf769c2b9e9a40acb6836e0f6636af.mp3",
		"duration": "3:22"
	},
	{
		"name": "A Holly Jolly Christmas",
		"artist": "Burl Ives",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Burl Ives - A Holly Jolly Christmas.mp3",
		"filePath": "613f0f13c1206df6f2ebc840a1cf35af.mp3",
		"duration": "2:13"
	},
	{
		"name": "The First Noel",
		"artist": "Frank Sinatra",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Frank Sinatra - The First Noel.mp3",
		"filePath": "2a9db7af93b03bebe51e3a557e19dd3b.mp3",
		"duration": "2:41"
	},
	{
		"name": "Sleigh Ride",
		"artist": "Andy Williams",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Andy Williams - Sleigh Ride.mp3",
		"filePath": "f751cd0608ca956375163add8082d149.mp3",
		"duration": "2:08"
	},
	{
		"name": "Nat's Christmas Wishes",
		"artist": "Nat King Cole",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Nat King Cole - Nat's Christmas Wishes.mp3",
		"filePath": "89c3804b76dd452ddbeffab250de1103.mp3",
		"duration": "0:16"
	},
	{
		"name": "White Winter Hymnal",
		"artist": "Fleet Foxes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Fleet Foxes - White Winter Hymnal.mp3",
		"filePath": "507c3af84d741894d4b8950bc24a0a44.mp3",
		"duration": "2:27"
	},
	{
		"name": "Here Comes Santa Claus",
		"artist": "Gene Autry",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Gene Autry - Here Comes Santa Claus (Right Down Santa Claus Lane).mp3",
		"filePath": "ffb86af403e9a2d8a594cb23ca456f72.mp3",
		"duration": "2:30"
	},
	{
		"name": "Coventry Carol",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Coventry Carol.mp3",
		"filePath": "83039f1c333baba348dbe407e888f390.mp3",
		"duration": "2:53"
	},
	{
		"name": "Do You Hear What I Hear?",
		"artist": "Bob Dylan",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bob Dylan - Do You Hear What I Hear?.mp3",
		"filePath": "ce166c75f22abe5ab8e2c929ffcf8c1d.mp3",
		"duration": "3:02"
	},
	{
		"name": "Lumberjack Christmas",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Lumberjack Christmas - No One Can Save You From Christmases Past.mp3",
		"filePath": "dfb95ffcc881945efc15522761c2a92f.mp3",
		"duration": "3:22"
	},
	{
		"name": "It's Beginning To Look Like Christmas",
		"artist": "Fruit Bats",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Fruit Bats - It's Beginning To Look Like Christmas.mp3",
		"filePath": "bae5f5e3b486559d8169b304b85a0b24.mp3",
		"duration": "3:00"
	},
	{
		"name": "The Little Drummer Boy",
		"artist": "Johnny Cash",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Johnny Cash - The Little Drummer Boy.mp3",
		"filePath": "805c355263f948360669a407dd935eee.mp3",
		"duration": "2:33"
	},
	{
		"name": "Christmas as I Knew It",
		"artist": "Johnny Cash",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Johnny Cash - Christmas as I Knew It.mp3",
		"filePath": "acb20dc151806260b0d2a0baf7fdcba9.mp3",
		"duration": "2:48"
	},
	{
		"name": "Star Of Wonder",
		"artist": "The Roches",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Roches - Star Of Wonder.mp3",
		"filePath": "427f9989d2acfd64506f162069edb626.mp3",
		"duration": "1:50"
	},
	{
		"name": "Rudolph The Red Nosed Reindeer",
		"artist": "Burl Ives",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Burl Ives - Rudolph The Red Nosed Reindeer.mp3",
		"filePath": "d0bea671f5c89992a41a9a5a18a75406.mp3",
		"duration": "2:10"
	},
	{
		"name": "Whatever Happened To Christmas",
		"artist": "Frank Sinatra",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Frank Sinatra - Whatever Happened To Christmas.mp3",
		"filePath": "fd953e0fdec2989db7b87f36c0e29e63.mp3",
		"duration": "3:05"
	},
	{
		"name": "The Night Before Christmas",
		"artist": "Bright Eyes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bright Eyes - The Night Before Christmas.mp3",
		"filePath": "4c5723d8d358c86da70b91bea7863a98.mp3",
		"duration": "4:07"
	},
	{
		"name": "Bruised Orange (Chain of Sorrow)",
		"artist": "Justin Vernon",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Justin Vernon - Bruised Orange (Chain of Sorrow).mp3",
		"filePath": "96ac365a5cdd32b2237eed873ff88b2f.mp3",
		"duration": "4:01"
	},
	{
		"name": "She Screams Christmas",
		"artist": "Frightened Rabbit",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Frightened Rabbit - She Screams Christmas.mp3",
		"filePath": "ef02322d3a265bd79155a5474bc3870c.mp3",
		"duration": "3:26"
	},
	{
		"name": "Hark! The Herald Angels Sing",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Hark! The Herald Angels Sing.mp3",
		"filePath": "906bdbd95afbaa9aa1aba1c78c0c1ba3.mp3",
		"duration": "1:50"
	},
	{
		"name": "Have Yourself A Merry Little Christmas",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Have Yourself A Merry Little Christmas.mp3",
		"filePath": "e905ea884863b6c11d1567dea5ccbc96.mp3",
		"duration": "3:41"
	},
	{
		"name": "Christmas Unicorn",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - Christmas Unicorn.mp3",
		"filePath": "33f57bf9d2d4390d9cdf5c9df3c1dac4.mp3",
		"duration": "12:28"
	},
	{
		"name": "Silver Bells",
		"artist": "Bright Eyes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bright Eyes - Silver Bells.mp3",
		"filePath": "c428c98d96e4c2709d3ac9971650fe53.mp3",
		"duration": "3:55"
	},
	{
		"name": "Little Saint Nick",
		"artist": "The Beach Boys",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Beach Boys - Little Saint Nick.mp3",
		"filePath": "fe0b1bf911f978e948e901c0f77b7f75.mp3",
		"duration": "1:58"
	},
	{
		"name": "By the Fireside",
		"artist": "Ellen And The Escapades",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Ellen And The Escapades - By the Fireside.mp3",
		"filePath": "3f0f884f563d8063b6838c9ec5892ada.mp3",
		"duration": "2:59"
	},
	{
		"name": "Christmas Scat",
		"artist": "Kermit and Tiny Tim",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Kermit and Tiny Tim - Christmas Scat.mp3",
		"filePath": "899f8d9fb18b7d5e002ccf45a0020d7d.mp3",
		"duration": "0:23"
	},
	{
		"name": "We Four King (Little Drummer Boy)",
		"artist": "The Blue Hawaiians",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Blue Hawaiians - We Four King (Little Drummer Boy).mp3",
		"filePath": "a4e6835d1b3cb730c59ce5a92767220f.mp3",
		"duration": "2:49"
	},
	{
		"name": "Hark, The Herald Angels Sing",
		"artist": "John Fahey",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/John Fahey - Medley: Hark, The Herald Angels Sing - O Come All Ye Faithful (Instrumental).mp3",
		"filePath": "739af3f450a9b64244872caf5ed5d30c.mp3",
		"duration": "3:10"
	},
	{
		"name": "The First Noel",
		"artist": "John Fahey",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/John Fahey - The First Noel (Instrumental).mp3",
		"filePath": "202166f24064290a6c13fad432c36bb0.mp3",
		"duration": "2:11"
	},
	{
		"name": "Carol of the Bells",
		"artist": "John Fahey",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/John Fahey - Carol of the Bells (Instrumental).mp3",
		"filePath": "a17157659dc6f6badb860577808b78fe.mp3",
		"duration": "2:37"
	},
	{
		"name": "White Christmas",
		"artist": "Ella Fitzgerald",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Ella Fitzgerald - White Christmas.mp3",
		"filePath": "79a24ff8a52caea54f0f02bcc2634d16.mp3",
		"duration": "3:44"
	},
	{
		"name": "Let It Snow! Let It Snow! Let It Snow!",
		"artist": "Dean Martin",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Dean Martin - Let It Snow! Let It Snow! Let It Snow!.mp3",
		"filePath": "0c66425f5cabbe76985f36df151cb9b2.mp3",
		"duration": "1:57"
	},
	{
		"name": "My Favorite Things",
		"artist": "The Supremes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Supremes - My Favorite Things.mp3",
		"filePath": "68b315aea16c315a48e02f426a3b8d86.mp3",
		"duration": "2:48"
	},
	{
		"name": "Christmas (Baby Please Come Home)",
		"artist": "Darlene Love",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Darlene Love - Christmas (Baby Please Come Home).mp3",
		"filePath": "794f346c8e644cc5cb78c0461cb8be02.mp3",
		"duration": "2:46"
	},
	{
		"name": "Blue Christmas",
		"artist": "The Ventures",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Ventures - Blue Christmas.mp3",
		"filePath": "0892066a038c7129010eb44e608cd9b1.mp3",
		"duration": "2:24"
	},
	{
		"name": "Presents For Christmas",
		"artist": "Solomon Burke",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Solomon Burke - Presents For Christmas.mp3",
		"filePath": "4e750265cb208adc96f51aa10bdd2850.mp3",
		"duration": "3:10"
	},
	{
		"name": "Cheap Gold",
		"artist": "Frightened Rabbit",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Frightened Rabbit - Cheap Gold.mp3",
		"filePath": "d12f427d48c6a73efb879b6c1e22f543.mp3",
		"duration": "2:40"
	},
	{
		"name": "When the Bells Start Ringing",
		"artist": "My Morning Jacket",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/My Morning Jacket - When the Bells Start Ringing (Feat. The Head and the Heart).mp3",
		"filePath": "ac212550dc943e5d5228758e88cc0e5d.mp3",
		"duration": "3:39"
	},
	{
		"name": "Got Something For You",
		"artist": "Best Coast & Wavves",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Best Coast & Wavves - Got Something For You.mp3",
		"filePath": "912d2d4d4b83230a4914b8e17e8225e7.mp3",
		"duration": "1:58"
	},
	{
		"name": "Run Away Me",
		"artist": "Jens Lekman",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Jens Lekman - Run Away Me.mp3",
		"filePath": "a619f4b31de24b4fa955112d5daeabed.mp3",
		"duration": "2:58"
	},
	{
		"name": "On Christmas",
		"artist": "Dum Dum Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Dum Dum Girls - On Christmas.mp3",
		"filePath": "75b6ef7e343cbe20a2d9f6f532d69505.mp3",
		"duration": "3:06"
	},
	{
		"name": "Christmastime in the Mountains",
		"artist": "Palace Songs",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Palace Songs - Christmastime in the Mountains.mp3",
		"filePath": "266df6dc465b695e31ab1a4d53309489.mp3",
		"duration": "1:40"
	},
	{
		"name": "A Christmas Memory",
		"artist": "Parenthetical Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Parenthetical Girls - A Christmas Memory.mp3",
		"filePath": "09fe3ef8f79584409cbf638cb6d6516c.mp3",
		"duration": "3:20"
	},
	{
		"name": "Here's To Nostalgia",
		"artist": "Parenthetical Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Parenthetical Girls - Here's To Nostalgia.mp3",
		"filePath": "dea231064adfd1af7851dbc881316208.mp3",
		"duration": "2:54"
	},
	{
		"name": "Wait Another Year",
		"artist": "Parenthetical Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Parenthetical Girls - Wait Another Year.mp3",
		"filePath": "07235baf4ab85a726981a3472dc3bd4d.mp3",
		"duration": "4:51"
	},
	{
		"name": "Carol Of The Season",
		"artist": "Parenthetical Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Parenthetical Girls - Carol Of The Season.mp3",
		"filePath": "7dd62540a56f3cc520cb89bfdac1aa68.mp3",
		"duration": "1:53"
	},
	{
		"name": "Festive Friends (Forever)",
		"artist": "Parenthetical Girls",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Parenthetical Girls - Festive Friends (Forever).mp3",
		"filePath": "f46005e35c95c9d4c8d6e6c906b3b9f3.mp3",
		"duration": "4:07"
	},
	{
		"name": "snowyish",
		"artist": "Haley Bonar",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Haley Bonar - snowyish.mp3",
		"filePath": "f41109d9b3089b8d80cde569554df2a3.mp3",
		"duration": "3:35"
	},
	{
		"name": "like ice and cold",
		"artist": "Haley Bonar",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Haley Bonar - like ice and cold.mp3",
		"filePath": "19d5690199ce0af8a99c1a9ee35a2c97.mp3",
		"duration": "3:24"
	},
	{
		"name": "this year is new",
		"artist": "Haley Bonar",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Haley Bonar - this year is new.mp3",
		"filePath": "ce923a46c1e2509d29c53ffa8f63cdfc.mp3",
		"duration": "2:26"
	},
	{
		"name": "Santa Baby",
		"artist": "ARMS",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/ARMS - Santa Baby.mp3",
		"filePath": "fbd9dd8596b1d8b5b32ff616d042ee78.mp3",
		"duration": "3:35"
	},
	{
		"name": "Blue Christmas",
		"artist": "Swear and Shake",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Swear and Shake - Blue Christmas.mp3",
		"filePath": "5611f403bb6095ed8193aa9b4dcb8b80.mp3",
		"duration": "2:20"
	},
	{
		"name": "I Heard The Bells on Christmas Day",
		"artist": "Glass Teeth",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Glass Teeth - I Heard The Bells on Christmas Day.mp3",
		"filePath": "da7074eb1e1b48c64baba79ff5bb2a59.mp3",
		"duration": "3:03"
	},
	{
		"name": "Little Drummer Boy",
		"artist": "Skip Roxy",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Skip Roxy - Little Drummer Boy.mp3",
		"filePath": "def26126ac2340df696833df50e3198d.mp3",
		"duration": "3:36"
	},
	{
		"name": "This Will Be Our Year",
		"artist": "Oh Captain My Captain",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Oh Captain My Captain - This Will Be Our Year.mp3",
		"filePath": "a09513205eb3060fed8fb154401ce862.mp3",
		"duration": "2:22"
	},
	{
		"name": "Christmas Brats",
		"artist": "AAN",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/AAN - Christmas Brats.mp3",
		"filePath": "82fea0eb36404a5ca768935ca3d967db.mp3",
		"duration": "3:40"
	},
	{
		"name": "All I Want for Christmas Is You",
		"artist": "Mariah Carey",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Mariah Carey - All I Want for Christmas Is You.mp3",
		"filePath": "d5f5d383db2f07e96f4596e7ba33b34a.mp3",
		"duration": "4:01"
	},
	{
		"name": "Holiday Road",
		"artist": "The Walkmen",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Walkmen - Holiday Road.mp3",
		"filePath": "41e7079c5f1b5375ea04f6f82176bdee.mp3",
		"duration": "1:58"
	},
	{
		"name": "A Christmas Duel",
		"artist": "The Hives & Cyndi Lauper",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Hives & Cyndi Lauper - A Christmas Duel.mp3",
		"filePath": "f1900abd86c2d55fad6d7090aa769da4.mp3",
		"duration": "4:48"
	},
	{
		"name": "Babe of Bethlehem",
		"artist": "The Seeger Sisters",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Seeger Sisters - Babe of Bethlehem.mp3",
		"filePath": "11417b7b223f094f1f27099828726414.mp3",
		"duration": "1:25"
	},
	{
		"name": "Drive the Cold Winter Away",
		"artist": "Horslips",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Horslips - Drive the Cold Winter Away.mp3",
		"filePath": "54a4d38d46cac8b59b639f217fce0c37.mp3",
		"duration": "2:32"
	},
	{
		"name": "Christmas Time Again",
		"artist": "Reuben Anderson",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Reuben Anderson - Christmas Time Again.mp3",
		"filePath": "f1c98001ba06e5357ce1268e92b76911.mp3",
		"duration": "2:51"
	},
	{
		"name": "2000 Miles",
		"artist": "Pretenders",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Pretenders - 2000 Miles.mp3",
		"filePath": "ac602927667d272676b2db4a5f97d83e.mp3",
		"duration": "3:40"
	},
	{
		"name": "The Christmas Song",
		"artist": "The Raveonettes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Raveonettes - The Christmas Song.mp3",
		"filePath": "552aefd8a313348ecaa51f00f9603d80.mp3",
		"duration": "2:12"
	},
	{
		"name": "Merry Christmas Mr. Lawrence",
		"artist": "Ryuichi Sakamoto",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Ryuichi Sakamoto - Merry Christmas Mr. Lawrence.mp3",
		"filePath": "ca705af35d06ae06300881a749c9a412.mp3",
		"duration": "4:46"
	},
	{
		"name": "God Rest Ye Merry Gentlemen",
		"artist": "Jimmy Smith",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Jimmy Smith - God Rest Ye Merry Gentlemen.mp3",
		"filePath": "1fb9d841981cdf94012330af4fbe362a.mp3",
		"duration": "4:19"
	},
	{
		"name": "Ziemsvetki Jaunaja Pasaule Bisu stropa dziesma",
		"artist": "New York Latvian Concert Choir",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/New York Latvian Concert Choir - Ziemsvetki Jaunaja Pasaule Bisu stropa dziesma.mp3",
		"filePath": "023503954d09d9dfe084239709cd90c2.mp3",
		"duration": "2:39"
	},
	{
		"name": "Holiday Mood",
		"artist": "Apples In Stereo",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Apples In Stereo - Holiday Mood.mp3",
		"filePath": "cde5fab91646f8524f71b6c8682a1b96.mp3",
		"duration": "2:25"
	},
	{
		"name": "The Best Darn Present In The Whole Wide World",
		"artist": "Jon Aley",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Jon Aley - The Best Darn Present In The Whole Wide World.mp3",
		"filePath": "4e7fde5ea065909a6387eaac24c7bb2b.mp3",
		"duration": "1:25"
	},
	{
		"name": "R2D2, We Wish You A Merry Christmas",
		"artist": "Brian Dewan",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Brian Dewan - R2D2, We Wish You A Merry Christmas.mp3",
		"filePath": "00e1c9f96487424e354da605b7a20679.mp3",
		"duration": "3:08"
	},
	{
		"name": "Jingle Bells",
		"artist": "The Mill Valley Taters",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Mill Valley Taters - Jingle Bells.mp3",
		"filePath": "bb03168dea2e1b51090cdaa3b02775b5.mp3",
		"duration": "1:16"
	},
	{
		"name": "Do They Know It's Christmas?",
		"artist": "The Tarquin Records All Stars",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Tarquin Records All Stars - Do They Know It's Christmas?.mp3",
		"filePath": "940cf3d06b8cc8a91499bc5f5304889a.mp3",
		"duration": "3:40"
	},
	{
		"name": "We Wish You A Merry Christmas",
		"artist": "John Denver & The Muppets",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/John Denver & The Muppets - We Wish You A Merry Christmas.mp3",
		"filePath": "3d8cf730db0b5932e73ff2ad450c6006.mp3",
		"duration": "1:05"
	},
	{
		"name": "O Chronic Tree",
		"artist": "Afroman",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Afroman - O Chronic Tree.mp3",
		"filePath": "3aa8a4af5725b53b57f88c4ba9d01627.mp3",
		"duration": "1:27"
	},
	{
		"name": "Jingle Bells",
		"artist": "The Maddox Brothers and Rose",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Maddox Brothers and Rose - Jingle Bells.mp3",
		"filePath": "aced2da992fff0580eb51ae7e5966efe.mp3",
		"duration": "2:25"
	},
	{
		"name": "Happy New Year",
		"artist": "Lightnin' Hopkins",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Lightnin' Hopkins - Happy New Year.mp3",
		"filePath": "6841fce552b26057d7fac62c0a64d7aa.mp3",
		"duration": "3:42"
	},
	{
		"name": "Sugar Rum Cherry (Dance of the Sugar-Plum Fairy)",
		"artist": "Duke Ellington",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Duke Ellington - Sugar Rum Cherry (Dance of the Sugar-Plum Fairy).mp3",
		"filePath": "06ed74305dcba0889261675a3125645b.mp3",
		"duration": "3:05"
	},
	{
		"name": "Christmas Island",
		"artist": "Leon Redbone",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Leon Redbone - Christmas Island.mp3",
		"filePath": "9d2619f19e932851f0275922122709b0.mp3",
		"duration": "3:35"
	},
	{
		"name": "Funky Funky Christmas",
		"artist": "Electric Jungle",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Electric Jungle - Funky Funky Christmas.mp3",
		"filePath": "a4465f4d499b3168a1791eac890d2fe7.mp3",
		"duration": "3:05"
	},
	{
		"name": "Merry Christmas, Baby",
		"artist": "Otis Redding",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Otis Redding - Merry Christmas, Baby.mp3",
		"filePath": "e7aef9af254cfd77ec6f0d5b518b0f0a.mp3",
		"duration": "2:35"
	},
	{
		"name": "Santa's Beard",
		"artist": "They Might Be Giants",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/They Might Be Giants - Santa's Beard.mp3",
		"filePath": "4b2855aa29173ac2773b90606ff90087.mp3",
		"duration": "1:55"
	},
	{
		"name": "Christmas Time",
		"artist": "The dB's",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The dB's - Christmas Time.mp3",
		"filePath": "ce17dc780e40976600a7614c780c6e43.mp3",
		"duration": "3:46"
	},
	{
		"name": "Christmas Won't Be the Same This Year",
		"artist": "The Jackson 5",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Jackson 5 - Christmas Won't Be the Same This Year.mp3",
		"filePath": "88880571283147474242189c4f1ffc86.mp3",
		"duration": "2:30"
	},
	{
		"name": "O Holy Child",
		"artist": "Dusty Springfield",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Dusty Springfield - O Holy Child.mp3",
		"filePath": "cbbc76201f72903fec4ecf36ddd1ab5e.mp3",
		"duration": "2:25"
	},
	{
		"name": "Santa Claus",
		"artist": "They Might Be Giants",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/They Might Be Giants - Santa Claus.mp3",
		"filePath": "5c9730ef1fbd24258e680dce721862f3.mp3",
		"duration": "2:55"
	},
	{
		"name": "Careless Santa",
		"artist": "They Might Be Giants",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/They Might Be Giants - Careless Santa.mp3",
		"filePath": "ddfdb4e9caa255804ce16f5e3ae49e5d.mp3",
		"duration": "2:16"
	},
	{
		"name": "Hard Candy Christmas",
		"artist": "Dolly Parton",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Dolly Parton - Hard Candy Christmas.mp3",
		"filePath": "0f21d766688515d3ba6254ec4bb55ae0.mp3",
		"duration": "3:37"
	},
	{
		"name": "White Christmas",
		"artist": "The Drifters",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Drifters - White Christmas.mp3",
		"filePath": "7103bd4f5709700f8585651291eca008.mp3",
		"duration": "2:41"
	},
	{
		"name": "Blue Xmas (To Whom It May Concern)",
		"artist": "Miles Davis",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Miles Davis - Blue Xmas (To Whom It May Concern).mp3",
		"filePath": "503f793bf04811d579b0f1951ccab8fb.mp3",
		"duration": "2:39"
	},
	{
		"name": "Joy to the World",
		"artist": "Douglas Leedy",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Douglas Leedy - Joy to the World.mp3",
		"filePath": "64adb59848e924870c42dd0d53583c81.mp3",
		"duration": "1:46"
	},
	{
		"name": "River",
		"artist": "Joni Mitchell",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Joni Mitchell - River.mp3",
		"filePath": "c70e42e0a7b2199c09f237c82442aaa7.mp3",
		"duration": "4:05"
	},
	{
		"name": "Computers - Part 2",
		"artist": "Eban Schletter",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Eban Schletter - Computers - Part 2.mp3",
		"filePath": "af28c1f6be9b3a51400ebd2870e65cdf.mp3",
		"duration": "2:05"
	},
	{
		"name": "Teenage Christmas",
		"artist": "Eux Autres",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Eux Autres - Teenage Christmas.mp3",
		"filePath": "8fb39eaaf07552e9f6f3427c5388b6f0.mp3",
		"duration": "2:32"
	},
	{
		"name": "Linus and Lucy",
		"artist": "Bela Fleck & The Flecktones",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bela Fleck & The Flecktones - Linus and Lucy.mp3",
		"filePath": "dabaa2a9934d814792f8658f7f7e143d.mp3",
		"duration": "2:54"
	},
	{
		"name": "Sleigh Ride",
		"artist": "Boston Pops Orchestra",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Boston Pops Orchestra - Sleigh Ride.mp3",
		"filePath": "b9d747854ecf6150331cb8e24f3c6f07.mp3",
		"duration": "3:02"
	},
	{
		"name": "It's Different Now",
		"artist": "Ice Choir",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Ice Choir - It's Different Now.mp3",
		"filePath": "ba0ad5b407b6343c2b3d7f01a17fa308.mp3",
		"duration": "4:31"
	},
	{
		"name": "Christmas in Hollis",
		"artist": "Run DMC",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Run DMC - Christmas in Hollis.mp3",
		"filePath": "0659aaa1350d772781ff3beacbc5f8d3.mp3",
		"duration": "2:58"
	},
	{
		"name": "Santa Claus Is Back In Town",
		"artist": "Elvis Presley",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Elvis Presley - Santa Claus Is Back In Town.mp3",
		"filePath": "6818ef6914c766d33f55edb88ceb0358.mp3",
		"duration": "2:22"
	},
	{
		"name": "Blue Christmas",
		"artist": "Elvis Presley",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Elvis Presley - Blue Christmas.mp3",
		"filePath": "87b76ee10e367e6783295b25afd4656c.mp3",
		"duration": "2:09"
	},
	{
		"name": "Little Drummer Boy/Peace On Earth",
		"artist": "Bing Crosby & David Bowie",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Bing Crosby & David Bowie - Little Drummer Boy - Peace On Earth.mp3",
		"filePath": "047c73348962b8f7fbca560587284f6a.mp3",
		"duration": "2:36"
	},
	{
		"name": "Christmas was Better in the 80s",
		"artist": "The Futureheads",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Futureheads - Christmas was Better in the 80s.mp3",
		"filePath": "3ce79f1a7e2cd730cb2473afd081d3d0.mp3",
		"duration": "3:09"
	},
	{
		"name": "Please Come Home For Christmas",
		"artist": "Landlady ft. Amelia Meath",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Landlady ft. Amelia Meath - Please Come Home For Christmas.mp3",
		"filePath": "93a64188c56ef714a96498de45ee2b6a.mp3",
		"duration": "2:12"
	},
	{
		"name": "Rum-Rum-Bells!!!",
		"artist": "Los Temblooores",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Los Temblooores - Rum-Rum-Bells!!!.mp3",
		"filePath": "bf302478b46f541a48618a2d147dbf55.mp3",
		"duration": "1:50"
	},
	{
		"name": "We Need A Little Christmas",
		"artist": "Sufjan Stevens",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Sufjan Stevens - We Need A Little Christmas.mp3",
		"filePath": "9a6658daab1380cbba49fa068d215394.mp3",
		"duration": "2:02"
	},
	{
		"name": "Christmas Wrapping",
		"artist": "The Waitresses",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Waitresses - Christmas Wrapping.mp3",
		"filePath": "4c9d8abd4680fd2d836ba81abbb55416.mp3",
		"duration": "4:34"
	},
	{
		"name": "Intro Winter",
		"artist": "Carol Batton",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Carol Batton - Intro Winter.mp3",
		"filePath": "428ed7de8491bcab1a50c7c30b10e1a3.mp3",
		"duration": "2:16"
	},
	{
		"name": "Star of Wonder",
		"artist": "The Roches",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/The Roches - Star of Wonder.mp3",
		"filePath": "c47043783aefedce468375f70e685647.mp3",
		"duration": "1:42"
	},
	{
		"name": "Christmas Song II (grinch)",
		"artist": "Grimes",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Grimes - Christmas Song II (grinch).mp3",
		"filePath": "b8c3f089f53d949ede146ead56ad4748.mp3",
		"duration": "2:39"
	},
	{
		"name": "The Christmas Song",
		"artist": "Chris Mastheim",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Chris Mastheim - The Christmas Song.mp3",
		"filePath": "fe6f4c400c7af758ecb128b42f258168.mp3",
		"duration": "3:27"
	},
	{
		"name": "christmas don't be late",
		"artist": "chumpunks",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/chumpunks - christmas don't be late.mp3",
		"filePath": "e99cd959ddaf2d7573b90988b710cc03.mp3",
		"duration": "3:06"
	},
	{
		"name": "'Zat You, Santa Claus?",
		"artist": "Louis Armstrong",
		"localPath": "/Users/zacherdmann/Dropbox/xmas_export/Louis Armstrong - 'Zat You, Santa Claus?.mp3",
		"filePath": "5548e826840b272fecf67ad3a08eb4ef.mp3",
		"duration": "2:39"
	}
];

var orderedList;
var displayList;
var currentTrack;
var trackIndex;
var trackMax;
var seed;

function init(){
	let idx = localStorage.getItem('naughtylist');
	seed = localStorage.getItem('pinecone');
	console.log('INIT: seed from storage: ', seed, ', index: ',idx)
	if(typeof seed === 'undefined') {
		seed = newSeed();
		localStorage.setItem('pinecone', seed);
	}
	trackIndex = idx ? parseInt(idx) : 0;
	orderedList = orderedList || shuffle.shuffle(playlist, seed);
	displayList = Array.from(orderedList);
	trackMax = orderedList.length;
	moveTo(trackIndex);
}

function newSeed(){
	return Date.now() + (Math.random() * 10000)
}

function moveTo(idx) {
	let first = orderedList.slice(0,idx);
	let second = orderedList.slice(idx);
	displayList = _.concat(second,first);
}

function advance(idx) {
		idx++;
		if(idx === trackMax)
			idx = 0;
		return idx
	}

module.exports = {
	skipTo(track){
		let i = _.findIndex(orderedList, {filePath: track.filePath})
		moveTo(i);
		console.log('skip to:', track, i)
		trackIndex = i;
	},
	get(){
	if(!orderedList)
		init()
	return displayList;
	},
	save(){
		localStorage.setItem('pinecone',seed);
		localStorage.setItem('naughtylist',trackIndex);
	},
	getTrack() {
		let t = orderedList[trackIndex];
		console.log('fetched track from :', {trackIndex, t})
		return t;
	},
	queueTrack() {
		let t = advance(trackIndex);
		console.log(t, trackIndex);
		return orderedList[t];
	},
	advance() {
		trackIndex = advance(trackIndex)
		moveTo(trackIndex);
	}
	
}