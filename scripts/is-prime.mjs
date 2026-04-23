#!/usr/bin/env node
// Comprueba si un número entero es primo.
// Uso: node scripts/is-prime.mjs <número>

export function isPrime(n) {
	if (!Number.isInteger(n) || n < 2) return false;
	if (n < 4) return true;
	if (n % 2 === 0) return false;
	for (let i = 3; i * i <= n; i += 2) {
		if (n % i === 0) return false;
	}
	return true;
}

const arg = process.argv[2];
if (arg === undefined) {
	console.error('Uso: node scripts/is-prime.mjs <número>');
	process.exit(1);
}

const n = Number(arg);
if (!Number.isFinite(n) || !Number.isInteger(n)) {
	console.error(`"${arg}" no es un entero válido.`);
	process.exit(1);
}

console.log(`${n} ${isPrime(n) ? 'es primo' : 'no es primo'}`);
