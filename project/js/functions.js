
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 65: //A
        case 97: //a
            scene.traverse(function(node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;

        case 69: //E
        case 101: //e
            scene.traverse(function (node) {
                if (node instanceof THREE.AxesHelper) {
                    node.visible = !node.visible;
                }
            });
            break;

        case 49: //1
            if (perspective != "top") {
                activateTopCamera();
            }
            break;
        case 50: //2
            if (perspective != "front") {
                activateFrontCamera();
            }
            break;
        case 51: //3
            if (perspective != "side") {
                activateSideCamera();
            }
            break;
    }
}

function onKeyPress(e) {
    'use strict';
    var mov = 2;
    switch (e.keyCode) {
        case 37: //left
            if (perspective == "front") {
                table.translateX(-mov);
            } else if (perspective == "top") {
                table.translateX(-mov);
            } else {
                table.translateZ(mov);
            }

            break;

        case 38: //up
            if (perspective == "front") {
                table.translateZ(-mov);
            } else if (perspective == "top") {
                table.translateZ(-mov);
            } else {
                table.translateX(-mov);
            }
            break;

        case 39: //right
            if (perspective == "front") {
                table.translateX(mov);
            } else if (perspective == "top") {
                table.translateX(mov);
            } else {
                table.translateZ(-mov);
            }
            break;

        case 40: //down
            if (perspective == "front") {
                table.translateZ(mov);
            } else if (perspective == "top") {
                table.translateZ(mov);
            } else {
                table.translateX(mov);
            }
            break;
    }
}