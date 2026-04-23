// Toy corpus for the skip-gram live simulation. 8 words, a few sentences.
// Small enough that gradient descent in 2D runs in real time and the
// semantic structure (animals cluster, royalty cluster, verbs cluster)
// is visibly emergent.

export const VOCAB = ['king', 'queen', 'man', 'woman', 'dog', 'cat', 'runs', 'sleeps'] as const;
export type Word = typeof VOCAB[number];

// Each sentence is an array of indices into VOCAB.
// Constructed so that:
//  - king appears near man; queen near woman (gender of royalty)
//  - dog and cat share contexts (runs, sleeps)
//  - verbs share contexts
const SENTENCES_TEXT: Word[][] = [
	['king', 'man', 'runs'],
	['queen', 'woman', 'runs'],
	['king', 'man', 'sleeps'],
	['queen', 'woman', 'sleeps'],
	['man', 'dog', 'runs'],
	['woman', 'cat', 'runs'],
	['man', 'dog', 'sleeps'],
	['woman', 'cat', 'sleeps'],
	['dog', 'cat', 'runs'],
	['dog', 'cat', 'sleeps'],
	['king', 'queen'],
	['man', 'woman'],
	['dog', 'cat'],
	['runs', 'sleeps'],
];

const wordIdx: Record<string, number> = Object.fromEntries(VOCAB.map((w, i) => [w, i]));

export const SENTENCES: number[][] = SENTENCES_TEXT.map((s) => s.map((w) => wordIdx[w]));

// Build (center, context) training pairs with a window of size 1 (adjacent).
export function buildPairs(sentences: number[][], window = 1): Array<[number, number]> {
	const pairs: Array<[number, number]> = [];
	for (const s of sentences) {
		for (let i = 0; i < s.length; i++) {
			for (let w = 1; w <= window; w++) {
				if (i - w >= 0) pairs.push([s[i], s[i - w]]);
				if (i + w < s.length) pairs.push([s[i], s[i + w]]);
			}
		}
	}
	return pairs;
}

export const PAIRS = buildPairs(SENTENCES, 1);
