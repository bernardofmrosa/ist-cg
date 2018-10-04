/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

//var ball;

var table,ground;

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


function addChairBase(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(10,1,10);
    var material = new THREE.MeshBasicMaterial({color:0x4f74af, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairBack(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(10,12,1);
    var material = new THREE.MeshBasicMaterial({color:0x4f74af, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairPole(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry( 1.2, 1.2, 8, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xffc126, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairHorizontal(obj, x,y,z, rot) {
    'use strict';
    //var geometry = new THREE.CubeGeometry( 10, 1.2, 1.2 );
    var geometry = new THREE.CylinderGeometry( 0.6, 0.6, 8, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xffc126, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);

    //var axis = new THREE.Vector3( x, y, z ).normalize(); // create once and reuse it
    //object.rotateOnAxis( axis, radians );
    
    //mesh.rotation.set(0,rot,0);
    mesh.rotateY( rot );
    mesh.rotateZ( Math.PI / 2 );

    obj.add(mesh);
}


function addChairWheel(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.SphereGeometry( 1, 16, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xff4800, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}


function createChair(x,y,z) {
    'use strict';
    var chair = new THREE.Object3D();
    
    addChairWheel(chair, 4, -9.5, 0);
    addChairWheel(chair, -4, -9.5, 0);
    
    addChairWheel(chair, 2, -9.5, 2);
    addChairWheel(chair, -2, -9.5, 2);
    addChairWheel(chair, 2, -9.5, -2);
    addChairWheel(chair, -2, -9.5, -2);

    addChairHorizontal(chair, 0,-8,0, 2 * Math.PI / 3);
    addChairHorizontal(chair, 0,-8,0, -2 * Math.PI / 3);
    addChairHorizontal(chair, 0,-8,0, 0);
    
    addChairPole(chair, 0,-4,0);
    addChairBase(chair, 0,0,0);
    addChairBack(chair, 0,6,5);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;

    scene.add(chair);
}


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
    scene.add(new THREE.AxesHelper(100));
    
    createGround(0,-1,0);
    createTable(0, 5, 0);
    createChair(0,11,20);
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
    camera.position.x = 50;
    camera.position.y = 110;
    camera.position.z = 70;
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
            if (node instanceof THREE.AxesHelper) {
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

