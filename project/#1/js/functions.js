
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
            app.setPerspective("top");
            break;
        case 50: //2
            app.setPerspective("front");
            break;
        case 51: //3
            app.setPerspective("side");
            break;
        
        case 52: //4
            app.setPerspective("new");
            break;

        case 37: //left
            app.scene.chair.userData.moveKeys.left = true;
            break;
            
        case 39: //right
            app.scene.chair.userData.moveKeys.right = true;
            break;

        case 38: //up
            app.scene.chair.userData.moveKeys.up = true;
            break;
        case 40: //down
            app.scene.chair.userData.moveKeys.down = true;
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch(e.keyCode) {
    
    case 37: //left
        app.scene.chair.userData.moveKeys.left = false;
        //app.chair.userData.speed.x = 0;
        break;
    case 39: //right
        app.scene.chair.userData.moveKeys.right = false;
        //app.chair.userData.speed.x = 0;
        break;
    case 38: //up
        app.scene.chair.userData.moveKeys.up = false;
        break;
    case 40: //down
        app.scene.chair.userData.moveKeys.down = false;
        break;
    }
}