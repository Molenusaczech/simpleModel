import * as THREE from 'three';
import { addModel } from './explorer';
import { setMovable } from './controlsHandle';

import { scene, camera, renderer } from './globalVars';

import { scripts } from './scriptHandler';

const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });


function createModel() {
    let model = document.getElementById('selectModel').value;
    let script = scripts.find(script => script.name == model);
    script.create();
}

function initModelAdd() {

    let html = '<select>';

    scripts.forEach(script => {
        html += `<option value="${script.name}">${script.name}</option>`;
    });
    html += '</select>';

    document.getElementById('selectModel').innerHTML = html;
    document.getElementById('addModel').addEventListener('click', createModel);
}

export { initModelAdd };