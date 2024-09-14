import {createHash} from "node:crypto";
import { readFileSync } from "node:fs";

const secretKey = readFileSync("input.txt", "utf8");

let count = 1;

while(true){
    const hash = createHash("md5");

    hash.update(secretKey + count);

    if(hash.digest("hex").startsWith("000000")){
        console.log(secretKey + count);
        break;
    }

    count++;
}