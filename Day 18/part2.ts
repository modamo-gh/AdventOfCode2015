import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

for (let i = 0; i < lines.length; i++) {
	lines[i] = lines[i].trim();
}

const state: string[][] = Array.from({ length: lines.length }, (a) =>
	new Array(6).fill("")
);
const stateClone: string[][] = Array.from({ length: lines.length }, (a) =>
	new Array(6).fill("")
);

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		state[i][j] = lines[i][j];
		stateClone[i][j] = lines[i][j];
	}
}

const determineIndividualState = (i: number, j: number) => {
    const edges = new Set([0, state.length -1]);

    if(edges.has(i) && edges.has(j)){
        stateClone[i][j] === "#";

        return;
    }
    
	let numberOfOnNeighbors = 0;

	const offsets = [
		{ x: -1, y: -1 },
		{ x: -1, y: 0 },
		{ x: -1, y: 1 },
		{ x: 0, y: -1 },
		{ x: 0, y: 1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 1 }
	];

	for (const offset of offsets) {
		const potentialNeighborX = i + offset.x;
		const potentialNeighborY = j + offset.y;

		if (
			potentialNeighborX >= 0 &&
			potentialNeighborX < state.length &&
			potentialNeighborY >= 0 &&
			potentialNeighborY < state[i].length &&
			state[potentialNeighborX][potentialNeighborY] === "#"
		) {
			numberOfOnNeighbors++;
		}
	}

	if (state[i][j] === "." && numberOfOnNeighbors === 3) {
		stateClone[i][j] = "#";
	} else if (
		state[i][j] === "#" &&
		(numberOfOnNeighbors < 2 || numberOfOnNeighbors > 3)
	) {
		stateClone[i][j] = ".";
	}
};

for (let i = 0; i < 100; i++) {
	for (let j = 0; j < lines.length; j++) {
		for (let k = 0; k < lines[j].length; k++) {
			determineIndividualState(j, k);
		}
	}

	for (let j = 0; j < lines.length; j++) {
		for (let k = 0; k < lines[j].length; k++) {
			state[j][k] = stateClone[j][k];
		}
	}
}

let numberOfOnLights = 0;

for (let i = 0; i < lines.length; i++) {
	for (let j = 0; j < lines[i].length; j++) {
		if (state[i][j] === "#") {
			numberOfOnLights++;
		}
	}
}

console.log(numberOfOnLights);
