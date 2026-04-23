// Playground vocabulary: ~170 words with 16-dimensional synthetic embeddings.
// Each word is tagged with semantic features; vectors are assembled from tags
// so that nearest-neighbour and linear-arithmetic behaviour emerge by
// construction. This is pedagogical: it mimics the *kind* of linear
// structure real trained embeddings exhibit, without requiring a 300MB GloVe
// download.

export const PLAYGROUND_DIM = 16;

// Feature axes. Each entry maps (dimension index, strength).
type Feature =
	| 'male'    | 'female'
	| 'young'   | 'old'
	| 'royal'   | 'common'
	| 'human'   | 'animal'
	| 'big'     | 'small'
	| 'positive'| 'negative'
	| 'motion'  | 'static'
	| 'hot'     | 'cold'
	| 'food'    | 'place'
	| 'time'    | 'color'
	| 'emotion' | 'thought'
	| 'body'    | 'nature'
	| 'tool'    | 'family'
	| 'money';

const FEATURE_AXIS: Record<Feature, [number, number]> = {
	male:     [0,  1.0], female:    [0, -1.0],
	young:    [1, -1.0], old:       [1,  1.0],
	royal:    [2,  1.0], common:    [2, -0.2],
	human:    [3,  1.0], animal:    [4,  1.0],
	big:      [5,  1.0], small:     [5, -1.0],
	positive: [6,  1.0], negative:  [6, -1.0],
	motion:   [7,  1.0], static:    [7, -0.3],
	hot:      [8,  1.0], cold:      [8, -1.0],
	food:     [9,  1.0], place:    [10,  1.0],
	time:    [11,  1.0], color:    [12,  1.0],
	emotion: [13,  1.0], thought:  [14,  0.8],
	body:    [15,  1.0], nature:   [10,  0.7],
	tool:     [9, -0.4], family:    [3,  0.6],
	money:    [6,  0.3],
};

interface Entry {
	w: string;
	t: Feature[];
}

