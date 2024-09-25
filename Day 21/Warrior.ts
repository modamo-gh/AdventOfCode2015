import Loadout from "./Loadout";

export default class Warrior {
	name: string;
	hp: number;
	damage: number;
	armor: number;
	originalDamage: number;
	originalHP: number;
	originalArmor: number;
	loadout: Loadout;

	constructor(
		name: string,
		hp: number = 0,
		damage: number = 0,
		armor: number = 0
	) {
		this.name = name;
		this.originalArmor = armor;
		this.originalDamage = damage;
		this.originalHP = hp;
		this.hp = this.originalHP;
		this.damage = this.originalDamage;
		this.armor = this.originalArmor;
		this.loadout = new Loadout([]);
	}

	attack = (enemy: Warrior) => {
		const damageDealt = this.damage - enemy.armor;
		damageDealt > 1 ? (enemy.hp -= damageDealt) : enemy.hp--;
	};

	equipLoadout = (loadout: Loadout) => {
		for (const item of loadout.items) {
			this.armor += item.armor;
			this.damage += item.damage;
		}
	};

	reset = () => {
		this.armor = this.originalArmor;
		this.damage = this.originalDamage;
		this.hp = this.originalHP;
	};

	winsBattle = (enemy: Warrior) => {
		let isMyTurn = true;

		while (this.hp > 0 && enemy.hp > 0) {
			if (isMyTurn) {
				this.attack(enemy);
				isMyTurn = false;
			} else {
				enemy.attack(this);
				isMyTurn = true;
			}
		}

		return this.hp > enemy.hp;
	};
}
