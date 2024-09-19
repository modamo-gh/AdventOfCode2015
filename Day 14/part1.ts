import { readFileSync, stat } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const lines = input.split("\n");

type Stats = {
	flyingSpeed: number;
	flightDuration: number;
	restTime: number;
};

const reindeers = new Map<string, Stats>();

for (const line of lines) {
	const tokens = line.split(" ");

	reindeers.set(tokens[0], {
		flyingSpeed: parseInt(tokens[3]),
		flightDuration: parseInt(tokens[6]),
		restTime: parseInt(tokens[13])
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
		: distance += stats.flightDuration * stats.flyingSpeed;

	return distance;
};

for (const [reindeer, stats] of reindeers) {
	const distance = calculateDistance(stats, 2503);

	winningDistance = Math.max(distance, winningDistance);
}

console.log(winningDistance);