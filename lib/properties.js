import { setMovable } from "./controlsHandle";
import { curType, focusedObject, models } from "./explorer";
import { scripts } from "./scriptHandler";
import { focusObject, deleteTransformControls, createOrbitControls} from "./controlsHandle";
import { scene } from "./globalVars";


function updateModelSettings(model) {
    let settings = model.settings;

    settings.forEach(function (setting) {
        let input = document.getElementById(setting.name);
        setting.value = input.value;
    });

    model.settings = settings;
}

function rerenderObject() {
    console.log(models);
    let model = models.find(model => model.uuid == focusedObject);
    let script = scripts.find(script => script.type == curType);

    /*deleteTransformControls();
    scene.remove(model.mesh);

    interactionManager.remove(model.mesh);*/

    console.log(models);
    updateModelSettings(model);
    console.log(models);


    script.update(model);

    /*let newModel = scene.getObjectByProperty('uuid', focusedObject);
    console.log(newModel);

    deleteTransformControls();
    createOrbitControls(newModel);

    focusObject(newModel);*/
}

function renderProperties(settings = []) {
    document.getElementById('properties').innerHTML = '';

    settings.forEach(function (setting) {
        let label = document.createElement('label');
        label.innerHTML = setting.name;
        document.getElementById('properties').appendChild(label);

        let input = document.createElement('input');
        input.type = setting.type;
        input.value = setting.value;
        input.id = setting.name;
        input.addEventListener('change', rerenderObject);

        document.getElementById('properties').appendChild(input);
    });
}

export { renderProperties }