import {readFileSync} from "node:fs";

const getFloor = (instructions: string): number => {
	let floor = 0;

	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] === "(") {
			floor++;
		} else {
			floor--;
		}

        if(floor === -1){
            return i + 1;
        }
	}
};

const main = () => {
	const input = readFileSync("input.txt", "utf8");
	console.log(getFloor(input));
}

main();