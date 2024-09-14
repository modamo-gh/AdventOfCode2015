import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const boxes = input.split("\n");

let totalFeetOfRibbon = 0;

for (const box of boxes) {
	const dimensions = box
		.split("x")
		.map((dimension) => parseInt(dimension))
		.sort((a, b) => a - b);

	const feetOfRibbon =
		2 * dimensions[0] + 2 * dimensions[1] + dimensions[0] * dimensions[1] * dimensions[2];

	totalFeetOfRibbon += feetOfRibbon;
}

console.log(totalFeetOfRibbon);