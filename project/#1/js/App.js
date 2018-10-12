class App{
    constructor() {
        'use strict';
        this.scene;
        this.cameraNew;
        this.cameraFront;
        this.cameraTop;
        this.cameraSide;
        this.perspective;
        this.renderer;

        //this.table;
        //this.chair;

        this.clock;
    }

    getScene(){
        'use strict';
        return this.scene;
    }
///////////////////////////////////////////////////
    getCameraTop() {
        'use strict';
        return this.cameraTop;
    }

    getCameraFront() {
        'use strict';
        return this.cameraFront;
    }

    getCameraSide() {
        'use strict';
        return this.cameraSide;
    }

    getCameraNew() {
        'use strict';
        return this.cameraNew;
    }

    setCameraFront(camera){
        'use strict';
        this.cameraFront = camera;
    }

    setCameraSide(camera) {
        'use strict';
        this.cameraSide = camera;
    }

    setCameraTop(camera) {
        'use strict';
        this.cameraTop = camera;
    }

    setCameraNew(camera) {
        'use strict';
        this.cameraNew = camera;
    }

/////////////////////////////////////////////////////

    getPerspective() {
        'use strict';
        return this.perspective;
    }

    setPerspective(perspective) {
        'use strict';
        this.perspective = perspective;
    }

    getRenderer() {
        'use strict';
        return this.renderer;
    }

    setScene(scene){
        'use strict';
        this.scene = scene;
    }

    setRenderer(renderer){
        'use strict';
        this.renderer = renderer;
    }

    createGround(x, y, z) {
        'use strict';
        var ground = new THREE.Object3D();

        var geometry = new THREE.CubeGeometry(500, 500, 2);
        var material = new THREE.MeshBasicMaterial({color: 0x000000});
        var mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(x, y, z);

        ground.add(mesh);
        ground.position.x = x;
        ground.position.y = y;
        ground.position.z = z;

        mesh.rotation.x = Math.PI / 2;

        this.getScene().add(ground);

    }

    createTable(x, y, z) {
        'use strict';

        var table = new Table([new THREE.MeshBasicMaterial({color: 0xd66203}), new THREE.MeshBasicMaterial({color: 0x8d4306})]);

        table.addTableTop(0, 17, 0);
        table.addTableLeg(-20, 5, -15);
        table.addTableLeg(-20, 5, 15);
        table.addTableLeg(20, 5, 15);
        table.addTableLeg(20, 5, -15);

        this.getScene().add(table);

        table.setPosition(x, y, z);

        return table;
    }

    createChair(x, y, z) {
        'use strict';

        var chair = new Chair([new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xed1c57}),
            new THREE.MeshBasicMaterial({color: 0xff4800})]);


        chair.setPosition(x, y, z);

        this.getScene().add(chair);

        return chair;
    }


    createScene() {
        'use strict';
        var scene = new THREE.Scene();
        this.setScene(scene);
        this.getScene().add(new THREE.AxesHelper(100));

        this.activateNewCamera();
        this.activateFrontCamera();
        this.activateSideCamera();
        this.activateTopCamera();
        this.setPerspective("top");
        ///////////////////////////////////
        this.createGround(0, -1, 0);
        this.scene.table = this.createTable(0, 5, 0);
        this.scene.chair = this.createChair(0, 11.5, 20);
        ///////////////////////////////////
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        var lamp = new Lamp(5, 2.5, 0.75, 40, 0.75, 0.5, 10, 7.5, 15, 0.75, 32, 32, 100);
        //this.scene.lamp.draw(-42.5 - 5,0,0);
        lamp.draw(-42.5 - 5,0,0);
        this.scene.lamp = this.getScene().add(lamp);
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    }

    activateNewCamera() {
        'use strict';
        /*var viewSize = 50;
        var aspectRatio = window.innerWidth / window.innerHeight;

        camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2,
            -viewSize / 2, -10, 20);
        camera.position.x = 50;
        camera.position.y = 60;
        camera.position.z = 50;*/

        var camera = new THREE.OrthographicCamera(-this.originalWidth / 10, this.originalWidth / 10, this.originalHeight / 10, -this.originalHeight / 10, -200, 200);
        camera.position.x = 50;
        camera.position.y = 110;
        camera.position.z = 70;
        //this.setPerspective("top");
        camera.lookAt(this.getScene().position);
        this.setCameraNew(camera);
    }

    activateFrontCamera() {
        'use strict';

        var camera = new THREE.OrthographicCamera(-this.originalWidth / 15, this.originalWidth / 15, this.originalHeight / 15, -this.originalHeight / 15, -200, 200);
        camera.position.x = 0;
        camera.position.y = 20;
        camera.position.z = 50;

        // camera.lookAt(this.scene.position);
        camera.lookAt(new THREE.Vector3(0,20,0));
        this.setCameraFront(camera);
    }

    activateSideCamera() {
        'use strict';

        var camera = new THREE.OrthographicCamera(-this.originalWidth / 15, this.originalWidth / 15, this.originalHeight / 15, -this.originalHeight / 15, -200, 200);
        camera.position.x = 70;
        camera.position.y = 20;
        camera.position.z = 0;

        camera.lookAt(new THREE.Vector3(0,20,0));
        this.setCameraSide(camera);
    }

    activateTopCamera() {
        'use strict';


        var camera = new THREE.OrthographicCamera(-this.originalWidth / 15, this.originalWidth / 15, this.originalHeight / 15, -this.originalHeight / 15, -200, 200);
        camera.position.x = 0;
        camera.position.y = 110;
        camera.position.z = 0;

        camera.lookAt(this.getScene().position);
        this.setCameraTop(camera);
    }

    chooseCamera(){
        if(this.getPerspective()=="top"){
            return this.getCameraTop();
        }

        else if(this.getPerspective() == "side") {
            return this.getCameraSide();
        }

        else if(this.getPerspective() == "front") {
            return this.getCameraFront();
        }

        else{
            return this.getCameraNew();
        }
    }

    render() {
        'use strict';
        this.getRenderer().render(this.getScene(), this.chooseCamera());
    }

    createRenderer() {
        'use strict';
        this.setRenderer(new THREE.WebGLRenderer({
            antialias: true
        }));
        this.getRenderer().setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.getRenderer().domElement);
    }


    animate() {
        'use strict';

        var deltaTime = 0;
        if(this.clock.running) deltaTime = this.clock.getDelta();
        //console.log(deltaTime);

        this.scene.chair.update(deltaTime);

        this.render();

        requestAnimationFrame(this.animate.bind(this));
    }

    onResize() {
        'use strict';
        /*var camFactor = 10;
        this.getRenderer().setSize(window.innerWidth, window.innerHeight);
        // update the camera
        this.chooseCamera().left = -window.innerWidth / camFactor;
        this.chooseCamera().right = window.innerWidth / camFactor;
        this.chooseCamera().top = window.innerHeight / camFactor;
        this.chooseCamera().bottom = -window.innerHeight / camFactor;
        this.chooseCamera().updateProjectionMatrix();*/

        var limite = 60;
        this.getRenderer().setSize(window.innerWidth, window.innerHeight);
        var aspectRatio = window.innerWidth/window.innerHeight;
        if (aspectRatio > 1) {
            this.chooseCamera().left = -limite * aspectRatio;
            this.chooseCamera().right = limite * aspectRatio;
            this.chooseCamera().top = limite;
            this.chooseCamera().bottom = -limite;

        }
        else {
            this.chooseCamera().left = -limite;
            this.chooseCamera().right = limite;
            this.chooseCamera().top = limite / aspectRatio;
            this.chooseCamera().bottom = -limite / aspectRatio;
        }
        this.chooseCamera().updateProjectionMatrix();

    }

    init() {
        'use strict';

        this.originalWidth = window.innerWidth;
        this.originalHeight = window.innerHeight;

        this.clock = new THREE.Clock;
        this.clock.start();

        this.createRenderer();
        this.createScene();

        this.render();

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup",onKeyUp);
        window.addEventListener("resize", this.onResize.bind(this));
    }

}
