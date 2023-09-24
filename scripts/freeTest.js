import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { CSG } from 'three-csg-ts';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

import { centerX } from '/lib/center.js';
import { createTransformControls, setMovable } from '../lib/controlsHandle';
import { addModel, initExplorer } from '../lib/explorer';

import { positionInit } from '../lib/position';

async function renderObject(scene, mainObject, renderer, camera) {


    initExplorer(scene, mainObject, renderer, camera);

    //const mainText = args.mainText;

    /*
    const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    addModel('Cube', cube, cube.uuid);*/

    /*const controls = new TransformControls(camera, renderer.domElement);
    controls.attach(cube)
    scene.add(controls)*/

    //createTransformControls(camera, renderer.domElement, cube, scene);
    /*setMovable(camera, renderer.domElement, cube, scene);

    const cube2 = new THREE.Mesh(geometry, material);
    scene.add(cube2);
    addModel('Cube2', cube2, cube2.uuid);

    //createTransformControls(camera, renderer.domElement, cube, scene);
    setMovable(camera, renderer.domElement, cube2, scene);*/

    //createCube();

    positionInit();
}

const metadata = {
    name: 'FreePlay',
    inputs: [],
    "license": "",
}

const freePlay = {
    metadata: metadata,
    renderObject: renderObject
}

export { freePlay };