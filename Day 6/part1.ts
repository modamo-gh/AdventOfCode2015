import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const instructions = input.split("\n");

const grid = new Array<null>(1000).fill(null).map(() => new Array<boolean>(1000).fill(false));

let numberOfLitLights = 0;

for (const instruction of instructions) {
	const tokens = instruction.split(" ");

	if (tokens[0] === "turn") {
		const [lowerX, lowerY] = tokens[2]
			.split(",")
			.map((value) => parseInt(value));
		const [upperX, upperY] = tokens[4]
			.split(",")
			.map((value) => parseInt(value));

		if (tokens[1] === "on") {
			for (let x = lowerX; x <= upperX; x++) {
				for (let y = lowerY; y <= upperY; y++) {
					grid[x][y] = true;
				}
			}
		} else if (tokens[1] === "off") {
			for (let x = lowerX; x <= upperX; x++) {
				for (let y = lowerY; y <= upperY; y++) {
					grid[x][y] = false;
				}
			}
		}
	} else if (tokens[0] === "toggle") {
		const [lowerX, lowerY] = tokens[1]
			.split(",")
			.map((value) => parseInt(value));
		const [upperX, upperY] = tokens[3]
			.split(",")
			.map((value) => parseInt(value));

		for (let x = lowerX; x <= upperX; x++) {
			for (let y = lowerY; y <= upperY; y++) {
				grid[x][y] = !grid[x][y];
			}
		}
	}
}

for (let i = 0; i < grid.length; i++) {
	for (let j = 0; j <= grid[i].length; j++) {
		if (grid[i][j]) {
			numberOfLitLights++;
		}
	}
}

console.log(numberOfLitLights);
