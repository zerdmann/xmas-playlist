import _ from 'lodash';

var list;
var current;

var quotes = [
	{
		text:"Our hearts grow tender with childhood memories and love of kindred, and we are better throughout the year for having, in spirit, become a child again at Christmas-time.",
		by:"Laura Ingalls Wilder"
	},
	{
		text:"Christmas time! That man must be a misanthrope indeed, in whose breast something like a jovial feeling is not roused - in whose mind some pleasant associations are not awakened - by the recurrence of Christmas.",
		by:"Charles Dickens"
	},
	{
		text:"Scented acres of holiday trees, prickly-leafed holly. Red berries shiny as Chinese bells: black crows swoop upon them screaming. Having stuffed our burlap sacks with enough greenery and crimson to garland a dozen windows, we set about choosing a tree. “It should be,” muses my friend, “twice as tall as a boy. So a boy can’t steal the star.” The one we pick is twice as tall as me. A brave handsome brute that survives thirty hatchet strokes before it keels with a creaking rending cry.",
		by:"Truman Capote"
	},
	{
		text:"Look, Charlie, let’s face it. We all know that Christmas is a big commercial racket. It’s run by a big Eastern syndicate, you know.",
		by:"Lucy Van Pelt"
	},
	{
		text:"It's Christmas Eve. It's the one night of the year when we all act a little nicer, we smile a little easier, we cheer a little more. For a couple of hours out of the whole year we are the people that we always hoped we would be.",
		by:"Bill Murray"
	},
	{
		text:"Happy, happy Christmas, that can win us back to the delusions of our childish days; that can recall to the old man the pleasures of his youth; that can transport the sailor and the traveller, thousands of miles away, back to his own fire-side and his quiet home!",
		by:"Charles Dickens"
	},
	{
		text:"Christmas it seems to me is a necessary festival; we require a season when we can regret all the flaws in our human relationships: it is the feast of failure, sad but consoling.",
		by:"Graham Greene"
	},
	{
		text:"I felt overstuffed and dull and disappointed, the way I always do the day after Christmas, as if whatever it was the pine boughs and the candles and the silver and gilt-ribboned presents and the birch-log fires and the Christmas turkey and the carols at the piano promised never came to pass.",
		by:"Sylvia Plath"
	},
	{
		text:"And the Grinch, with his Grinch-feet ice cold in the snow, stood puzzling and puzzling, how could it be so? It came without ribbons. It came without tags. It came without packages, boxes or bags. And he puzzled and puzzled 'till his puzzler was sore. Then the Grinch thought of something he hadn't before. What if Christmas, he thought, doesn't come from a store. What if Christmas, perhaps, means a little bit more.",
		by:"Dr. Seuss"
	},
	{
		text:"There must be something ghostly in the air of Christmas — something about the close, muggy atmosphere that draws up the ghosts, like the dampness of the summer rains brings out the frogs and snails.",
		by:"Jerome K. Jerome"
	},
	{
		text:"Of course there is a Santa Claus. It’s just that no single somebody could do all he has to do. So the Lord has spread the task among us all. That’s why everybody is Santa Claus. I am. You are.",
		by:"Truman Capote"
	},
	{
		text:"Call a truce, then, to our labors—let us feast with friends and neighbors, and be merry as the custom of our caste; for if faint and forced the laughter, and if sadness follow after, we are richer by one mocking Christmas past.",
		by:"Rudyard Kipling"
	},
	{
		text:"Darkness is cheap, and Scrooge liked it.",
		by:"Charles Dickens"
	},
	{
		text:"One can never have enough socks. Another Christmas has come and gone and I didn’t get a single pair. People will insist on giving me books.",
		by:"JK Rowling"
	},
	{
		text:"Midnight, and the clock strikes. It is Christmas Day, the werewolves birthday, the door of the solstice still wide enough open to let them all slink through.",
		by:"Angela Carter"
	},
	{
		text:"And there was the most delicious odor of roast goose in the streets, for it was New Year’s Eve. She could not forget that.",
		by:"Hans Christian Anderson"
	},
	{
		text:"And here I have lamely related to you the uneventful chronicle of two foolish children in a flat who most unwisely sacrificed for each other the greatest treasures of their house. But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest.",
		by:"O. Henry"
	},
	{
		text:"The buses rumble like green juggernauts through the snow that sifts down in the dusk. White house walls rise through the dusky snow. Snow is never more beautiful than in the city. It is wonderful in Paris to stand on a bridge across the Seine looking up through the softly curtaining snow past the grey bulk of the Louvre, up the river spanned by many bridges and bordered by the grey houses of old Paris to where Notre Dame squats in the dusk. It is very beautiful in Paris and very lonely at Christmas time.",
		by:"Ernest Hemmingway"
	},
	{
		text:"Those who went farther than Chicago would gather in the old dim Union Station at six o’clock of a December evening, with a few Chicago friends, already caught up into their own holiday gayeties, to bid them a hasty good-by. I remember the fur coats of the girls returning from Miss This-or-that’s and the chatter of frozen breath and the hands waving overhead as we caught sight of old acquaintances, and the matchings of invitations: “Are you going to the Ordways’? the Herseys’? the Schultzes’?” and the long green tickets clasped tight in our gloved hands. And last the murky yellow cars of the Chicago, Milwaukee and St. Paul railroad looking cheerful as Christmas itself on the tracks beside the gate.",
		by:"F. Scott Fitzgerald"
	},
	{
		text:"Ach, könnte nur dein Herz zu einer Krippe werden, Gott würde noch einmal ein Kind auf dieser Erden.",
		by:"Angelus Silesius"
	},
	{
		text:"At this festive season of the year, Mr Scrooge,\" said the gentleman, taking up a pen, \"it is more than usually desirable that we should make some slight provision for the poor and destitute, who suffer greatly at the present time. … We choose this time, because it is a time, of all others, when Want is keenly felt, and Abundance rejoices.",
		by:"Charles Dickens"
	},
	{
		text:"It was always said of him, that he knew how to keep Christmas well, if any man alive possessed the knowledge. May that be truly said of us, and all of us! And so, as Tiny Tim observed, God Bless Us, Every One!",
		by:"Charles Dickens"
	},
	{
		text:"It was the Yuletide, that men call Christmas, though they know in their hearts it is older than Bethlehem and Babylon, older than Memphis and Mankind.",
		by:"H.P. Lovecraft"
	},
	{
		text:"We hear the beating of wings over Bethlehem and a light that is not of the sun or of the stars shines in the midnight sky. Let the beauty of the story take away all narrowness, all thought of formal creeds. Let it be remembered as a story that has happened again and again, to men of many different races, that has been expressed through many religions, that has been called by many different names. Time and space and language lay no limitations upon human brotherhood.",
		by:"NY Times Editorial Board"
	},
	{
		text:"England was merry England, when Old Christmas brought his sports again. 'Twas Christmas broach'd the mightiest ale; 'Twas Christmas told the merriest tale; A Christmas gambol oft could cheer The poor man's heart through half the year.",
		by: "Walter Scott"
	},
	{
		text:"Welcome, newcomers. The tradition of Festivus begins with the airing of grievances. I got a lot of problems with you people! And now you're gonna hear about it!",
		by:"Frank Costanza"
	}

]

module.exports = {
	get(){
		if(!list)
		{
			list = _.shuffle(quotes);
			current = list.pop()
		}
		let t = current;
		list.unshift(current);
		current = list.pop();
		// console.log(t)
		return t;
	}
}