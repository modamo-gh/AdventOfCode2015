import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const stringLiterals = input.trim().split("\n");

let totalCodeMinusMemory = 0;

const calculateCharactersInMemory = (string: string) => {
	const workingString = string.substring(1, string.length - 1);

	let numberOfCharactersInMemory = 0;

	for (let i = 0; i < workingString.length; i++) {
		if (workingString[i] === "\\") {
			if (i + 1 < workingString.length) {
				const nextCharacter = workingString[i + 1];
                
				if (nextCharacter === '"' || nextCharacter === "\\") {
					numberOfCharactersInMemory++;
					i++;
					continue;
				} else if (nextCharacter === "x") {
					numberOfCharactersInMemory++;
					i += 3;
					continue;
				}
			}
		}

		numberOfCharactersInMemory++;
	}

	return numberOfCharactersInMemory;
};

stringLiterals.forEach((stringLiteral) => {
	totalCodeMinusMemory +=
		stringLiteral.length - calculateCharactersInMemory(stringLiteral);
});

console.log(totalCodeMinusMemory);
