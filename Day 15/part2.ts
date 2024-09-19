import { readFileSync } from "fs";
import Food from "./Food";

const input = readFileSync("input.txt", "utf8").trim();

const ingredients = new Map<string, Food>();

const lines = input.split("\n");

for (const line of lines) {
	const tokens = line.split(" ");

	for (let i = 0; i < tokens.length; i++) {
		tokens[i] = tokens[i].replace(/[^a-zA-Z\d-]/g, "");
	}

	const properties = new Food(
		parseInt(tokens[2]),
		parseInt(tokens[4]),
		parseInt(tokens[6]),
		parseInt(tokens[8]),
		parseInt(tokens[10])
	);

	ingredients.set(tokens[0], properties);
}

const ingredientNames = [...ingredients.keys()];

let remainingVolume = 100;
const currentIngredientAmounts: number[] = [];
let currentCookie = new Food();

let currentCookieScore = 1;

const helper = (iteration: number) => {
	if (iteration === ingredientNames.length - 1) {
		currentIngredientAmounts.push(remainingVolume);

		for (let i = 0; i < ingredientNames.length; i++) {
			const properties = ingredients.get(ingredientNames[i]);

			for (const property in properties) {
				currentCookie[property] +=
					currentIngredientAmounts[i] * properties[property];
			}
		}

		for (const property in currentCookie) {
			if (property !== "calories") {
				if (currentCookie[property] < 0) {
					currentCookie[property] = 0;
				}

				currentCookieScore *= currentCookie[property];
			}
		}

		if (currentCookie.calories === 500) {
			highestCookieScore = Math.max(
				currentCookieScore,
				highestCookieScore
			);
		}

		currentCookieScore = 1;
		currentCookie = new Food();

		currentIngredientAmounts.pop();
		return;
	}

	for (let i = remainingVolume; i >= 0; i--) {
		currentIngredientAmounts.push(i);
		remainingVolume -= i;
		helper(iteration + 1);
		remainingVolume += i;
		currentIngredientAmounts.pop();
	}
};

let highestCookieScore = -Infinity;

helper(0);

console.log(highestCookieScore);
