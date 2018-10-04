class App {
    constructor() {
        'use strict';
        this.scene;
        this.camera;
        this.perspective;
        this.renderer;

        this.table;
        this.chair;

        this.clock;
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

        return table;
    }

    createChair(x, y, z) {
        'use strict';

        var chair = new Chair([new THREE.MeshBasicMaterial({color: 0x4f74af}), new THREE.MeshBasicMaterial({color: 0x4f74af}),
            new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xffc126}),
            new THREE.MeshBasicMaterial({color: 0xff4800})]);

        /*
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

        */
        chair.setPosition(x, y, z);

        this.getScene().add(chair);

        return chair;
    }


    createScene() {
        'use strict';
        var scene = new THREE.Scene();
        this.setScene(scene);
        this.getScene().add(new THREE.AxesHelper(100));

        this.activateTopCamera();
        ///////////////////////////////////
        this.createGround(0, -1, 0);
        this.table = this.createTable(0, 5, 0);
        this.chair = this.createChair(0, 11, 20);
        ///////////////////////////////////

        var floorLamp = new FloorLamp(0,0,0);
        floorLamp.addBase();
        floorLamp.addPipe();
        floorLamp.addLightSupport();
        floorLamp.addLight();
        floorLamp.addShade();
        scene.add(floorLamp);
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
        camera.lookAt(this.scene.position);
        this.setCamera(camera);
    }

    activateSideCamera() {
        'use strict';

        var camera = new THREE.OrthographicCamera(-98, 98, 60, -60, -200, 200);
        camera.position.x = 70;
        camera.position.y = 0;
        camera.position.z = 0;
        this.setPerspective("side");
        camera.lookAt(this.scene.position);
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


    animate() {
        'use strict';

        var deltaTime = 0;
        if(this.clock.running) deltaTime = this.clock.getDelta();
        //console.log(deltaTime);

        this.chair.update(deltaTime);

        this.render();

        requestAnimationFrame(this.animate.bind(this));
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
