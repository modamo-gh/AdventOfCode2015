import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

const volumes = input.split("\n").map((n) => parseInt(n));

let allValidCombinations: Set<string> | string[] = new Set<string>();
let remainingVolume = 150;
const combination: number[] = [];
const usedContainers = new Set();

const helper = () => {
	if (remainingVolume === 0) {
		if (!Array.isArray(allValidCombinations)) {
			allValidCombinations.add(
				JSON.stringify([...combination].sort((a, b) => a - b))
			);
		}
		return;
	}

	for (let i = 0; i < volumes.length; i++) {
		if (remainingVolume - volumes[i] >= 0 && !usedContainers.has(i)) {
			combination.push(i);
			remainingVolume -= volumes[i];
			usedContainers.add(i);
			helper();
			usedContainers.delete(i);
			remainingVolume += volumes[i];
			combination.pop();
		}
	}
};

helper();

allValidCombinations = [...allValidCombinations];
allValidCombinations = allValidCombinations
	.map((e) => JSON.parse(e))
	.sort((a, b) => a.length - b.length);

let numberOfMinimumSets = 0;

for (const combination of allValidCombinations) {
	if (combination.length === allValidCombinations[0].length) {
		numberOfMinimumSets++;
	} else {
		break;
	}
}

console.log(numberOfMinimumSets);
