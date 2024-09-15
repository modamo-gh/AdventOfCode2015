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

let shortestOverallRouteDistance = Infinity;

cities.forEach((city) => {
	const visitedCities = new Set<string>();
	let node = city;
	let shortestRouteDistance = 0;

	while (visitedCities.size < cityDistances.size) {
		visitedCities.add(node);

		let shortestAvailableDistance = Infinity;
		let shortestCity = "";

		for (const c of cityDistances.get(node) as connectingCities) {
			if (
				c.distance < shortestAvailableDistance &&
				!visitedCities.has(c.to)
			) {
				shortestAvailableDistance = c.distance;
				shortestCity = c.to;
			}
		}

		!Number.isNaN(parseInt(shortestAvailableDistance.toString()))
			? (shortestRouteDistance += shortestAvailableDistance)
			: shortestRouteDistance;
		node = shortestCity;
	}

	shortestOverallRouteDistance = Math.min(
		shortestRouteDistance,
		shortestOverallRouteDistance
	);
});

console.log(shortestOverallRouteDistance)