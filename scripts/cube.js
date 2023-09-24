import * as THREE from 'three';
import { addModel, changeMesh } from '../lib/explorer';
import { focusObject, setMovable } from '../lib/controlsHandle';

import { scene, camera, renderer } from '../lib/globalVars';

import { deleteTransformControls, createOrbitControls, interactionManager } from '../lib/controlsHandle';

const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

const params = []

function createCube() {
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    let newParams = JSON.parse(JSON.stringify(params));
    scene.add(cube);
    console.log(params);
    addModel('CubeTest', cube, cube.uuid, "basic_cube", newParams);
    setMovable(cube);
}

function updateCube(model) {

    let old = model.mesh;

    let position = old.position;
    let rotation = old.rotation;
    let scale = old.scale;
    let uuid = old.uuid;
    let material = old.material;

    deleteTransformControls();
    scene.remove(old);

    interactionManager.remove(old);

    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    cube.rotation.set(rotation.x, rotation.y, rotation.z);
    cube.scale.set(scale.x, scale.y, scale.z);
    scene.add(cube);

    changeMesh(uuid, cube);
    setMovable(cube);
    deleteTransformControls();

    focusObject(cube);

}

const cube = {
    name: 'Cube',
    type: 'basic_cube',
    params: params,
    create: createCube,
    update: updateCube,
}

export { createCube, updateCube, cube };