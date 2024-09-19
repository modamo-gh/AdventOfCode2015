import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

const volumes = input.split("\n").map((n) => parseInt(n));

const allValidCombinations = new Set<string>();
let remainingVolume = 150;
const combination: number[] = [];
const usedContainers = new Set<number>();

const helper = () => {
	if (remainingVolume === 0) {
		allValidCombinations.add(
			JSON.stringify([...combination].sort((a, b) => a - b))
		);
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

console.log(allValidCombinations.size);
