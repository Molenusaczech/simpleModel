import { getScripts } from '/lib/scriptHandler.js';
const scripts = getScripts();

function renderOptions() {

    let selectHtml = '<option value="-1">Select a script</option>';

    let index = 0;
    scripts.forEach(script => {
        selectHtml += `<option value="${index}">${script.metadata.name}</option>`;
        index++;
    });

    document.getElementById('selectScript').innerHTML = selectHtml;

}


function renderParams() {
    let index = document.getElementById('selectScript').value;

    if (index == -1) return

    let script = scripts[index];

    let inputs = script.metadata.inputs;
    let html = '';

    inputs.forEach(input => {
        html += `<div class="input"><label>${input.name}</label><input type="text" id="${input.name}" value="${input.value}"></div>`;
    });

    document.getElementById('params').innerHTML = html;
}

export { renderOptions, renderParams };