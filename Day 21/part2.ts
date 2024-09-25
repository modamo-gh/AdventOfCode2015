import { readFileSync } from "fs";
import Warrior from "./Warrior";
import Item from "./Item";
import Loadout from "./Loadout";

const input = readFileSync("input.txt", "utf-8");

const lines = input.split("\n");
const boss = new Warrior("boss");

for (const line of lines) {
	const tokens = line.split(":").map((token) => token.trim());

	switch (tokens[0]) {
		case "Hit Points":
			boss.originalHP = parseInt(tokens[1]);
			boss.hp = boss.originalHP;
			break;
		case "Damage":
			boss.originalDamage = parseInt(tokens[1]);
			boss.damage = boss.originalDamage;
			break;
		case "Armor":
			boss.originalArmor = parseInt(tokens[1]);
			boss.armor = boss.originalArmor;
			break;
	}
}

const me = new Warrior("me", 100);

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

const allPossibleLoadouts: Loadout[] = [];
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
			allPossibleLoadouts.push(new Loadout([...currentLoadout]));
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
			allPossibleLoadouts.push(new Loadout([...currentLoadout]));
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
			allPossibleLoadouts.push(new Loadout([...currentLoadout]));
			generateLayouts();
			currentLoadout.pop();
			purchasedItemTypes.set("ring", purchasedItemTypes.get("ring") - 1);
			purchasedRings.delete(item.name);
		}
	}
};

generateLayouts();

let highestLoseableCost = -Infinity;

for (const loadout of allPossibleLoadouts) {
	me.equipLoadout(loadout);

	if (!me.winsBattle(boss)) {
		highestLoseableCost = Math.max(loadout.cost, highestLoseableCost);
	}

	me.reset();
	boss.reset();
}

console.log(highestLoseableCost);
