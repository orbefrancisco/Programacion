export const clamp = (x: number, lo: number, hi: number): number =>
	x < lo ? lo : x > hi ? hi : x;

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const easeInOutCubic = (t: number): number =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function seededRng(seed: number): () => number {
	let s = seed >>> 0;
	return () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function gaussian(rng: () => number, mean = 0, stdev = 1): number {
	// Box–Muller
	let u = 0;
	let v = 0;
	while (u === 0) u = rng();
	while (v === 0) v = rng();
	const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
	return z * stdev + mean;
}

export const dot = (a: readonly number[], b: readonly number[]): number => {
	let s = 0;
	for (let i = 0; i < a.length; i++) s += a[i] * b[i];
	return s;
};

export const norm = (a: readonly number[]): number => Math.sqrt(dot(a, a));

export const normalize = (a: readonly number[]): number[] => {
	const n = norm(a) || 1;
	return a.map((v) => v / n);
};

export const cosineSim = (a: readonly number[], b: readonly number[]): number =>
	dot(a, b) / ((norm(a) * norm(b)) || 1);

export const euclidean = (a: readonly number[], b: readonly number[]): number => {
	let s = 0;
	for (let i = 0; i < a.length; i++) {
		const d = a[i] - b[i];
		s += d * d;
	}
	return Math.sqrt(s);
};

export const add = (a: readonly number[], b: readonly number[]): number[] =>
	a.map((v, i) => v + b[i]);

export const sub = (a: readonly number[], b: readonly number[]): number[] =>
	a.map((v, i) => v - b[i]);

export const scale = (a: readonly number[], k: number): number[] => a.map((v) => v * k);
