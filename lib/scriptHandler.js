import { dogStamp } from "../scripts/dog";
import { freePlay } from "../scripts/freeTest";
import { cylinder } from "../scripts/cylinder";
import { cube } from "../scripts/cube";
import { dog } from "../scripts/newdog";
import { tokenHolder } from "../scripts/newTokenHolder";
import { toothpaste } from "../scripts/toothpaste";

const scriptsOld = [
    freePlay
]

function getScripts() {
    return scriptsOld;
}

const scripts = [
    cube,
    cylinder,
    dog,
    tokenHolder,
    toothpaste
];

export { getScripts, scripts };