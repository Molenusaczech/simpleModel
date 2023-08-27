import * as THREE from 'three';

function centerX(object, relative, invert = false) {

    let relSize = new THREE.Vector3(relative.geometry.boundingBox.max.x - relative.geometry.boundingBox.min.x, relative.geometry.boundingBox.max.y - relative.geometry.boundingBox.min.y, relative.geometry.boundingBox.max.z - relative.geometry.boundingBox.min.z);
    //console.log(relSize);

    let textSize = new THREE.Vector3(object.geometry.boundingBox.max.x - object.geometry.boundingBox.min.x, object.geometry.boundingBox.max.y - object.geometry.boundingBox.min.y, object.geometry.boundingBox.max.z - object.geometry.boundingBox.min.z);
    //console.log(textSize);

    let width = relSize.x;
    let minX = relative.geometry.boundingBox.min.x;
    let maxX = relative.geometry.boundingBox.max.x;

    let offset = (width - textSize.x) / 2;

    let finalX = minX + offset;

    if (invert) {
        finalX = maxX - offset;
    }

    object.position.set(finalX, object.position.y, object.position.z);

}

function centerY(object, relative) {

    let relSize = new THREE.Vector3(relative.geometry.boundingBox.max.x - relative.geometry.boundingBox.min.x, relative.geometry.boundingBox.max.y - relative.geometry.boundingBox.min.y, relative.geometry.boundingBox.max.z - relative.geometry.boundingBox.min.z);
    //console.log(relSize);

    let textSize = new THREE.Vector3(object.geometry.boundingBox.max.x - object.geometry.boundingBox.min.x, object.geometry.boundingBox.max.y - object.geometry.boundingBox.min.y, object.geometry.boundingBox.max.z - object.geometry.boundingBox.min.z);
    //console.log(textSize);

    let height = relSize.y;
    let minY = relative.geometry.boundingBox.min.y;

    let offset = (height - textSize.y) / 2;

    object.position.set(object.position.x, minY + offset, object.position.z);

}

export {centerX, centerY};
