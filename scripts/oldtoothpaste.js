import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { CSG } from 'three-csg-ts';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { centerX } from '/lib/center.js';

async function renderObject(scene, mainObject, renderer, camera) {

    //const mainText = args.mainText;
    const mainText = document.getElementById('mainText').value;
    const fontloader = new FontLoader();

    const loader = new STLLoader();

    const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

    loader.load('/models/toothBlend.stl', function (geometry) {

        fontloader.load('/fonts/Roboto_black.json', function (font) {

            let mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(0, 0, 0);
            //mesh.rotation.set(- Math.PI / 2, 0, 0);
            //mesh.scale.set(0.01, 0.01, 0.01);

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.updateMatrix();
            mesh.geometry.computeBoundingBox();
            // text1

            const textGeometry = new TextGeometry(mainText, {
                font: font,
                size: 6,
                height: 1.5, // 1.5
            });

            console.log(textGeometry);



            let textMesh = new THREE.Mesh(textGeometry, material);

            textMesh.updateMatrix();

            textMesh.position.set(0, 0, 0);

            textMesh.geometry.computeBoundingBox();

            //let textMiddleX = (textMesh.geometry.boundingBox.max.x + textMesh.geometry.boundingBox.min.x) / 2 * 0.01;

            //textMesh.position.set(-4, 4, 1);
            textMesh.position.set(0, 7, 4.9);
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

            subRes.name = "mainObject";

            scene.add(subRes);

            mainObject = subRes.uuid;
        });
    });
}

const metadata = {
    name: 'Toothpaste helper',
    inputs: [
        {
            name: 'mainText',
            type: 'text',
            label: 'Main Text',
            value: 'Example'
        }
    ],
    "license": "CC-BY 4.0 https://www.printables.com/cs/model/26897-toothpaste-squeezer",
}

const toothpaste = {
    metadata: metadata,
    renderObject: renderObject
}

export { toothpaste };