import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { CSG } from 'three-csg-ts';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { centerX } from '/lib/center.js';

async function renderObject(scene, mainObject) {

    //const mainText = args.mainText;
    const mainText = document.getElementById('mainText').value;
    const secondatyText = document.getElementById('secondaryText').value;
    const fontloader = new FontLoader();

    const loader = new STLLoader();

    const material = new THREE.MeshPhongMaterial({ color: 0xd5d5d5, specular: 0x494949, shininess: 200 });

    loader.load('./models/kost.stl', function (geometry) {

        fontloader.load('fonts/Roboto_black.json', function (font) {

            let mesh = new THREE.Mesh(geometry, material);

            mesh.geometry.computeBoundingBox();

            console.log(mesh.geometry.boundingBox);

            let size = new THREE.Vector3(mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x, mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y, mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z);
            console.log(size);

            mesh.castShadow = false;
            mesh.receiveShadow = true;

            //scene.add(mesh);

            // text1

            const textGeometry = new TextGeometry(mainText, {
                font: font,
                size: 10,
                height: 1,
            });

            console.log(textGeometry);

            mesh.position.set(0, 0, 0);



            let textMesh = new THREE.Mesh(textGeometry);

            textMesh.position.set(0, 1, 0);

            textMesh.geometry.computeBoundingBox();

            //let textMiddleX = (textMesh.geometry.boundingBox.max.x + textMesh.geometry.boundingBox.min.x) / 2 * 0.01;

            let textMinX = -10;
            let textMaxX = 60;

            let width = textMaxX - textMinX;

            let textSize = textMesh.geometry.boundingBox.max.x - textMesh.geometry.boundingBox.min.x;
            console.log(textSize);

            let offset = (width - textSize) / 2;

            //textMesh.position.set(-4, 4, 1);
            textMesh.position.set(0, 4, 2.5);
            //textMesh.position.set(-10, 4, 2.5);

            centerX(textMesh, mesh);

            console.log(textMesh);
            //scene.add(textMesh);


            //scene.add(testCube);

            //console.log(mesh.geometry);

            //geometry.computeVertexNormals();

            //mesh = new THREE.Mesh(geometry, material);
            //console.log(mesh);


            mesh.updateMatrix();
            textMesh.updateMatrix();

            // Perform CSG operations
            // The result is a THREE.Mesh that you can add to your scene...
            let subRes = CSG.union(mesh, textMesh);

            //  text subtract


            const textGeometry2 = new TextGeometry(secondatyText, {
                font: font,
                size: 5,
                height: 1,
            });

            mesh.position.set(0, 0, 0);



            let textSubtractMesh = new THREE.Mesh(textGeometry2);

            textSubtractMesh.geometry.computeBoundingBox();

            textSubtractMesh.position.set(0, 5, 1);

            centerX(textSubtractMesh, mesh, true);


            textSubtractMesh.rotation.set(0, Math.PI, 0);

            textSubtractMesh.updateMatrix();

            //scene.add(textSubtractMesh);

            subRes = CSG.subtract(subRes, textSubtractMesh);


            subRes.scale.set(0.01, 0.01, 0.01);

            
            console.log(subRes.uuid);

            subRes.name = "mainObject";

            scene.add(subRes);

            mainObject = subRes.uuid;

        });
    });
}

const metadata = {
    name: 'Dog Stamp',
    inputs: [
        {
            name: 'mainText',
            type: 'text',
            label: 'Main Text',
            value: 'Example'
        },
        {
            name: 'secondaryText',
            type: 'text',
            label: 'Secondary Text',
            value: '+420 123 456 789'        
        }
    ]
}

const dogStamp = {
    metadata: metadata,
    renderObject: renderObject
}

export { dogStamp };