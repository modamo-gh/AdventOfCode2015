import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const matches = input.matchAll(/(\d+)/g);
const coordinates = [];

for (const match of matches) {
	coordinates.push(parseInt(match[0]));
}

const getTargetIndex = (row: number, column: number) => {
	return ((row + column - 1) * (row + column)) / 2 - row + 1;
};

const targetIndex = getTargetIndex(coordinates[0], coordinates[1]);

let code = 20151125;

for (let i = 1; i < targetIndex; i++) {
	code = (code * 252533) % 33554393;
}

console.log(code)