const ENTRIES: Entry[] = [
	// people / family
	{ w: 'man',        t: ['male', 'human'] },
	{ w: 'woman',      t: ['female', 'human'] },
	{ w: 'boy',        t: ['male', 'young', 'human'] },
	{ w: 'girl',       t: ['female', 'young', 'human'] },
	{ w: 'father',     t: ['male', 'family', 'old', 'human'] },
	{ w: 'mother',     t: ['female', 'family', 'old', 'human'] },
	{ w: 'son',        t: ['male', 'family', 'young', 'human'] },
	{ w: 'daughter',   t: ['female', 'family', 'young', 'human'] },
	{ w: 'brother',    t: ['male', 'family', 'human'] },
	{ w: 'sister',     t: ['female', 'family', 'human'] },
	{ w: 'uncle',      t: ['male', 'family', 'human'] },
	{ w: 'aunt',       t: ['female', 'family', 'human'] },
	{ w: 'grandfather',t: ['male', 'family', 'old', 'human'] },
	{ w: 'grandmother',t: ['female', 'family', 'old', 'human'] },
	{ w: 'nephew',     t: ['male', 'family', 'young', 'human'] },
	{ w: 'niece',      t: ['female', 'family', 'young', 'human'] },
	{ w: 'husband',    t: ['male', 'family', 'human'] },
	{ w: 'wife',       t: ['female', 'family', 'human'] },
	{ w: 'actor',      t: ['male', 'human'] },
	{ w: 'actress',    t: ['female', 'human'] },
	{ w: 'waiter',     t: ['male', 'human'] },
	{ w: 'waitress',   t: ['female', 'human'] },
	{ w: 'person',     t: ['human'] },
	{ w: 'people',     t: ['human'] },

	// royalty
	{ w: 'king',       t: ['male', 'royal', 'old', 'human'] },
	{ w: 'queen',      t: ['female', 'royal', 'old', 'human'] },
	{ w: 'prince',     t: ['male', 'royal', 'young', 'human'] },
	{ w: 'princess',   t: ['female', 'royal', 'young', 'human'] },
	{ w: 'emperor',    t: ['male', 'royal', 'old', 'human'] },
	{ w: 'empress',    t: ['female', 'royal', 'old', 'human'] },
	{ w: 'duke',       t: ['male', 'royal', 'human'] },
	{ w: 'duchess',    t: ['female', 'royal', 'human'] },
	{ w: 'lord',       t: ['male', 'royal', 'human'] },
	{ w: 'lady',       t: ['female', 'royal', 'human'] },
	{ w: 'crown',      t: ['royal'] },
	{ w: 'throne',     t: ['royal'] },

	// animals
	{ w: 'dog',        t: ['animal'] },
	{ w: 'cat',        t: ['animal'] },
	{ w: 'puppy',      t: ['animal', 'young', 'small'] },
	{ w: 'kitten',     t: ['animal', 'young', 'small'] },
	{ w: 'horse',      t: ['animal', 'big'] },
	{ w: 'cow',        t: ['animal', 'big'] },
	{ w: 'pig',        t: ['animal'] },
	{ w: 'sheep',      t: ['animal'] },
	{ w: 'elephant',   t: ['animal', 'big'] },
	{ w: 'mouse',      t: ['animal', 'small'] },
	{ w: 'rabbit',     t: ['animal', 'small'] },
	{ w: 'lion',       t: ['animal', 'big'] },
	{ w: 'tiger',      t: ['animal', 'big'] },
	{ w: 'wolf',       t: ['animal'] },
	{ w: 'bear',       t: ['animal', 'big'] },
	{ w: 'bird',       t: ['animal', 'motion'] },
	{ w: 'eagle',      t: ['animal', 'motion', 'big'] },
	{ w: 'sparrow',    t: ['animal', 'motion', 'small'] },
	{ w: 'fish',       t: ['animal', 'motion'] },
	{ w: 'shark',      t: ['animal', 'big', 'motion'] },
	{ w: 'dolphin',    t: ['animal', 'motion'] },
	{ w: 'snake',      t: ['animal'] },

	// body parts
	{ w: 'head',       t: ['body'] },
	{ w: 'hand',       t: ['body'] },
	{ w: 'foot',       t: ['body'] },
	{ w: 'arm',        t: ['body'] },
	{ w: 'leg',        t: ['body'] },
	{ w: 'eye',        t: ['body'] },
	{ w: 'heart',      t: ['body', 'emotion'] },
	{ w: 'brain',      t: ['body', 'thought'] },

	// places
	{ w: 'city',       t: ['place', 'big'] },
	{ w: 'town',       t: ['place'] },
	{ w: 'village',    t: ['place', 'small'] },
	{ w: 'country',    t: ['place', 'big'] },
	{ w: 'castle',     t: ['place', 'royal', 'old'] },
	{ w: 'palace',     t: ['place', 'royal'] },
	{ w: 'house',      t: ['place'] },
	{ w: 'home',       t: ['place', 'positive'] },
	{ w: 'school',     t: ['place'] },
	{ w: 'hospital',   t: ['place'] },
	{ w: 'forest',     t: ['place', 'nature'] },
	{ w: 'river',      t: ['place', 'nature'] },
	{ w: 'mountain',   t: ['place', 'nature', 'big'] },
	{ w: 'ocean',      t: ['place', 'nature', 'big'] },
	{ w: 'desert',     t: ['place', 'nature', 'hot'] },
	{ w: 'island',     t: ['place', 'nature'] },
	{ w: 'street',     t: ['place'] },
	{ w: 'road',       t: ['place'] },

	// food
	{ w: 'bread',      t: ['food'] },
	{ w: 'rice',       t: ['food'] },
	{ w: 'pasta',      t: ['food'] },
	{ w: 'apple',      t: ['food'] },
	{ w: 'orange',     t: ['food', 'color'] },
	{ w: 'banana',     t: ['food'] },
	{ w: 'milk',       t: ['food', 'cold'] },
	{ w: 'cheese',     t: ['food'] },
	{ w: 'meat',       t: ['food'] },
	{ w: 'fruit',      t: ['food'] },
	{ w: 'vegetable',  t: ['food'] },
	{ w: 'coffee',     t: ['food', 'hot'] },
	{ w: 'tea',        t: ['food', 'hot'] },
	{ w: 'wine',       t: ['food'] },
	{ w: 'water',      t: ['food', 'nature', 'cold'] },

	// motion verbs
	{ w: 'run',        t: ['motion'] },
	{ w: 'walk',       t: ['motion'] },
	{ w: 'swim',       t: ['motion'] },
	{ w: 'fly',        t: ['motion'] },
	{ w: 'jump',       t: ['motion'] },
	{ w: 'drive',      t: ['motion'] },
	{ w: 'climb',      t: ['motion'] },
	{ w: 'dance',      t: ['motion', 'positive'] },

	// static verbs
	{ w: 'sleep',      t: ['static'] },
	{ w: 'sit',        t: ['static'] },
	{ w: 'rest',       t: ['static'] },
	{ w: 'stand',      t: ['static'] },
	{ w: 'wait',       t: ['static'] },

	// cognition
	{ w: 'think',      t: ['thought'] },
	{ w: 'know',       t: ['thought'] },
	{ w: 'learn',      t: ['thought'] },
	{ w: 'believe',    t: ['thought'] },
	{ w: 'remember',   t: ['thought'] },
	{ w: 'idea',       t: ['thought'] },
	{ w: 'mind',       t: ['thought', 'body'] },
	{ w: 'memory',     t: ['thought'] },

	// emotions
	{ w: 'love',       t: ['emotion', 'positive'] },
	{ w: 'hate',       t: ['emotion', 'negative'] },
	{ w: 'joy',        t: ['emotion', 'positive'] },
	{ w: 'anger',      t: ['emotion', 'negative', 'hot'] },
	{ w: 'fear',       t: ['emotion', 'negative', 'cold'] },
	{ w: 'grief',      t: ['emotion', 'negative'] },
	{ w: 'peace',      t: ['emotion', 'positive', 'static'] },
	{ w: 'hope',       t: ['emotion', 'positive'] },
	{ w: 'pride',      t: ['emotion'] },
	{ w: 'shame',      t: ['emotion', 'negative'] },
	{ w: 'happy',      t: ['emotion', 'positive'] },
	{ w: 'sad',        t: ['emotion', 'negative'] },

	// abstract / money / power
	{ w: 'money',      t: ['money'] },
	{ w: 'wealth',     t: ['money', 'positive'] },
	{ w: 'poverty',    t: ['money', 'negative'] },
	{ w: 'power',      t: ['royal'] },
	{ w: 'freedom',    t: ['positive'] },
	{ w: 'justice',    t: ['positive', 'thought'] },
	{ w: 'war',        t: ['negative', 'motion'] },
	{ w: 'death',      t: ['negative'] },
	{ w: 'life',       t: ['positive'] },

	// time
	{ w: 'day',        t: ['time', 'hot'] },
	{ w: 'night',      t: ['time', 'cold'] },
	{ w: 'morning',    t: ['time'] },
	{ w: 'evening',    t: ['time'] },
	{ w: 'year',       t: ['time'] },
	{ w: 'month',      t: ['time'] },
	{ w: 'week',       t: ['time'] },
	{ w: 'hour',       t: ['time'] },
	{ w: 'minute',     t: ['time', 'small'] },
	{ w: 'past',       t: ['time', 'old'] },
	{ w: 'future',     t: ['time', 'young'] },

	// colors
	{ w: 'red',        t: ['color', 'hot'] },
	{ w: 'blue',       t: ['color', 'cold'] },
	{ w: 'green',      t: ['color', 'nature'] },
	{ w: 'yellow',     t: ['color', 'hot'] },
	{ w: 'black',      t: ['color'] },
	{ w: 'white',      t: ['color'] },

	// nature
	{ w: 'tree',       t: ['nature', 'big'] },
	{ w: 'flower',     t: ['nature', 'small', 'positive'] },
	{ w: 'grass',      t: ['nature'] },
	{ w: 'sun',        t: ['nature', 'hot', 'big'] },
	{ w: 'moon',       t: ['nature', 'cold'] },
	{ w: 'star',       t: ['nature'] },
	{ w: 'rain',       t: ['nature', 'cold'] },
	{ w: 'snow',       t: ['nature', 'cold'] },
	{ w: 'wind',       t: ['nature', 'motion'] },
	{ w: 'fire',       t: ['nature', 'hot'] },

	// tools / objects
	{ w: 'book',       t: ['tool', 'thought'] },
	{ w: 'sword',      t: ['tool'] },
	{ w: 'hammer',     t: ['tool'] },
	{ w: 'key',        t: ['tool'] },
	{ w: 'door',       t: ['tool'] },
	{ w: 'car',        t: ['tool', 'motion', 'big'] },
	{ w: 'bike',       t: ['tool', 'motion'] },
	{ w: 'ship',       t: ['tool', 'motion', 'big'] },
];

function buildVector(tags: Feature[]): number[] {
	const v = new Array<number>(PLAYGROUND_DIM).fill(0);
	for (const t of tags) {
		const [axis, strength] = FEATURE_AXIS[t];
		v[axis] += strength;
	}
	// Normalize to unit length so cosine similarity is stable.
	let s = 0;
	for (const x of v) s += x * x;
	const n = Math.sqrt(s) || 1;
	for (let i = 0; i < v.length; i++) v[i] /= n;
	return v;
}

export interface PlaygroundWord {
	word: string;
	vec: number[];
	tags: readonly string[];
}

export const PLAYGROUND_VOCAB: PlaygroundWord[] = ENTRIES.map((e) => ({
	word: e.w,
	vec: buildVector(e.t),
	tags: e.t,
}));

export const WORD_INDEX: Map<string, number> = new Map(
	PLAYGROUND_VOCAB.map((e, i) => [e.word, i]),
);
