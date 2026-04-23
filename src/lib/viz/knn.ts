import { cosineSim } from './math';

export interface NearestResult {
	index: number;
	score: number;
}

export function kNearestCosine(
	query: readonly number[],
	vectors: readonly (readonly number[])[],
	k: number,
	excludeIndex = -1,
): NearestResult[] {
	const scored: NearestResult[] = [];
	for (let i = 0; i < vectors.length; i++) {
		if (i === excludeIndex) continue;
		scored.push({ index: i, score: cosineSim(query, vectors[i]) });
	}
	scored.sort((a, b) => b.score - a.score);
	return scored.slice(0, k);
}
