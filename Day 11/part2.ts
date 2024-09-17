import { readFileSync } from "fs";

let password = readFileSync("input.txt", "utf8");

const incrementPassword = (password: string) => {
	let pointer = password.length - 1;

	while (pointer >= 0) {
		let currentCharacterUnicode = password.charCodeAt(pointer);

		if (currentCharacterUnicode + 1 <= 122) {
			password =
				password.slice(0, pointer) +
				String.fromCharCode(currentCharacterUnicode + 1) +
				password.slice(pointer + 1);

			return password;
		}

		password =
			password.slice(0, pointer) + "a" + password.slice(pointer + 1);

		pointer--;
	}

	return password;
};

const hasIncreasingStraight = (password: string) => {
	const regex = /([a-z])(?!\1)([a-z])(?!\1)(?!\2)([a-z])/g;
	const matches = password.matchAll(regex);

	for (const match of matches) {
		if (
			match[2].charCodeAt(0) - match[1].charCodeAt(0) === 1 &&
			match[3].charCodeAt(0) - match[2].charCodeAt(0) === 1
		) {
			return true;
		}
	}

	return false;
};

const hasIOorL = (password: string) => {
	if (password.match(/[iol]/g)) {
		return true;
	}

	return false;
};

const hasTwoDifferentPairs = (password: string) => {
	if (password.match(/\w*([a-z])\1\w*([a-z])(?!\1)\2\w*/g)) {
		return true;
	}

	return false;
};

const getNextPassword = (password: string) => {
	while (true) {
		if (
			!hasIncreasingStraight(password) ||
			hasIOorL(password) ||
			!hasTwoDifferentPairs(password)
		) {
			password = incrementPassword(password);
			continue;
		}

		return password;
	}
};

console.time();
console.log(getNextPassword(incrementPassword(password)));
console.timeEnd();
