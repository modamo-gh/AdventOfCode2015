console.time();

import { readFileSync } from "fs";

const targetAmountOfPresents = parseInt(
	readFileSync("input.txt", "utf8").trim()
);
let numberOfPresents = 0;
let houseNumber = 1;

while (numberOfPresents < targetAmountOfPresents) {
	const primeFactors = new Set<number>();

	for (let i = 1; i <= Math.floor(Math.sqrt(houseNumber)); i++) {
		if (houseNumber % i === 0) {
			primeFactors.add(i);
			primeFactors.add(houseNumber / i);
		}
	}

	numberOfPresents = 10 * [...primeFactors].reduce((a, b) => a + b);

	if (numberOfPresents < targetAmountOfPresents) {
		houseNumber++;
	}
}

console.log(houseNumber);
console.timeEnd();
