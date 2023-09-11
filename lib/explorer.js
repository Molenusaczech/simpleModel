import { focusObject } from "./controlsHandle";
import { loadPosition } from "./position";

let models = [];
let focusedObject;

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
        }

        //html += element.outerHTML;
        //html += '<li title="'+model.uuid+'">' + model.name + '</li>';
        document.getElementById('modelList').appendChild(element);

        document.querySelector('[title="'+model.uuid+'"]').addEventListener('click', function () {
            console.log('click');
            focusObject(camera, renderer.domElement, model.mesh, scene);
        });
    });
}

function addModel(name, mesh, uuid) {

    models.push({
        name: name,
        mesh: mesh,
        uuid: uuid
    });
    
    updateModelList();
}

function setFocusedObject(uuid) {
    focusedObject = uuid;
    updateModelList();
    //loadPosition(uuid, scene);
}

export { addModel, initExplorer, setFocusedObject, focusedObject, scene }