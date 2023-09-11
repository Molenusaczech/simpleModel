import { dogStamp } from "../scripts/dog";
import { toothpaste } from "../scripts/toothpaste";
import { tokenHolder } from "../scripts/tokenHolder";
import { freePlay } from "../scripts/freeTest";

const scripts = [
    dogStamp,
    toothpaste,
    tokenHolder,
    freePlay
]

function getScripts() {
    return scripts;
}

export { getScripts };