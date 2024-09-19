import { readFileSync, stat } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

type Stats = {
	flyingSpeed: number;
	flightDuration: number;
	restTime: number;
	points: number;
	distance: number;
};

const reindeers = new Map<string, Stats>();

for (const line of lines) {
	const tokens = line.split(" ");

	reindeers.set(tokens[0], {
		flyingSpeed: parseInt(tokens[3]),
		flightDuration: parseInt(tokens[6]),
		restTime: parseInt(tokens[13]),
		points: 0,
		distance: 0
	});
}

let winningDistance = -Infinity;

const calculateDistance = (stats: Stats, raceTime: number) => {
	const flightRestCycle = stats.flightDuration + stats.restTime;
	const numberOfCycles = Math.floor(raceTime / flightRestCycle);
	const remainingSeconds = raceTime % flightRestCycle;

	let distance = 0;

	distance += numberOfCycles * stats.flyingSpeed * stats.flightDuration;

	remainingSeconds <= stats.flightDuration
		? (distance += remainingSeconds * stats.flyingSpeed)
		: (distance += stats.flightDuration * stats.flyingSpeed);

	return distance;
};

let winningPoints = -Infinity;

for (let second = 1; second <= 2503; second++) {
	for (const [reindeer, stats] of reindeers) {
		stats.distance = calculateDistance(stats, second);

		winningDistance = Math.max(stats.distance, winningDistance);
	}

	for (const [reindeer, stats] of reindeers) {
		if (stats.distance === winningDistance) {
			stats.points++;
		}

		winningPoints = Math.max(stats.points, winningPoints);
	}
}

console.log(winningPoints);