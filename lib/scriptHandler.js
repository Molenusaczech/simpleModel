import { dogStamp } from "../scripts/dog";
import { toothpaste } from "../scripts/toothpaste";

const scripts = [
    dogStamp,
    toothpaste
]

function getScripts() {
    return scripts;
}

export { getScripts };