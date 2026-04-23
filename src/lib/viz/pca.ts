// Simple PCA (power iteration for top-k components). Good for d <= ~50.

import { dot, norm, sub } from './math';

type Matrix = number[][];

function mean(X: Matrix): number[] {
	const n = X.length;
	const d = X[0].length;
	const m = new Array<number>(d).fill(0);
	for (let i = 0; i < n; i++) for (let j = 0; j < d; j++) m[j] += X[i][j];
	for (let j = 0; j < d; j++) m[j] /= n;
	return m;
}

function center(X: Matrix, m: readonly number[]): Matrix {
	return X.map((row) => row.map((v, j) => v - m[j]));
}

// Cov = (X^T X) / (n-1)
function covariance(Xc: Matrix): Matrix {
	const n = Xc.length;
	const d = Xc[0].length;
	const C: Matrix = Array.from({ length: d }, () => new Array<number>(d).fill(0));
	for (let i = 0; i < n; i++) {
		const row = Xc[i];
		for (let a = 0; a < d; a++) {
			const ra = row[a];
			for (let b = a; b < d; b++) {
				C[a][b] += ra * row[b];
			}
		}
	}
	const inv = 1 / Math.max(1, n - 1);
	for (let a = 0; a < d; a++) {
		for (let b = a; b < d; b++) {
			C[a][b] *= inv;
			C[b][a] = C[a][b];
		}
	}
	return C;
}

function matVec(M: Matrix, v: readonly number[]): number[] {
	const out = new Array<number>(M.length).fill(0);
	for (let i = 0; i < M.length; i++) out[i] = dot(M[i], v);
	return out;
}

function powerIteration(M: Matrix, iters = 200): { vec: number[]; val: number } {
	const d = M.length;
	let v = new Array<number>(d).fill(0).map((_, i) => (i === 0 ? 1 : 0.01));
	let lambda = 0;
	for (let t = 0; t < iters; t++) {
		const w = matVec(M, v);
		const n = norm(w) || 1;
		v = w.map((x) => x / n);
		lambda = n;
	}
	return { vec: v, val: lambda };
}

function deflate(M: Matrix, v: readonly number[], lambda: number): Matrix {
	const d = M.length;
	const out: Matrix = Array.from({ length: d }, () => new Array<number>(d).fill(0));
	for (let i = 0; i < d; i++) for (let j = 0; j < d; j++) out[i][j] = M[i][j] - lambda * v[i] * v[j];
	return out;
}

export interface PCAResult {
	mean: number[];
	components: number[][];
	variances: number[];
}

export function pca(X: Matrix, k = 2): PCAResult {
	const m = mean(X);
	const Xc = center(X, m);
	let C = covariance(Xc);
	const components: number[][] = [];
	const variances: number[] = [];
	for (let i = 0; i < k; i++) {
		const { vec, val } = powerIteration(C);
		components.push(vec);
		variances.push(val);
		C = deflate(C, vec, val);
	}
	return { mean: m, components, variances };
}

export function project(x: readonly number[], p: PCAResult): number[] {
	const centered = sub(x, p.mean);
	return p.components.map((c) => dot(centered, c));
}

export function projectAll(X: Matrix, p: PCAResult): number[][] {
	return X.map((row) => project(row, p));
}
