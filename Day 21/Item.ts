export default class Item {
	name: string;
    type: string;
	cost: number;
	damage: number;
	armor: number;

	constructor(name: string, type: string, cost: number, damage: number, armor: number) {
		this.name = name;
		this.cost = cost;
		this.damage = damage;
		this.armor = armor;
        this.type = type;
	}
}
