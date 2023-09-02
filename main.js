import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { getScripts } from '/lib/scriptHandler.js';

import { renderOptions, renderParams } from '/lib/options.js';

import { STLExporter } from 'three/addons/exporters/STLExporter.js';

import { saveString } from '/lib/save.js';

import { round } from '/lib/round.js';

let container, stats;
const scripts = getScripts();

let camera, cameraTarget, scene, renderer, mainObject;


renderOptions();
renderParams();
init();
animate();

document.getElementById('selectScript').addEventListener('change', function () {
    renderParams();
    rerender();
});

function init() {

    container = document.createElement('div');
    //document.body.appendChild(container);

    document.getElementById('main').appendChild(container);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
    camera.position.set(3, 0.15, 3);

    cameraTarget = new THREE.Vector3(0, - 0.25, 0);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x72645b);



    // Ground

    /*const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshPhongMaterial({ color: 0xcbcbcb, specular: 0x474747 })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add(plane);

    plane.receiveShadow = true;*/

    /*loader.load('./public/text.stl', function (geometry) {

        const material = new THREE.MeshPhongMaterial({ color: 0xff9c7c, specular: 0x494949, shininess: 200 });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.geometry.computeBoundingBox();

        console.log(mesh.geometry.boundingBox);

        let middleX = (mesh.geometry.boundingBox.max.x + mesh.geometry.boundingBox.min.x) / 2 * 0.01;
        let middleY = (mesh.geometry.boundingBox.max.y + mesh.geometry.boundingBox.min.y) / 2 * 0.01;
        let middleZ = (mesh.geometry.boundingBox.max.z + mesh.geometry.boundingBox.min.z) / 2 * 0.01;

        //mesh.position.set(0, 0, 0);
        mesh.position.set(-middleX, -middleY, -middleZ);
        mesh.rotation.set(3 * Math.PI / 2, 0, 0);
        mesh.scale.set(0.01, 0.01, 0.01);

        mesh.castShadow = false;
        mesh.receiveShadow = true;

        //scene.add(mesh);

        const testCube = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1),
        )
        testCube.position.set(0, -0.05, 0);
        //scene.add(testCube);

        let brush1 = new Brush(mesh);
        let brush2 = new Brush(testCube);

        let subtract = csgEvaluator.subtract(brush1, brush2, SUBTRACTION);

        scene.add(subtract);
	

    });*/

    // Binary files

    renderObject();


    // Lights

    scene.add(new THREE.HemisphereLight(0x8d7c7c, 0x494966, 3));

    addShadowedLight(1, 1, 1, 0xffffff, 3.5);
    addShadowedLight(0.5, 1, - 1, 0xffd500, 3);
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    container.appendChild(stats.dom);

    //controls

    const controls = new OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    controls.update();

    window.addEventListener('resize', onWindowResize);

}

function renderObject() {

    let selectedIndex = document.getElementById('selectScript').value;

    if (selectedIndex == -1) return

    scripts[selectedIndex].renderObject(scene, mainObject);

}

function addShadowedLight(x, y, z, color, intensity) {

    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();
    //controls.update();
    stats.update();

}

function render() {

    const timer = Date.now() * 0.0005;

    /*camera.position.x = Math.cos( timer ) * 3;
    camera.position.z = Math.sin( timer ) * 3;*/

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}

function rerender() {
    console.log('rerender');

    console.log(mainObject);
    let object = scene.getObjectByName("mainObject");
    console.log(object);

    scene.remove(object);
    renderObject();
}

document.getElementById('rerender').addEventListener('click', function () {
    rerender();
});

document.getElementById('export').addEventListener('click', function () {
    // Instantiate an exporter
    let mesh = scene.getObjectByName("mainObject");

    mesh = new THREE.Mesh(mesh.geometry, mesh.material);

    const exporter = new STLExporter();

    // Configure export options
    const options = { binary: true }

    // Parse the input and generate the STL encoded output
    const result = exporter.parse(mesh, options);

    // Save the STL file
    saveString(result, 'text.stl');
    //rerender();
});


document.getElementById('exportPrep').addEventListener('click', function () {
    const scale = document.getElementById('scale').value;
    let mesh = scene.getObjectByName("mainObject");

    mesh.geometry.computeBoundingBox();
    mesh.scale.set(scale, scale, scale);

    let size = new THREE.Vector3(mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x, mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y, mesh.geometry.boundingBox.max.z - mesh.geometry.boundingBox.min.z);

    let sizeText = `X: ${round(size.x) * scale} Y: ${round(size.y) * scale} Z: ${round(size.z) * scale}`;
    
    document.getElementById("dimensions").innerHTML = sizeText;

    mesh.geometry.computeBoundingBox();
    mesh.updateMatrix();
    updateMatrixWorld();

    mesh = scene.getObjectByName("mainObject");
});