import {readFileSync } from "fs";

const document = readFileSync("input.txt", "utf8");

const matches = document.matchAll(/(-?\d+)/g);

let sum = 0;

for(const match of matches){
    sum += parseInt(match[0])
}

console.time()
console.log(sum);
console.timeEnd()