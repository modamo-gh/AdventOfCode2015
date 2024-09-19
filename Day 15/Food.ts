export default class Food {
	[property: string]: number;
	
	capacity: number;
	durability: number;
	flavor: number;
	texture: number;
	calories: number;

	constructor(
		capacity = 0,
		durability = 0,
		flavor = 0,
		texture = 0,
		calories = 0
	) {
		this.capacity = capacity;
		this.durability = durability;
		this.flavor = flavor;
		this.texture = texture;
		this.calories = calories;
	}
}
