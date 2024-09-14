import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const strings = input.split("\n");

let numberOfNiceStrings = 0;

const hasAtLeastThreeVowels = (string: string) => {
	let numberOfVowels = 0;
	const vowels = new Set<string>(["a", "e", "i", "o", "u"]);

	for (let i = 0; i < string.length; i++) {
		if (vowels.has(string[i])) {
			numberOfVowels++;
		}

		if (numberOfVowels === 3) {
			return true;
		}
	}

	return false;
};

const containsDoubleLetter = (string: string) => {
	for (let i = 0; i < string.length - 1; i++) {
		if (string[i] === string[i + 1]) {
			return true;
		}
	}

	return false;
};

const doesNotHaveForbiddenStrings = (string: string) => {
	const forbiddenStrings = new Set(["ab", "cd", "pq", "xy"]);

	for (let i = 0; i < string.length - 1; i++) {
		if (forbiddenStrings.has(string.substring(i, i + 2))) {
			return false;
		}
	}

	return true;
};

const isNice = (string: string) => {
	return (
		hasAtLeastThreeVowels(string) &&
		containsDoubleLetter(string) &&
		doesNotHaveForbiddenStrings(string)
	);
};

strings.forEach((string) => {
	if(isNice(string)){
        numberOfNiceStrings++;
    }
});

console.log(numberOfNiceStrings);