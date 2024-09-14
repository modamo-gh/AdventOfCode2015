import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const currentLocation = { x: 0, y: 0 };
const visitedHouses = new Set<string>();

visitedHouses.add(JSON.stringify(currentLocation));

for (let i = 0; i < input.length; i++) {
	switch (input[i]) {
		case "<":
			currentLocation.x--;
			break;
		case "v":
			currentLocation.y--;
			break;
		case ">":
			currentLocation.x++;
			break;
		case "^":
			currentLocation.y++;
			break;
	}

	visitedHouses.add(JSON.stringify(currentLocation));
}

console.log(visitedHouses.size);
