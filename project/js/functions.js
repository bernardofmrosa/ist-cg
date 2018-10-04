
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 65: //A
        case 97: //a
            console.log("A");
            app.scene.traverse(function(node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;

        case 69: //E
        case 101: //e
            app.scene.traverse(function (node) {
                if (node instanceof THREE.AxesHelper) {
                    node.visible = !node.visible;
                }
            });
            break;

        case 49: //1
            if (app.perspective != "top") {
                app.activateTopCamera();
            }
            break;
        case 50: //2
            if (app.perspective != "front") {
                app.activateFrontCamera();
            }
            break;
        case 51: //3
            if (app.perspective != "side") {
                app.activateSideCamera();
            }
            break;

        case 37: //left
            app.chair.userData.moveKeys.left = true;
            
            break;
        case 39: //right
            app.chair.userData.moveKeys.right = true;
            break;

        case 38: //up
            app.chair.userData.moveKeys.up = true;
            break;
        case 40: //down
            app.chair.userData.moveKeys.down = true;
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch(e.keyCode) {
    
    case 37: //left
        app.chair.userData.moveKeys.left = false;
        //app.chair.userData.speed.x = 0;
        break;
    case 39: //right
        app.chair.userData.moveKeys.right = false;
        //app.chair.userData.speed.x = 0;
        break;
    case 38: //up
        app.chair.userData.moveKeys.up = false;
        break;
    case 40: //down
        app.chair.userData.moveKeys.down = false;
        break;
    }
}