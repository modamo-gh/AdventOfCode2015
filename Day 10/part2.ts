import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

let overallResult = [...input.split("")];

const memo = new Map<string, string>();

const getNextLookAndSay = (sequenceArray: string[]): string[] => {
	if (sequenceArray.length === 1) {
		return ["1", sequenceArray[0]];
	}

	const sequenceString = sequenceArray.join("");

	if (memo.has(sequenceString)) {
		const nextSequence = memo.get(sequenceString);
        
		if (nextSequence) {
			return nextSequence.split("");
		}
	}

	const midpoint = sequenceArray.length / 2;

	if (sequenceArray[midpoint - 1] !== sequenceArray[midpoint]) {
		return getNextLookAndSay(sequenceArray.slice(0, midpoint)).concat(
			getNextLookAndSay(sequenceArray.slice(midpoint))
		);
	}

	let number = "";
	let frequency = 0;
	let result: string[] = [];

	for (let j = 0; j < sequenceArray.length; j++) {
		const currentNumber = sequenceArray[j];

		if (currentNumber !== number) {
			result = result.concat((frequency + number).split(""));
			number = currentNumber;
			frequency = 0;
		}

		frequency += 1;
	}

	result = result.concat((frequency + number).split(""));
	result = result[0] === "0" ? result.slice(1) : result;

	memo.set(sequenceArray.join(""), result.join(""));

	return result;
};

for (let i = 0; i < 50; i++) {
	overallResult = getNextLookAndSay(overallResult);

	console.log(i + 1, overallResult.length);
}

console.log(overallResult.length);
