import Item from "./Item";

export default class Warrior {
	name: string;
	hp: number;
	damage: number;
	armor: number;
    loadout: Item[]

	constructor(name: string, hp: number = 0, damage: number = 0, armor: number = 0) {
		this.name = name;
		this.hp = hp;
		this.damage = damage;
		this.armor = armor;
        this.loadout = [];
	}
}
