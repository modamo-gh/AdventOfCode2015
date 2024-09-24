import { readFileSync, writeFileSync } from "fs";
import Warrior from "./Warrior";
import Item from "./Item";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");
const boss = new Warrior("boss");

for (const line of lines) {
	const tokens = line.split(":").map((token) => token.trim());

	switch (tokens[0]) {
		case "Hit Points":
			boss.hp = parseInt(tokens[1]);
			break;
		case "Damage":
			boss.damage = parseInt(tokens[1]);
			break;
		case "Armor":
			boss.armor = parseInt(tokens[1]);
			break;
	}
}

const me = new Warrior("me");

me.hp = 100;

const itemShop = readFileSync("itemShop.txt", "utf8");
const itemGroups = itemShop.split("\n\n");
const items: Item[] = [];

for (const itemGroup of itemGroups) {
	const lines = itemGroup.split("\n");
	const itemType = lines[0].split(/\s+/g)[0].slice(0, -1);

	const populateItemGroup = (
		itemLines: string[],
		regex: RegExp,
		type: string
	) => {
		for (const line of itemLines.slice(1)) {
			const tokens = line.split(regex);

			items.push(
				new Item(
					tokens[0],
					type,
					parseInt(tokens[1]),
					parseInt(tokens[2]),
					parseInt(tokens[3])
				)
			);
		}
	};

	switch (itemType) {
		case "Weapons":
			populateItemGroup(lines, /\s+/g, "weapon");
			break;
		case "Armor":
			populateItemGroup(lines, /\s+/g, "armor");
			break;
		case "Rings":
			populateItemGroup(lines, /\s{2,}/g, "ring");
			break;
	}
}

const allPossibleLoadouts: Item[][] = [];
const currentLoadout: Item[] = [];
const purchasedRings = new Set<string>();
const purchasedItemTypes = new Map<string, number>([
	["weapon", 0],
	["armor", 0],
	["ring", 0]
]);

const generateLayouts = () => {
	for (const item of items) {
		if (item.type === "weapon" && purchasedItemTypes.get("weapon") === 0) {
			purchasedItemTypes.set("weapon", 1);
			currentLoadout.push(item);
			allPossibleLoadouts.push([...currentLoadout]);
			generateLayouts();
			currentLoadout.pop();
			purchasedItemTypes.set("weapon", 0);
		} else if (
			item.type === "armor" &&
			purchasedItemTypes.get("weapon") === 1 &&
			purchasedItemTypes.get("armor") === 0
		) {
			purchasedItemTypes.set("armor", 1);
			currentLoadout.push(item);
			allPossibleLoadouts.push([...currentLoadout]);
			generateLayouts();
			currentLoadout.pop();
			purchasedItemTypes.set("armor", 0);
		} else if (
			item.type === "ring" &&
			purchasedItemTypes.get("weapon") === 1 &&
			purchasedItemTypes.get("ring") < 2 &&
			!purchasedRings.has(item.name)
		) {
			purchasedRings.add(item.name);
			purchasedItemTypes.set("ring", purchasedItemTypes.get("ring") + 1);
			currentLoadout.push(item);
			allPossibleLoadouts.push([...currentLoadout]);
			generateLayouts();
			currentLoadout.pop();
			purchasedItemTypes.set("ring", purchasedItemTypes.get("ring") - 1);
			purchasedRings.delete(item.name);
		}
	}
};

generateLayouts();

writeFileSync("loadouts.txt", JSON.stringify(allPossibleLoadouts));
console.log(allPossibleLoadouts.length)
