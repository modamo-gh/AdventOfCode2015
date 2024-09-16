import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

let overallResult = input;

const memo = new Map<string, string>();

const getNextLookAndSay = (sequence: string): string => {
	if (sequence.length === 1) {
		return `1${sequence}`;
	}

	if (memo.has(sequence)) {
		const nextSequence = memo.get(sequence);

		if (nextSequence) {
			return nextSequence;
		}
	}

	const midpoint = sequence.length / 2;

	if (sequence[midpoint - 1] !== sequence[midpoint]) {
		return `${getNextLookAndSay(
			sequence.slice(0, midpoint)
		)}${getNextLookAndSay(sequence.slice(midpoint))}`;
	}

	let number = "";
	let frequency = 0;
	let result = "";

	for (let j = 0; j < sequence.length; j++) {
		const currentNumber = sequence[j];

		if (currentNumber !== number) {
			result += `${frequency}${number}`;
			number = currentNumber;
			frequency = 0;
		}

		frequency += 1;
	}

	result += `${frequency}${number}`;
	result = result[0] === "0" ? result.slice(1) : result;

	memo.set(sequence, result);

	return result;
};

for (let i = 0; i < 50; i++) {
	overallResult = getNextLookAndSay(overallResult);

	console.log(i + 1, overallResult.length);
}

console.log(overallResult.length);
