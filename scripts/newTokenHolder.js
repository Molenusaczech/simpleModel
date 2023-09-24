import * as THREE from 'three';
import { addModel, changeMesh } from '../lib/explorer';
import { focusObject, setMovable } from '../lib/controlsHandle';

import { scene, camera, renderer } from '../lib/globalVars';

import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { deleteTransformControls, createOrbitControls, interactionManager } from '../lib/controlsHandle';

import { centerX } from '../lib/center.js';
import { CSG } from 'three-csg-ts';

import stl from '../models/tokenHolder.stl';
import fontJson from '../fonts/Roboto_black.json?url';

const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

const fontLoader = new FontLoader();
const stlLoader = new STLLoader();

const params = [
    {
        displayName: 'Main Text',
        name: 'mainText',
        type: 'text',
        value: 'Example'
    }
]

function genModel(geometry, font, mainText) {
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(Math.PI, 0, Math.PI);
    //mesh.scale.set(0.01, 0.01, 0.01);

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    mesh.updateMatrix();
    mesh.geometry.computeBoundingBox();
    // text1

    const textGeometry = new TextGeometry(mainText, {
        font: font,
        size: 4,
        height: 1.5, // 1.5
    });

    console.log(textGeometry);



    let textMesh = new THREE.Mesh(textGeometry, material);

    textMesh.updateMatrix();

    textMesh.position.set(0, 0, 0);

    textMesh.geometry.computeBoundingBox();

    //let textMiddleX = (textMesh.geometry.boundingBox.max.x + textMesh.geometry.boundingBox.min.x) / 2 * 0.01;

    //textMesh.position.set(-4, 4, 1);
    textMesh.position.set(0, 4, 2);
    //textMesh.position.set(-10, 4, 2.5);

    centerX(textMesh, mesh);

    console.log(textMesh.geometry.boundingBox);
    console.log(mesh.geometry.boundingBox);


    mesh.updateMatrix();
    textMesh.updateMatrix();

    console.log(mesh);
    console.log(textMesh);

    //scene.add(textMesh);
    //scene.add(mesh);

    // Perform CSG operations
    // The result is a THREE.Mesh that you can add to your scene...
    let subRes = CSG.union(mesh, textMesh);

    subRes.updateMatrix();
    subRes.scale.set(0.01, 0.01, 0.01);

    //  text subtract

    //scene.add(subRes);

    return subRes;
}

function create() {
    /*const cylinder = new THREE.Mesh(stl, material);
    let newParams = JSON.parse(JSON.stringify(params));
    scene.add(cylinder);
    console.log(params);
    addModel('CylinderTest', cylinder, cylinder.uuid, "basic_cylinder", newParams);
    setMovable(cylinder);*/

    let newParams = JSON.parse(JSON.stringify(params));

    stlLoader.load(stl, function (geometry) {

        fontLoader.load(fontJson, function (font) {


            let subRes = genModel(geometry, font, "Example");

            console.log(subRes.uuid);

            //subRes.name = "mainObject";

            scene.add(subRes);

            //mainObject = subRes.uuid;

            addModel('TokenHolder', subRes, subRes.uuid, "mole_tokenholder", newParams);
            setMovable(subRes);

        });
    });
}

function update(model) {

    let mainText = document.getElementById("mainText").value;

    let old = model.mesh;
    let setting = model.settings;

    let position = old.position;
    let rotation = old.rotation;
    let scale = old.scale;
    let uuid = old.uuid;

    deleteTransformControls();
    scene.remove(old);

    interactionManager.remove(old);


    stlLoader.load(stl, function (geometry) {

        fontLoader.load(fontJson, function (font) {


            let subRes = genModel(geometry, font, mainText);

            subRes.position.set(position.x, position.y, position.z);
            subRes.rotation.set(rotation.x, rotation.y, rotation.z);
            subRes.scale.set(scale.x, scale.y, scale.z);


            scene.add(subRes);

            //mainObject = subRes.uuid;

            /*addModel('DogStamp', subRes, subRes.uuid, "mole_dogstamp", newParams);
            setMovable(subRes);*/

            changeMesh(uuid, subRes);
            setMovable(subRes);
            deleteTransformControls();

            focusObject(subRes);

        });
    });

    /*cylinder.position.set(position.x, position.y, position.z);
    cylinder.rotation.set(rotation.x, rotation.y, rotation.z);
    cylinder.scale.set(scale.x, scale.y, scale.z);
    //cylinder.uuid = uuid; 
    scene.add(cylinder);*/

    //addModel('CylinderTest', cylinder, cylinder.uuid, "basic_cylinder", params);
    /*changeMesh(uuid, cylinder);
    setMovable(cylinder);
    deleteTransformControls();

    focusObject(cylinder);*/

}

const tokenHolder = {
    name: 'Token Holder',
    type: 'mole_tokenholder',
    params: params,
    create: create,
    update: update,
}

export { tokenHolder };