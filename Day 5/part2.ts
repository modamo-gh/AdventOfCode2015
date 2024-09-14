import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const strings = input.split("\n");

let numberOfNiceStrings = 0;

const hasTwoPairsOfNonOverlappingLetters = (string: string) => {
	for (let i = 0; i < string.length - 1; i++) {
		if (string.substring(i + 2).includes(string.substring(i, i + 2))) {
			return true;
		}
	}

	return false;
};

const containsRepeatingLetterWithLetterBetween = (string: string) => {
	for (let i = 0; i < string.length - 2; i++) {
		if (string[i] === string[i + 2]) {
			return true;
		}
	}

	return false;
};

const isNice = (string: string) => {
	return (
		hasTwoPairsOfNonOverlappingLetters(string) &&
		containsRepeatingLetterWithLetterBetween(string)
	);
};

strings.forEach((string) => {
	if(isNice(string)){
        numberOfNiceStrings++;
    }
});

console.log(numberOfNiceStrings);
