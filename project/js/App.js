class App{
    constructor() {
        'use strict';
        this.scene;
        this.camera;
        this.perspective;
        this.renderer;
    }

    getScene(){
        'use strict';
        return this.scene;
    }

    getCamera() {
        'use strict';
        return this.camera;
    }

    getPerspective(){
        'use strict';
        return this.perspective;
    }

    getRenderer(){
        'use strict';
        return this.renderer;
    }

    setCamera(camera){
        'use strict';
        this.camera = camera;
    }

    setPerspective(perspective){
        'use strict';
        this.perspective = perspective;
    }

    setScene(scene){
        'use strict';
        this.scene = scene;
    }

    setRenderer(renderer){
        'use strict';
        this.renderer = renderer;
    }
////////////////////////////////////////////
    createGround(x, y, z) {
        'use strict';
        var ground = new THREE.Object3D();

        var geometry = new THREE.CubeGeometry(500, 500, 2);
        var material = new THREE.MeshBasicMaterial({color: 0xEEEEE});
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

        table.addTableTop(0, 15, 0);
        table.addTableLeg(-20, 6, -15);
        table.addTableLeg(-20, 6, 15);
        table.addTableLeg(20, 6, 15);
        table.addTableLeg(20, 6, -15);

        this.getScene().add(table);

        table.setPosition(x, y, z);
    }

    createChair(x, y, z) {
        'use strict';

        var chair = new Chair([new THREE.MeshBasicMaterial({color: 0x4f74af}), new THREE.MeshBasicMaterial({color: 0x4f74af}),
            new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xff4800})]);

        chair.addChairWheel(4, -9.5, 0);
        chair.addChairWheel(-4, -9.5, 0);

        chair.addChairWheel( 2, -9.5, 2);
        chair.addChairWheel(-2, -9.5, 2);
        chair.addChairWheel( 2, -9.5, -2);
        chair.addChairWheel(-2, -9.5, -2);

        chair.addChairHorizontal(0, -8, 0, 2 * Math.PI / 3);
        chair.addChairHorizontal(0, -8, 0, -2 * Math.PI / 3);
        chair.addChairHorizontal( 0, -8, 0, 0);

        chair.addChairPole( 0, -4, 0);
        chair.addChairBase( 0, 0, 0);
        chair.addChairBack( 0, 6, 5);

        this.getScene().add(chair);

        chair.setPosition(x, y, z);
    }


    createScene() {
        'use strict';
        var scene = new THREE.Scene();
        this.setScene(scene);
        this.getScene().add(new THREE.AxesHelper(100));

        this.activateTopCamera();
        ///////////////////////////////////
        //this.createGround(0, -1, 0);
        //this.createTable(0, 5, 0);
        //this.createChair(0, 11, 20);
        var floorLamp = new FloorLamp(10,10,0);
        scene.add(floorLamp);
        floorLamp.remove();

        ///////////////////////////////////



    }

    activateTopCamera() {
        'use strict';
        /*var viewSize = 50;
        var aspectRatio = window.innerWidth / window.innerHeight;

        camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2,
            -viewSize / 2, -10, 20);
        camera.position.x = 50;
        camera.position.y = 60;
        camera.position.z = 50;*/

        var camera = new THREE.OrthographicCamera(-98, 98, 60,-60, -200, 200);
        camera.position.x = 50;
        camera.position.y = 110;
        camera.position.z = 70;
        this.setPerspective("top");
        camera.lookAt(this.getScene().position);
        this.setCamera(camera);
    }

    activateFrontCamera() {
        'use strict';
        /*var viewSize = 50;
        var aspectRatio = window.innerWidth / window.innerHeight;

        camera = new THREE.OrthographicCamera(-aspectRatio * viewSize / 2, aspectRatio * viewSize / 2, viewSize / 2,
            -viewSize / 2, -10, 20);
        camera.position.x = 50;
        camera.position.y = 60;
        camera.position.z = 50;*/

        var camera = new THREE.OrthographicCamera(-98, 98, 60, -60, -200, 200);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 50;
        this.setPerspective("front");
        camera.lookAt(scene.position);
        this.setCamera(camera);
    }

    activateSideCamera() {
        'use strict';

        var camera = new THREE.OrthographicCamera(-98, 98, 60, -60, -200, 200);
        camera.position.x = 70;
        camera.position.y = 0;
        camera.position.z = 0;
        this.setPerspective("side");
        camera.lookAt(scene.position);
        this.setCamera(camera);
    }

    render() {
        'use strict';
        this.getRenderer().render(this.getScene(), this.getCamera());
    }

    createRenderer() {
        this.setRenderer(new THREE.WebGLRenderer({
            antialias: true
        }));
        this.getRenderer().setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.getRenderer().domElement);
    }

    /*animate(app) {
        'use strict';
        console.log(this);

        this.render();

        requestAnimationFrame(this.animate(app));
    }*/
    animate() {
        'use strict';
        console.log(this);
        /*if (ball.userData.jumping) {
            ball.userData.step += 0.04;
            ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
            ball.position.z = 15 * (Math.cos(ball.userData.step));
        }*/
        this.render();

        requestAnimationFrame(this.animate); //requestAnimationFrame(this.animate()); *rebenta o stack*
    }

    onResize() {
        'use strict';

        this.getRenderer().setSize(window.innerWidth, window.innerHeight);

        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.getCamera().aspect = window.innerWidth / window.innerHeight;
            this.getCamera().updateProjectionMatrix();
        }

    }

    init() {
        'use strict';
        this.createRenderer();
        this.createScene();

        this.render();

        window.addEventListener("keypress", onKeyPress);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", this.onResize);
    }

}
