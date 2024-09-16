import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

let overallResult = [...input.split("")];

for (let i = 0; i < 40; i++) {
	let number = "";
	let frequency = 0;
	let result: string[] = [];

	for (let j = 0; j < overallResult.length; j++) {
		const currentNumber = overallResult[j];

		if (currentNumber !== number) {
			result = result.concat((frequency + number).split(""));
			number = currentNumber;
			frequency = 0;
		}

		frequency += 1;
	}

	result = result.concat((frequency + number).split(""));
	overallResult = result[0] === "0" ? result.slice(1) : result;
}

console.log(overallResult.length);
