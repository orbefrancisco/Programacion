// Pedagogical 8-dimensional "embedding" for ~40 words. The dimensions are
// hand-designed semantic axes: the arithmetic relations (king - man + woman ≈ queen,
// etc.) hold by construction, the way a trained model would only exhibit them
// emergently. This is a teaching aid, not a model output.
//
// Dimensions:
//   0 gender        −1 female … +1 male (0 neutral)
//   1 royalty        0 commoner … +1 royal
//   2 age           −1 young  …  +1 old
//   3 human          0 non-human … +1 human
//   4 animal         0 non-animal … +1 animal
//   5 size          −1 small  …  +1 big
//   6 valence       −1 negative … +1 positive
//   7 motion         0 static  … +1 motion verb

export interface WordVec {
	word: string;
	vec: number[];
	group: 'people' | 'royalty' | 'family' | 'animals' | 'places' | 'abstract' | 'actions';
}

export const MINI_EMBEDDINGS: WordVec[] = [
	// Royalty (gender × royalty)
	{ word: 'king',      vec: [ 1.0,  1.0,  0.3,  1.0,  0,    0.2,  0.3,  0], group: 'royalty' },
	{ word: 'queen',     vec: [-1.0,  1.0,  0.3,  1.0,  0,    0.1,  0.3,  0], group: 'royalty' },
	{ word: 'prince',    vec: [ 1.0,  0.8, -0.3,  1.0,  0,    0,    0.3,  0], group: 'royalty' },
	{ word: 'princess',  vec: [-1.0,  0.8, -0.3,  1.0,  0,    0,    0.3,  0], group: 'royalty' },
	{ word: 'emperor',   vec: [ 1.0,  1.0,  0.4,  1.0,  0,    0.3,  0.1,  0], group: 'royalty' },

	// People
	{ word: 'man',       vec: [ 1.0,  0.0,  0.1,  1.0,  0,    0.1,  0.0,  0], group: 'people' },
	{ word: 'woman',     vec: [-1.0,  0.0,  0.1,  1.0,  0,    0.0,  0.0,  0], group: 'people' },
	{ word: 'boy',       vec: [ 1.0,  0.0, -0.7,  1.0,  0,   -0.3,  0.2,  0], group: 'people' },
	{ word: 'girl',      vec: [-1.0,  0.0, -0.7,  1.0,  0,   -0.3,  0.2,  0], group: 'people' },
	{ word: 'actor',     vec: [ 1.0,  0.0,  0.0,  1.0,  0,    0.1,  0.1,  0], group: 'people' },
	{ word: 'actress',   vec: [-1.0,  0.0,  0.0,  1.0,  0,    0.0,  0.1,  0], group: 'people' },

	// Family
	{ word: 'father',    vec: [ 1.0,  0.0,  0.4,  1.0,  0,    0.1,  0.4,  0], group: 'family' },
	{ word: 'mother',    vec: [-1.0,  0.0,  0.4,  1.0,  0,    0.0,  0.5,  0], group: 'family' },
	{ word: 'son',       vec: [ 1.0,  0.0, -0.5,  1.0,  0,   -0.1,  0.4,  0], group: 'family' },
	{ word: 'daughter',  vec: [-1.0,  0.0, -0.5,  1.0,  0,   -0.1,  0.4,  0], group: 'family' },
	{ word: 'uncle',     vec: [ 1.0,  0.0,  0.3,  1.0,  0,    0.1,  0.2,  0], group: 'family' },
	{ word: 'aunt',      vec: [-1.0,  0.0,  0.3,  1.0,  0,    0.0,  0.2,  0], group: 'family' },

	// Animals
	{ word: 'dog',       vec: [ 0.0,  0.0,  0.0,  0,    1.0,  0.0,  0.4,  0], group: 'animals' },
	{ word: 'cat',       vec: [ 0.0,  0.0,  0.0,  0,    1.0, -0.2,  0.3,  0], group: 'animals' },
	{ word: 'puppy',     vec: [ 0.0,  0.0, -0.8,  0,    1.0, -0.5,  0.6,  0], group: 'animals' },
	{ word: 'kitten',    vec: [ 0.0,  0.0, -0.8,  0,    1.0, -0.6,  0.6,  0], group: 'animals' },
	{ word: 'horse',     vec: [ 0.0,  0.0,  0.1,  0,    1.0,  0.6,  0.2,  0], group: 'animals' },
	{ word: 'elephant',  vec: [ 0.0,  0.0,  0.2,  0,    1.0,  1.0,  0.2,  0], group: 'animals' },
	{ word: 'mouse',     vec: [ 0.0,  0.0,  0.0,  0,    1.0, -0.8,  0.0,  0], group: 'animals' },

	// Places
	{ word: 'city',      vec: [ 0.0,  0.0,  0.0,  0,    0,    0.8,  0.0,  0], group: 'places' },
	{ word: 'village',   vec: [ 0.0,  0.0,  0.1,  0,    0,   -0.3,  0.1,  0], group: 'places' },
	{ word: 'castle',    vec: [ 0.0,  0.6,  0.5,  0,    0,    0.7,  0.0,  0], group: 'places' },
	{ word: 'palace',    vec: [ 0.0,  0.9,  0.3,  0,    0,    0.8,  0.2,  0], group: 'places' },

	// Abstract
	{ word: 'love',      vec: [ 0.0,  0.0,  0.0,  0,    0,    0.0,  1.0,  0], group: 'abstract' },
	{ word: 'hate',      vec: [ 0.0,  0.0,  0.0,  0,    0,    0.0, -1.0,  0], group: 'abstract' },
	{ word: 'joy',       vec: [ 0.0,  0.0,  0.0,  0,    0,    0.0,  0.9,  0], group: 'abstract' },
	{ word: 'grief',     vec: [ 0.0,  0.0,  0.0,  0,    0,    0.0, -0.8,  0], group: 'abstract' },
	{ word: 'power',     vec: [ 0.0,  0.4,  0.0,  0,    0,    0.3,  0.0,  0], group: 'abstract' },

	// Actions (motion)
	{ word: 'run',       vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.1,  1.0], group: 'actions' },
	{ word: 'walk',      vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.1,  0.7], group: 'actions' },
	{ word: 'fly',       vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.2,  1.0], group: 'actions' },
	{ word: 'swim',      vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.1,  0.8], group: 'actions' },
	{ word: 'sit',       vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.0,  0.1], group: 'actions' },
	{ word: 'think',     vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.2,  0.0], group: 'actions' },
	{ word: 'sleep',     vec: [ 0.0,  0.0,  0.0,  0,    0,    0,    0.3,  0.0], group: 'actions' },
];

