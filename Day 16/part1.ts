import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

const suesDetails = input.split("\n");

type Sue = {
	number?: number;
	children?: number;
	cats?: number;
	samoyeds?: number;
	pomeranians?: number;
	akitas?: number;
	vizslas?: number;
	goldfish?: number;
	trees?: number;
	cars?: number;
	perfumes?: number;
	[key: string]: number | undefined;
};

const sues: Sue[] = [];

for (const sueDetails of suesDetails) {
	const tokens = sueDetails.split(" ");

	for (let i = 0; i < tokens.length; i++) {
		tokens[i] = tokens[i].replace(/\W/g, "");
	}

	const sue: Sue = { number: parseInt(tokens[1]) };

	for (let i = 2; i < tokens.length; i += 2) {
		sue[tokens[i]] = parseInt(tokens[i + 1]);
	}

	sues.push(sue);
}

const tickerTape = readFileSync("tickerTape.txt", "utf8").trim();
const tickerTapeDetails = tickerTape.split("\n");

const theSue: Sue = {};

for (const tickerTapeDetail of tickerTapeDetails) {
	const tokens = tickerTapeDetail.split(" ");

	for (let i = 0; i < tokens.length; i++) {
		tokens[i] = tokens[i].replace(/\W/g, "");
	}

	theSue[tokens[0]] = parseInt(tokens[1]);
}

for (const sue of sues) {
	let isTheSue = true;

	for (const compound in theSue) {
		if (sue[compound] !== undefined) {
			if (sue[compound] !== theSue[compound]) {
				isTheSue = false;
			}
		}
	}

	if (isTheSue) {
		console.log(sue);
		break;
	}
}
