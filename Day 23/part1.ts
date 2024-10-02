import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const instructions = input
	.split("\n")
	.map((instruction) => instruction.replace(",", "").split(" "));

const registers: { [key: string]: number } = { a: 0, b: 0 };

let index = 0;

while (index < instructions.length) {
	const instruction = instructions[index];
	const mnemonic = instruction[0];

	switch (mnemonic) {
		case "hlf":
			registers[instruction[1]] /= 2;
			index++;
			break;
		case "tpl":
			registers[instruction[1]] *= 3;
			index++;
			break;
		case "inc":
			registers[instruction[1]]++;
			index++;
			break;
		case "jmp":
			index += parseInt(instruction[1]);
			break;
		case "jie":
			registers[instruction[1]] % 2 === 0
				? (index += parseInt(instruction[2]))
				: index++;
			break;
		case "jio":
			registers[instruction[1]] === 1
				? (index += parseInt(instruction[2]))
				: index++;
			break;
	}
}

console.log(registers);