export const MINI_DIM = 8;
export const AXIS_LABELS = [
	'gender', 'royalty', 'age', 'human', 'animal', 'size', 'valence', 'motion',
];

// Example triples that the pedagogical structure should satisfy:
//   king   - man    + woman   ≈ queen
//   prince - boy    + girl    ≈ princess
//   father - man    + woman   ≈ mother
//   uncle  - man    + woman   ≈ aunt
export const ARITHMETIC_EXAMPLES: Array<{ a: string; minus: string; plus: string; expected: string }> = [
	{ a: 'king',    minus: 'man', plus: 'woman', expected: 'queen' },
	{ a: 'prince',  minus: 'boy', plus: 'girl',  expected: 'princess' },
	{ a: 'father',  minus: 'man', plus: 'woman', expected: 'mother' },
	{ a: 'uncle',   minus: 'man', plus: 'woman', expected: 'aunt' },
	{ a: 'actor',   minus: 'man', plus: 'woman', expected: 'actress' },
	{ a: 'puppy',   minus: 'dog', plus: 'cat',   expected: 'kitten' },
];

export const GROUP_COLORS: Record<WordVec['group'], string> = {
	royalty:  '#F59E0B',
	people:   '#A7A7AE',
	family:   '#E3C78F',
	animals:  '#6FB28F',
	places:   '#7A9ECF',
	abstract: '#C889C7',
	actions:  '#CFCF8D',
};
