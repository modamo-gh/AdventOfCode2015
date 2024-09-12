import {readFileSync} from "node:fs";

const getFloor = (instructions: string): number => {
	let floor = 0;

	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] === "(") {
			floor++;
			console.log(floor);
		} else {
			floor--;
			console.log(floor);
		}
	}
	return floor;
};

const main = () => {
	const input = readFileSync("input.txt", "utf8");
	console.log(getFloor(input));
}

main();