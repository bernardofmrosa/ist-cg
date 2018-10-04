class FloorLamp extends GraphicElement {

  constructor(x, y, z) {

    'use strict';

    super(x,y,z);

    var geometry;
    var material;
    var mesh;

    //shade
    geometry = new THREE.CylinderGeometry(5, 10, 15, 32);
    material = new THREE.MeshBasicMaterial({color: 0xF0B27A});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 27.5, 0);
    this.add(mesh);

    //light support
    geometry = new THREE.TorusGeometry(1.25, 0.25, 16, 100);
    material = new THREE.MeshBasicMaterial({color: 0x909497});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(0, 20, 0);
    this.add(mesh);

    geometry = new THREE.TorusGeometry(10, 0.25, 16, 100);
    material = new THREE.MeshBasicMaterial({color: 0xEB984E});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(0, 20, 0);
    this.add(mesh);

    geometry = new THREE.TorusGeometry(5, 0.25, 16, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(0,35,0);
    this.add(mesh);

    geometry = new THREE.CylinderGeometry(0.25, 0.25, Math.sqrt(Math.pow(3.75,2)+Math.pow(15,2)), 32);
    material = new THREE.MeshBasicMaterial({color: 0x909497});
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(3.125,27.5,0);
    mesh.rotateZ(-Math.atan(3.75/15));
    this.add(mesh);

    geometry = new THREE.CylinderGeometry(0.25, 0.25, Math.sqrt(Math.pow(3.75,2)+Math.pow(15,2)), 32);
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(-3.125,27.5,0);
    mesh.rotateZ(Math.atan(3.75/15));
    this.add(mesh);

    geometry = new THREE.CylinderGeometry(0.25, 0.25, Math.sqrt(Math.pow(3.75,2)+Math.pow(15,2)), 32);
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(0,27.5,3.125);
    mesh.rotateX(Math.atan(3.75/15));
    this.add(mesh);

    geometry = new THREE.CylinderGeometry(0.25, 0.25, Math.sqrt(Math.pow(3.75,2)+Math.pow(15,2)), 32);
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(0,27.5,-3.125);
    mesh.rotateX(-Math.atan(3.75/15));
    this.add(mesh);

    //pipe
    geometry = new THREE.CylinderGeometry(0.5, 0.5, 40, 32);
    material = new THREE.MeshBasicMaterial({color: 0xB3B6B7});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    this.add(mesh);

    //base
    geometry = new THREE.ConeGeometry(5, 2.5, 32);
    material = new THREE.MeshBasicMaterial({color: 0x909497});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,-20,0);
    this.add(mesh);

  }

}
