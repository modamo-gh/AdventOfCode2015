import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

const guestsSeatingPreferences = new Map<string, Map<string, number>>();

for (const line of lines) {
	const tokens = line.split(" ");

	const guest = tokens[0];
	let potentialHappiness = parseInt(tokens[3]);

	if (tokens[2] === "lose") {
		potentialHappiness *= -1;
	}

	const potentialNeighbor = tokens[tokens.length - 1].replace(/\W/g, "");

	const seatingPreferences =
		guestsSeatingPreferences.get(guest) || new Map<string, number>();

	seatingPreferences.set(potentialNeighbor, potentialHappiness);

	guestsSeatingPreferences.set(guest, seatingPreferences);
}

let totalChangeInHappiness = -Infinity;

const seated = new Set();
const seatingArrangement: string[] = [];
let changeInHappiness = 0;

const calculateChangeInHappiness = (seatingArrangement: string[]) => {
	let changeInHappiness = 0;

	for (let i = 0; i < seatingArrangement.length; i++) {
		let leftNeighborIndex = i - 1;
		let rightNeighborIndex = (i + 1) % seatingArrangement.length;

		if (leftNeighborIndex < 0) {
			leftNeighborIndex = seatingArrangement.length - 1;
		}

		const guest = seatingArrangement[i];

		changeInHappiness +=
			guestsSeatingPreferences
				.get(guest)
				?.get(seatingArrangement[leftNeighborIndex]) ?? 0;

		changeInHappiness +=
			guestsSeatingPreferences
				.get(guest)
				?.get(seatingArrangement[rightNeighborIndex]) ?? 0;
	}

	return changeInHappiness;
};

const helper = () => {
	if (seatingArrangement.length === guestsSeatingPreferences.size) {
		changeInHappiness = calculateChangeInHappiness([...seatingArrangement]);
		totalChangeInHappiness = Math.max(
			changeInHappiness,
			totalChangeInHappiness
		);

		return;
	}

	for (const [guest, seatingPreferences] of guestsSeatingPreferences) {
		if (!seated.has(guest)) {
			seatingArrangement.push(guest);
			seated.add(guest);
			helper();
			seated.delete(guest);
			seatingArrangement.pop();
		}
	}
};

helper();

console.log(totalChangeInHappiness);
