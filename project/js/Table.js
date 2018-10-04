class Table extends GraphicElement{
    constructor(materials){
        'use strict';
        super();
        this.legMaterial = materials[0];
        this.tableTopMaterial = materials[1];
    }

    getLegMaterial(){
        'use strict';
        return this.legMaterial;
    }

    getTableTopMaterial(){
        'use strict';
        return this.tableTopMaterial;
    }

    addTableLeg(x, y, z) {
        'use strict';
        var geometry = new THREE.CylinderGeometry(2, 2, 21, 10, 10);
        var mesh = new THREE.Mesh(geometry, this.getLegMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addTableTop(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(70, 4, 40);
        var mesh = new THREE.Mesh(geometry, this.getTableTopMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
    }
}