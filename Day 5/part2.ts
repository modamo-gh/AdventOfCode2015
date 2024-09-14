import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const strings = input.split("\n");

let numberOfNiceStrings = 0;

const hasTwoPairsOfNonOverlappingLetters = (string: string) => {
	const letterPairStartingIndices = new Map<string, number[]>();

    for(let i = 0; i < string.length - 1; i++){
        const indices = letterPairStartingIndices.get(string.substring(i, i + 2)) || [];
        
        indices.push(i);

        letterPairStartingIndices.set(string.substring(i, i + 2), indices);
    }

    for(const [letterPair, indices] of letterPairStartingIndices){
        if(indices.length > 1){
            if(indices[indices.length - 1] - indices[0] > 1){
                return true;
            }
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
