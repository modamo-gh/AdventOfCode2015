import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");
const stringLiterals = input.trim().split("\n");

let totalEncodedMinusCode = 0;

const encodeString = (string: string) => {
	let characters = string.split("");

	for (let i = 0; i < characters.length; i++) {
		if (characters[i] === '"') {
			characters = characters
				.slice(0, i)
				.concat(["\\"])
				.concat(characters.slice(i));

			i++;
		} else if (characters[i] === "\\") {
			characters = characters
				.slice(0, i)
				.concat(["\\"])
				.concat(characters.slice(i));

			i++;
		}
	}

	return characters;
};

stringLiterals.forEach((stringLiteral) => {
	totalEncodedMinusCode +=
		encodeString(stringLiteral).length + 2 - stringLiteral.length;
});

console.log(totalEncodedMinusCode);
