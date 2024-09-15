import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8");

const distances = input.trim().split("\n");

type connectingCities = { to: string; distance: number }[];

const cityDistances = new Map<string, connectingCities>();

for (const distance of distances) {
	const [startCity, to, endCity, equal, dist] = distance.split(" ");

	const startConnectingCities =
		cityDistances.get(startCity) || <connectingCities>[];
	const endConnectingCities =
		cityDistances.get(endCity) || <connectingCities>[];

	startConnectingCities.push({ to: endCity, distance: parseInt(dist) });
	endConnectingCities.push({ to: startCity, distance: parseInt(dist) });

	cityDistances.set(startCity, startConnectingCities);
	cityDistances.set(endCity, endConnectingCities);
}

const cities = [...cityDistances.keys()];

let longestOverallRouteDistance = -Infinity;

cities.forEach((city) => {
	const visitedCities = new Set<string>();
	let node = city;
	let longestRouteDistance = 0;

	while (visitedCities.size < cityDistances.size) {
		visitedCities.add(node);

		let longestAvailableDistance = -Infinity;
		let longestCity = "";

		for (const c of cityDistances.get(node) as connectingCities) {
			if (
				c.distance > longestAvailableDistance &&
				!visitedCities.has(c.to)
			) {
				longestAvailableDistance = c.distance;
				longestCity = c.to;
			}
		}

		!Number.isNaN(parseInt(longestAvailableDistance.toString()))
			? (longestRouteDistance += longestAvailableDistance)
			: longestRouteDistance;
		node = longestCity;
	}

	longestOverallRouteDistance = Math.max(
		longestRouteDistance,
		longestOverallRouteDistance
	);
});

console.log(longestOverallRouteDistance)