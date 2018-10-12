class Lamp extends GraphicElement {

  constructor(baseRadius,baseHeight,pipeRadius,pipeHeight,pipeDetailsRadius,pipeDetailsTube,shadeRadiusBottom,shadeRadiusTop,shadeHeight,shadeDetailsTube,radialSegments,heightSegments,tubularSegments) {

    'use strict';

    super();

    this.baseRadius = baseRadius;
    this.baseHeight = baseHeight;
    this.pipeRadius = pipeRadius;
    this.pipeHeight = pipeHeight;
    this.pipeDetailsRadius = pipeDetailsRadius;
    this.pipeDetailsTube = pipeDetailsTube;
    this.shadeRadiusBottom = shadeRadiusBottom;
    this.shadeRadiusTop = shadeRadiusTop;
    this.shadeHeight = shadeHeight;
    this.shadeDetailsTube = shadeDetailsTube;
    this.radialSegments = radialSegments;
    this.heightSegments = heightSegments;
    this.tubularSegments = tubularSegments;

  }

  draw(x, y, z) {

    var geometry;
    var material;
    var mesh;

    //  BASE
    geometry = new THREE.ConeGeometry(this.baseRadius, this.baseHeight, this.radialSegments);
    material = new THREE.MeshBasicMaterial({color: 0x909497});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, this.baseHeight/2, 0);
    this.add(mesh);


    //  PIPE
    geometry = new THREE.CylinderGeometry(this.pipeRadius, this.pipeRadius, this.pipeHeight, 8);
    material = new THREE.MeshBasicMaterial({color: 0xB3B6B7});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, this.pipeHeight/2, 0);
    this.add(mesh);

    //  details
    geometry = new THREE.TorusGeometry(this.pipeDetailsRadius, this.pipeDetailsTube, 6, 6);
    material = new THREE.MeshBasicMaterial({color: 0x424949});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.position.set(0, this.pipeHeight+this.pipeDetailsTube, 0);
    this.add(mesh);


    //  LIGHT SUPPORT
    var aux = this.shadeRadiusTop-this.pipeDetailsRadius-this.pipeDetailsTube/2;

    //  front
    geometry = new THREE.CylinderGeometry(this.pipeRadius/2, this.pipeRadius/2, Math.sqrt(Math.pow(aux,2)+Math.pow(this.shadeHeight,2)), 3);
    material = new THREE.MeshBasicMaterial({color: 0x424949});
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(0, this.pipeHeight + this.shadeHeight/2, aux/2+this.pipeDetailsRadius+this.pipeDetailsTube/2);
    mesh.rotateX((Math.PI/2-Math.atan(this.shadeHeight/(this.shadeRadiusTop-this.pipeDetailsRadius-this.pipeDetailsTube/2))));
    this.add(mesh);

    //  right
    geometry = new THREE.CylinderGeometry(this.pipeRadius/2, this.pipeRadius/2, Math.sqrt(Math.pow(aux,2)+Math.pow(this.shadeHeight,2)), 3);
    material = new THREE.MeshBasicMaterial({color: 0x424949});
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(aux/2+this.pipeDetailsRadius+this.pipeDetailsTube/2, this.pipeHeight + this.shadeHeight/2, 0);
    mesh.rotateZ(-(Math.PI/2-Math.atan(this.shadeHeight/(this.shadeRadiusTop-this.pipeDetailsRadius-this.pipeDetailsTube/2))));
    this.add(mesh);

    //  back
    geometry = new THREE.CylinderGeometry(this.pipeRadius/2, this.pipeRadius/2, Math.sqrt(Math.pow(aux,2)+Math.pow(this.shadeHeight,2)), 3);
    material = new THREE.MeshBasicMaterial({color: 0x424949});
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(0, this.pipeHeight + this.shadeHeight/2, -(aux/2+this.pipeDetailsRadius+this.pipeDetailsTube/2));
    mesh.rotateX(-(Math.PI/2-Math.atan(this.shadeHeight/(this.shadeRadiusTop-this.pipeDetailsRadius-this.pipeDetailsTube/2))));
    this.add(mesh);

    //  left
    geometry = new THREE.CylinderGeometry(this.pipeRadius/2, this.pipeRadius/2, Math.sqrt(Math.pow(aux,2)+Math.pow(this.shadeHeight,2)), 3);
    material = new THREE.MeshBasicMaterial({color: 0x424949});
    mesh= new THREE.Mesh(geometry, material);
    mesh.position.set(-(aux/2+this.pipeDetailsRadius+this.pipeDetailsTube/2), this.pipeHeight + this.shadeHeight/2, 0);
    mesh.rotateZ((Math.PI/2-Math.atan(this.shadeHeight/(this.shadeRadiusTop-this.pipeDetailsRadius-this.pipeDetailsTube/2))));
    this.add(mesh);

    //LIGHT

    geometry = new THREE.SphereGeometry( 1.25 , 8, 6);
    material = new THREE.MeshBasicMaterial( {color: 0xfcf3cf} );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0, this.pipeHeight + 0.625 + this.pipeDetailsRadius, 0);
    this.add(mesh);

    //  SHADE
    geometry = new THREE.CylinderGeometry(this.shadeRadiusTop, this.shadeRadiusBottom, this.shadeHeight, 32, 0, true);
    material = new THREE.MeshBasicMaterial({color: 0xF0B27A});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, this.pipeHeight + this.shadeHeight/2, 0);
    this.add(mesh);

    //  details bottom
    geometry = new THREE.TorusGeometry(this.shadeRadiusBottom, this.shadeDetailsTube, 6, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xF0B27A});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.rotateZ(Math.PI/2);
    mesh.position.set(0, this.pipeHeight, 0);
    this.add(mesh);

    //  details top
    geometry = new THREE.TorusGeometry(this.shadeRadiusTop, this.shadeDetailsTube, 6, 32);
    material = new THREE.MeshBasicMaterial({color: 0xF0B27A});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotateX(Math.PI/2);
    mesh.rotateZ(Math.PI/2);
    mesh.position.set(0, this.pipeHeight + this.shadeHeight, 0);
    this.add(mesh);

    this.setPosition(x, y, z);
    //this.addToScene();

  }

}
