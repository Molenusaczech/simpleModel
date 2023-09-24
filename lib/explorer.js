import { focusObject } from "./controlsHandle";
import { loadPosition } from "./position";
import { renderProperties } from "./properties";

let models = [];
let focusedObject;
let curType;

let scene, mainObject, renderer, camera;

function initExplorer(_scene, _mainObject, _renderer, _camera) {
    scene = _scene;
    mainObject = _mainObject;
    renderer = _renderer;
    camera = _camera;
}

function updateModelList() {
    document.getElementById('modelList').innerHTML = '';
    models.forEach(function (model) {
        let element = document.createElement('li');
        element.title = model.uuid;
        element.innerHTML = model.name;
        element.dataset.uuid = model.uuid;
        element.classList.add('explorerModel');

        if (model.uuid == focusedObject) {
            element.classList.add('explorerModelSelected');
            console.log('selected');
            console.log(model.settings);
            renderProperties(model.settings);
            curType = model.type;
        }

        //html += element.outerHTML;
        //html += '<li title="'+model.uuid+'">' + model.name + '</li>';
        document.getElementById('modelList').appendChild(element);

        document.querySelector('[title="'+model.uuid+'"]').addEventListener('click', function () {
            console.log('click');
            focusObject(model.mesh);
        });
    });
}

function addModel(name, mesh, uuid, type, settings = []) {

    console.log('addModel');
    console.log(arguments);

    models.push({
        name: name,
        mesh: mesh,
        uuid: uuid,
        settings: settings,
        type: type
    });
    
    updateModelList();

    console.log(models);
}

function changeMesh(uuid, mesh) {
    let model = models.find(model => model.uuid == uuid);
    model.mesh = mesh;
    model.uuid = mesh.uuid;
    updateModelList();
}

function setFocusedObject(uuid) {
    focusedObject = uuid;
    updateModelList();
    //loadPosition(uuid, scene);
}

export { 
    addModel, 
    initExplorer, 
    setFocusedObject, 
    focusedObject, 
    scene, 
    curType, 
    models,
changeMesh }