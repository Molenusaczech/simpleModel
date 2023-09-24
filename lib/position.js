import * as THREE from 'three';
import { move } from "./controlsHandle";
import { scene, focusedObject } from "./explorer";
import { round } from "./round";

function loadPosition(uuid) {
    let mesh = scene.getObjectByProperty('uuid', uuid);

    let position = mesh.position;
    let rotation = mesh.rotation;
    let scale = mesh.scale;
    console.log(position);
    console.log(rotation);
    console.log(scale);

    document.getElementById('posx').value = round(position.x, 3);
    document.getElementById('posy').value = round(position.y, 3);
    document.getElementById('posz').value = round(position.z, 3);

    document.getElementById('rotx').value = round(rotation.x, 3);
    document.getElementById('roty').value = round(rotation.y, 3);
    document.getElementById('rotz').value = round(rotation.z, 3);

    document.getElementById('scalex').value = round(scale.x, 3);
    document.getElementById('scaley').value = round(scale.y, 3);
    document.getElementById('scalez').value = round(scale.z, 3);

}

function setPosition() {

    let position = new THREE.Vector3(
        round(document.getElementById('posx').value, 3),
        round(document.getElementById('posy').value, 3),
        round(document.getElementById('posz').value, 3)
    );
    let rotation = new THREE.Vector3(
        round(document.getElementById('rotx').value, 3),
        round(document.getElementById('roty').value, 3),
        round(document.getElementById('rotz').value, 3)
    );
    let scale = new THREE.Vector3(
        round(document.getElementById('scalex').value, 3),
        round(document.getElementById('scaley').value, 3),
        round(document.getElementById('scalez').value, 3)
    );

    let object = scene.getObjectByProperty('uuid', focusedObject);

    console.log(object);
    object.position.set(position.x, position.y, position.z);
    object.rotation.set(rotation.x, rotation.y, rotation.z);
    object.scale.set(scale.x, scale.y, scale.z);

    move.detach();
    move.attach(object);
}

function positionInit() {
    document.getElementById("posx").addEventListener('change', setPosition);
    document.getElementById("posy").addEventListener('change', setPosition);
    document.getElementById("posz").addEventListener('change', setPosition);

    document.getElementById("rotx").addEventListener('change', setPosition);
    document.getElementById("roty").addEventListener('change', setPosition);
    document.getElementById("rotz").addEventListener('change', setPosition);

    document.getElementById("scalex").addEventListener('change', setPosition);
    document.getElementById("scaley").addEventListener('change', setPosition);
    document.getElementById("scalez").addEventListener('change', setPosition);
}

export { loadPosition, setPosition, positionInit}