class Chair extends GraphicElement{
    constructor(materials) {
        'use strict';
        super();
        this.chairBaseMaterial = materials[0];
        this.chairBackMaterial = materials[1];
        this.chairPoleMaterial = materials[2];
        this.chairHorizontalMaterial = materials[3];
        this.chairWheelMaterial = materials[4];
    }

    getChairBaseMaterial() {
        'use strict';
        return this.chairBaseMaterial;
    }

    getChairBackMaterial() {
        'use strict';
        return this.chairBackMaterial;
    }

    getChairPoleMaterial() {
        'use strict';
        return this.chairPoleMaterial;
    }

    getChairHorizontalMateriall() {
        'use strict';
        return this.chairHorizontalMaterial;
    }

    getChairWheelMaterial() {
        'use strict';
        return this.chairWheelMaterial;
    }

    addChairBase(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(10, 1, 10);
        var mesh = new THREE.Mesh(geometry, this.getChairBaseMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairBack(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(10, 12, 1);
        var mesh = new THREE.Mesh(geometry, this.getChairBackMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairPole(x, y, z) {
        'use strict';
        var geometry = new THREE.CylinderGeometry(1.2, 1.2, 8, 16);
        var mesh = new THREE.Mesh(geometry, this.getChairPoleMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addChairHorizontal(x, y, z, rot) {
        'use strict';
        //var geometry = new THREE.CubeGeometry( 10, 1.2, 1.2 );
        var geometry = new THREE.CylinderGeometry(0.6, 0.6, 8, 16);
        var mesh = new THREE.Mesh(geometry, this.getChairHorizontalMateriall());
        mesh.position.set(x, y, z);

        //var axis = new THREE.Vector3( x, y, z ).normalize(); // create once and reuse it
        //object.rotateOnAxis( axis, radians );

        //mesh.rotation.set(0,rot,0);
        mesh.rotateY(rot);
        mesh.rotateZ(Math.PI / 2);

        this.add(mesh);
    }

    addChairWheel(x, y, z) {
        'use strict';
        var geometry = new THREE.SphereGeometry(1, 16, 16);
        var mesh = new THREE.Mesh(geometry, this.getChairWheelMaterial());
        mesh.position.set(x, y, z);

        this.add(mesh);
    }
}