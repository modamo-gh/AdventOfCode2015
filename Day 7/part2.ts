import { readFileSync, truncate } from "fs";

const input = readFileSync("input.txt", "utf8").trim();
const instructions = input.split("\n");

const wiresConnections = new Map<string, (number | string)[]>();

for (const instruction of instructions) {
	let [connections, wire] = instruction.trim().split("->");

	connections = connections.trim();
	wire = wire.trim();

	const connectionsTokens = connections.split(" ").map((token) => {
		if (!Number.isNaN(parseInt(token))) {
			return parseInt(token);
		}

		return token.trim();
	});

	wiresConnections.set(wire, connectionsTokens);
}

const memo = new Map<string, number>();

const getSignal = (input: number | string): number => {
	if (typeof input === "number") {
		return input;
	}

	if (memo.has(input)) {
		return memo.get(input) as number;
	}

	let connections = wiresConnections.get(input) as (number | string)[];

	let result: number;

	switch (connections.length) {
		case 1:
			result = getSignal(connections[0]);
			break;
		case 2:
			result = 65536 + ~getSignal(connections[1]);
			break;
		case 3:
			switch (connections[1]) {
				case "OR":
					result =
						getSignal(connections[0]) | getSignal(connections[2]);
					break;
				case "AND":
					result =
						getSignal(connections[0]) & getSignal(connections[2]);
					break;
				case "LSHIFT":
					result =
						getSignal(connections[0]) << getSignal(connections[2]);
					break;
				case "RSHIFT":
					result =
						getSignal(connections[0]) >> getSignal(connections[2]);
					break;
				default:
					throw new Error(`Unknown operation: ${connections[1]}`);
			}
			break;
		default:
			throw new Error(
				`Unexpected connection length: ${connections.length}`
			);
	}

	memo.set(input, result);
	return result;
};

wiresConnections.set("b", [getSignal("a")]);
memo.clear();

console.log(getSignal("a"));
