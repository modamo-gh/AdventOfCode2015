import Item from "./Item";

export default class Loadout {
	cost: number;
    items: Item[];

	constructor(items: Item[]) {
        this.items = [...items];
		this.cost = items.map((item) => item.cost).reduce((p, c) => p + c, 0);
	}
}
