/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

//var ball;

var table,ground;



var base, pipe, shade, light;

var cube;

function addBase(obj, x, y, z) {
  'use strict';

  geometry = new THREE.ConeGeometry(5, 2.5, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addPipe(obj, x, y, z) {
  'use strict';

  geometry = new THREE.CylinderGeometry(0.5, 0.5, 40, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function addShade(obj, x, y, z) {
  'use strict';

   geometry = new THREE.CylinderGeometry(5, 10, 20, 32);
   mesh = new THREE.Mesh(geometry, material);
   mesh.position.set(x, y, z);
   mesh.rotateZ(Math.PI / 4);


   obj.add(mesh);
}

function addLight(obj, x, y, z) {
  'use strict';

  geometry = new THREE.SphereGeometry(2.5, 32, 32);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  obj.add(mesh);
}

function createLamp(x, y, z) {
  'use strict';

  var lamp = new THREE.Object3D();

  material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});

  addShade(lamp, x, y + 30, z);
  addLight(lamp, x, y + 30, z);
  addPipe(lamp, x, y, z);
  addBase(lamp, x, y-20, z);

  scene.add(lamp);
  lamp.position.set(-25,21.25,0);


}



function addTableLeg(obj, x, y, z) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: 0xd66203 });
    geometry = new THREE.CylinderGeometry(2, 2, 21,10,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(70, 4, 40);
    material = new THREE.MeshBasicMaterial({color: 0x8d4306 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

/*function createBall(x, y, z) {
    'use strict';

    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0 };

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);

    ball.add(mesh);
    ball.position.set(x, y, z);

    scene.add(ball);
}*/


function createTable(x, y, z) {
    'use strict';

    table = new THREE.Object3D();

    addTableTop(table, 0,15, 0);
    addTableLeg(table, -20,6, -15);
    addTableLeg(table, -20, 6, 15);
    addTableLeg(table, 20, 6, 15);
    addTableLeg(table, 20, 6, -15);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;

}

function createGround(x, y, z){
    ground = new THREE.Object3D();

    geometry = new THREE.CubeGeometry(500, 500, 2);
    material = new THREE.MeshBasicMaterial({color: 0xEEEEE});
    mesh = new THREE.Mesh(geometry, material);
    //mesh.position.set(x, y, z);

    ground.add(mesh);
    ground.position.x = x;
    ground.position.y = y;
    ground.position.z = z;

    mesh.rotation.x = Math.PI / 2;

    scene.add(ground);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.userData = {perspective : "top"};
    scene.add(new THREE.AxisHelper(100));

    geometry = new THREE.CubeGeometry(3, 3, 3);
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,1.5,0);
    scene.add(cube);

    createGround(0,-1,0);
    createTable(0, 0, 0);
    createLamp(-25, 0, 0);
    //createBall(0, 0, 15);
}

function activateTopCamera() {
    'use strict';
    /*var viewSize = 50;
    var aspectRatio = window.innerWidth / window.innerHeight;

    camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2,
        -viewSize / 2, -10, 20);
    camera.position.x = 50;
    camera.position.y = 60;
    camera.position.z = 50;*/

    camera = new THREE.OrthographicCamera(-98, 98, 60,
        -60, -200, 200);
    camera.position.x = 30;
    camera.position.y = 130;
    camera.position.z = 110;
    scene.userData.perspective = "top";
    camera.lookAt(scene.position);
}

function activateFrontCamera() {
    'use strict';
    /*var viewSize = 50;
    var aspectRatio = window.innerWidth / window.innerHeight;

    camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2,
        -viewSize / 2, -10, 20);
    camera.position.x = 50;
    camera.position.y = 60;
    camera.position.z = 50;*/

    camera = new THREE.OrthographicCamera(-98, 98, 60,
        -60, -200, 200);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    scene.userData.perspective = "front";
    camera.lookAt(scene.position);
}

function activateSideCamera() {
    'use strict';

    camera = new THREE.OrthographicCamera(-98, 98, 60,-60, -200, 200);
    camera.position.x = 70;
    camera.position.y = 0;
    camera.position.z = 0;
    scene.userData.perspective = "side";
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;

    case 49://1
        if(scene.userData.perspective != "top"){
            activateTopCamera();
        }
        break;
    case 50://2
        if (scene.userData.perspective != "front"){
            activateFrontCamera();
        }
        break;
    case 51://3
        if (scene.userData.perspective != "side") {
            activateSideCamera();
        }
        break;
    }
}


function onKeyPress(e) {
    'use strict';
    var mov = 2;
    switch (e.keyCode) {
    case 37://left
        if (scene.userData.perspective == "front") {
            table.translateX(-mov);
        }
        else if (scene.userData.perspective == "top") {
            table.translateX(-mov);
        }
        else {
            table.translateZ(mov);
        }

        break;

    case 38://up
        if (scene.userData.perspective == "front") {
            table.translateZ(-mov);
        }
        else if (scene.userData.perspective == "top") {
            table.translateZ(-mov);
        }
        else {
            table.translateX(-mov);
        }
        break;

    case 39://right
        if (scene.userData.perspective == "front") {
            table.translateX(mov);
        }
        else if (scene.userData.perspective == "top") {
            table.translateX(mov);
        }
        else {
            table.translateZ(-mov);
        }
        break;

    case 40://down
        if (scene.userData.perspective == "front") {
            table.translateZ(mov);
        }
        else if (scene.userData.perspective == "top") {
            table.translateZ(mov);
        }
        else {
            table.translateX(mov);
        }
        break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setClearColor(new THREE.Color(0xe4e0e0)); //background color
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    activateTopCamera();

    render();

    window.addEventListener("keypress", onKeyPress);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    /*if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }*/
    render();

    requestAnimationFrame(animate);
}
