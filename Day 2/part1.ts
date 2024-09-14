import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const boxes = input.split("\n");

let totalSquareFeet = 0;

for (const box of boxes) {
	const dimensions = box
		.split("x")
		.map((dimension) => parseInt(dimension))
		.sort((a, b) => a - b);

	const squareFeet =
		2 * dimensions[0] * dimensions[1] +
		2 * dimensions[0] * dimensions[2] +
		2 * dimensions[1] * dimensions[2] +
		dimensions[0] * dimensions[1];

	totalSquareFeet += squareFeet;
}

console.log(totalSquareFeet);