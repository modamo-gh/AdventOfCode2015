import { readFileSync } from "fs";

const input = readFileSync("input.txt", "utf8").trim();

type Santa ={
    x: number;
    y: number;
}

const santa: Santa = {x: 0, y: 0}
const roboSanta: Santa = {x: 0, y: 0};

const visitedHouses = new Set<string>();
visitedHouses.add(JSON.stringify(santa));

const moveSanta = (santa: Santa, move: string) => {
    switch (move) {
        case "<":
            santa.x--;
            break;
        case "v":
            santa.y--;
            break;
        case ">":
            santa.x++;
            break;
        case "^":
            santa.y++;
            break;
    }

    visitedHouses.add(JSON.stringify(santa));
}

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        moveSanta(santa, input[i]);
    }
    else {
        moveSanta(roboSanta, input[i]);
    }
}

console.log(visitedHouses.size);
