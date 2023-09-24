import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { InteractionManager } from 'three.interactive';
import { setFocusedObject } from './explorer';
import { loadPosition } from "./position";

import { scene, renderer, camera } from './globalVars';

let orbit;
let move;
let interactionManager;
let curMode = 'camera';

function getCurMode() {
    let mode = document.getElementById('selectMode').value;

    return mode;
}

function toggleMoveVisibility(isVisible) {
    move.showX = isVisible;
    move.showY = isVisible;
    move.showZ = isVisible;
}

function setMode(mode) {

    switch (mode) {
        case 'camera':

            orbit.enabled = true;
            move.enabled = false;
            toggleMoveVisibility(false);
            curMode = 'camera';

            break;

        case 'translate':

            orbit.enabled = false;
            move.enabled = true;
            move.setMode('translate');
            toggleMoveVisibility(true);
            curMode = 'translate';

            break;

        case 'rotate':

            orbit.enabled = false;
            move.enabled = true;
            move.setMode('rotate');
            toggleMoveVisibility(true);
            curMode = 'rotate';

            break;

        case 'scale':

            orbit.enabled = false;
            move.enabled = true;
            move.setMode('scale');
            toggleMoveVisibility(true);
            curMode = 'scale';

            break;

    }


}

function initControls(camera, renderer) {
    //document.getElementById('selectMode').addEventListener('change', updateControls);
    document.getElementById('cameraMode').addEventListener('click', () => { setMode('camera') });
    document.getElementById('translateMode').addEventListener('click', () => { setMode('translate') });
    document.getElementById('rotateMode').addEventListener('click', () => { setMode('rotate') });
    document.getElementById('scaleMode').addEventListener('click', () => { setMode('scale') });

    interactionManager = new InteractionManager(
        renderer,
        camera,
        renderer.domElement
    );
    interactionManager.update();
}

function createOrbitControls(camera, domElement) {
    orbit = new OrbitControls(camera, domElement);
    orbit.update();
}

function createTransformControls(object) {
    move = new TransformControls(camera, renderer.domElement);
    move.attach(object);
    scene.add(move);
    setMode(curMode);

    move.addEventListener('mouseUp', function (event) {

        console.log('mouseUp');
        loadPosition(object.uuid, scene);

    });
}

function deleteTransformControls() {
    if (move == undefined) return;
    move.detach();
    move.dispose();
    scene.remove(move);
}

function updateControls() {
    interactionManager.update();
    //if (move != undefined) move.update();
}

function setMovable(object) {
    interactionManager.add(object);

    console.log(object);

    object.addEventListener('click', (event) => {
        focusObject(object);
    });

}

function focusObject(object) {
    setFocusedObject(object.uuid);
    deleteTransformControls();
    createTransformControls(object);
}

export {
    createOrbitControls,
    initControls,
    createTransformControls,
    deleteTransformControls,
    setMovable,
    updateControls,
    focusObject,
    move,
    interactionManager
};