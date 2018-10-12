class Table extends GraphicElement{
    constructor(materials){
        'use strict';
        super();
        this.legMaterial = materials[0];
        this.tableTopMaterial = materials[0];
    }

    getLegMaterial(){
        'use strict';
        return this.legMaterial;
    }

    getTableTopMaterial(){
        'use strict';
        return this.tableTopMaterial;
    }

    /*
    // EXEMPLO DE FILHO DE FILHO
    addRoda() {
        'use strict';
        var geometry = new THREE.CylinderGeometry(2, 2, 21, 10, 10);
        var mesh = new THREE.Mesh(geometry, this.getLegMaterial());
        mesh.position.set(5,0,5);
        return mesh;
    }
    */

    addTableLeg(x, y, z) {
        'use strict';
        var geometry = new THREE.CylinderGeometry(1.5, 1.5, 20, 10, 10);
        var mesh = new THREE.Mesh(geometry, this.getLegMaterial());
        mesh.position.set(x, y, z);

        /*
        EXEMPLO DE FILHO DE FILHO
        var meshRoda = this.addRoda();
        mesh.add(meshRoda);
        */
        this.add(mesh);
    }

    addTableTop(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(60, 4, 40);
        var mesh = new THREE.Mesh(geometry, this.getTableTopMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }
}