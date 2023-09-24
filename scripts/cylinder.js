import * as THREE from 'three';
import { addModel, changeMesh } from '../lib/explorer';
import { focusObject, setMovable } from '../lib/controlsHandle';

import { scene, camera, renderer } from '../lib/globalVars';

import { deleteTransformControls, createOrbitControls, interactionManager } from '../lib/controlsHandle';

const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

const params = [
    {
        displayName: 'Radius Top',
        name: 'radiusTop',
        type: 'number',
        value: 0.5
    },
    {
        displayName: 'Radius Bottom',
        name: 'radiusBottom',
        type: 'number',
        value: 0.5
    },
    {
        displayName: 'Height',
        name: 'height',
        type: 'number',
        value: 1
    },
    {
        displayName: 'Radial Segments',
        name: 'radialSegments',
        type: 'number',
        value: 32
    },
    {
        displayName: 'Height Segments',
        name: 'heightSegments',
        type: 'number',
        value: 10
    },
    {
        displayName: 'Open Ended',
        name: 'openEnded',
        type: 'checkbox',
        value: false
    }
]

function createCylinder() {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinder = new THREE.Mesh(geometry, material);
    let newParams = JSON.parse(JSON.stringify(params));
    scene.add(cylinder);
    console.log(params);
    addModel('CylinderTest', cylinder, cylinder.uuid, "basic_cylinder", newParams);
    setMovable(cylinder);
}

function updateCylinder(model) {

    let old = model.mesh;
    let setting = model.settings;

    let position = old.position;
    let rotation = old.rotation;
    let scale = old.scale;
    let uuid = old.uuid;
    let material = old.material;

    deleteTransformControls();
    scene.remove(old);

    interactionManager.remove(old);

    let radiusTop = parseFloat(document.getElementById('radiusTop').value);
    let radiusBottom = parseFloat(document.getElementById('radiusBottom').value);
    let height = parseFloat(document.getElementById('height').value);
    let radialSegments = parseFloat(document.getElementById('radialSegments').value);
    let heightSegments = parseFloat(document.getElementById('heightSegments').value);
    let openEnded = document.getElementById('openEnded').checked;

    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(position.x, position.y, position.z);
    cylinder.rotation.set(rotation.x, rotation.y, rotation.z);
    cylinder.scale.set(scale.x, scale.y, scale.z);
    //cylinder.uuid = uuid; 
    scene.add(cylinder);

    //addModel('CylinderTest', cylinder, cylinder.uuid, "basic_cylinder", params);
    changeMesh(uuid, cylinder);
    setMovable(cylinder);
    deleteTransformControls();

    focusObject(cylinder);

}

const cylinder = {
    name: 'Cylinder',
    type: 'basic_cylinder',
    params: params,
    create: createCylinder,
    update: updateCylinder,
}

export { createCylinder, updateCylinder, cylinder };