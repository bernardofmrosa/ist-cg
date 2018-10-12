class GraphicElement extends THREE.Object3D {
    constructor(x,y,z){
        'use strict';
        super();
        this.setPosition(x,y,z)
    }

    remove() {
        'use strict';
        this.scene.remove(this);
    }

    getPosition() {
        'use strict';
        return this.position;
    }

    setPosition(x, y, z) {
        'use strict';
        this.position.set(x, y, z);
    }
}