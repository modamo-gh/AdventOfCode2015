import { readFileSync } from "fs";

const document = readFileSync("input.txt", "utf8");
const json = JSON.parse(document);

let sum = 0;

type JSONvalue = number | JSONvalue[] | {[key: string]: JSONvalue}

const traverse = (element: JSONvalue) => {
	if (Array.isArray(element)) {
		for (const e of element) {
			if (typeof e === "number") {
				sum += e;
			} else if (Array.isArray(e) || typeof e === "object") {
				traverse(e);
			}
		}
	} else if (typeof element === "object") {
		const values = new Set();

		for (const e in element) {
			values.add(element[e]);
		}

		if (!values.has("red")) {
			for (const e in element) {
				if (typeof element[e] === "number") {
					sum += element[e];
				} else if (
					Array.isArray(element[e]) ||
					typeof element[e] === "object"
				) {
					traverse(element[e]);
				}
			}
		}
	}
};

traverse(json);

console.log(sum);
