import { readFileSync } from "fs";

const input = readFileSync("../input.txt", "utf8");

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

let shortestRouteDistance = Infinity;

const workingPath: string[] = [];
const visitedCities = new Set<string>();

const calculatePathDistance = (path: string[]) => {
	let pathDistance = 0;

	for (let i = 0; i < path.length - 1; i++) {
		pathDistance +=
			cityDistances.get(path[i])?.find((city) => city.to === path[i + 1])
				?.distance ?? 0;
	}

	return pathDistance;
};

const helper = () => {
	if (workingPath.length === cities.length) {
		shortestRouteDistance = Math.min(
			shortestRouteDistance,
			calculatePathDistance([...workingPath])
		);
	} else {
		for (const city of cities) {
			if (!visitedCities.has(city)) {
				visitedCities.add(city);
				workingPath.push(city);

				helper();

				workingPath.pop();
				visitedCities.delete(city);
			}
		}
	}
};

helper();

console.log(shortestRouteDistance);
