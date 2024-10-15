import { readFileSync } from "fs";

const packageWeights = readFileSync("input.txt", "utf8")
	.trim()
	.split("\n")
	.map((packageWeight) => parseInt(packageWeight));
const totalWeight = packageWeights.reduce((p, c) => p + c, 0);
const groupWeight = totalWeight / 3;
const group: number[] = [];

let smallestQE = Infinity;
let smallestGroupLength = Infinity;
let qe = 1;
let length = 0;
let weight = 0;

const calculateSmallestQE = (start: number) => {
	for (let i = start; i < packageWeights.length; i++) {
		group.push(packageWeights[i]);
		length++;
		weight += packageWeights[i];
		qe *= packageWeights[i];

		if (weight === groupWeight) {
			if (length < smallestGroupLength) {
				smallestGroupLength = length;
				smallestQE = qe;
			} else if (length === smallestGroupLength) {
				if (qe < smallestQE) {
					smallestQE = qe;
				}
			}
		}

		calculateSmallestQE(i + 1);
		qe = Math.round(qe / packageWeights[i]);
		weight -= packageWeights[i];
		length--;
		group.pop();
	}
};

calculateSmallestQE(0);

console.log(smallestQE);
