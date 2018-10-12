class Chair extends GraphicElement{
    constructor(materials) {
        'use strict';
        super();
        this.chairBaseMaterial = materials[1];
        this.chairBackMaterial = materials[1];
        this.chairPoleMaterial = materials[1];
        this.chairHorizontalMaterial = materials[2];
        this.chairWheelMaterial = materials[2];

        this.userData = { posSpeed: 0, rotSpeed: 0, rotWheel: 0, rotSeat: 0, moveKeys: {up:false, down:false, right: false, left: false}, startedMove: false, startedRotWheels: false};

        this.legs = new Array();
        this.legs.push(this.addChairLegs(0, -9, 0, 2 * Math.PI / 3));
        this.legs.push(this.addChairLegs(0, -9, 0, -2 * Math.PI / 3));
        this.legs.push(this.addChairLegs( 0, -9, 0, 0));

        this.wheels = new Array();
        this.wheels.push(this.addChairWheel(-1, 4.5, 0, 2 * Math.PI / 3, this.legs[0]));
        this.wheels.push(this.addChairWheel(-1, -4.5, 0, 2 * Math.PI / 3, this.legs[0]));

        this.wheels.push(this.addChairWheel(-1, 4.5, 0, -2 * Math.PI / 3, this.legs[1]));
        this.wheels.push(this.addChairWheel(-1, -4.5, 0, -2 * Math.PI / 3, this.legs[1]));

        this.wheels.push(this.addChairWheel(-1, 4.5, 0, 0, this.legs[2]));
        this.wheels.push(this.addChairWheel(-1, -4.5, 0, 0, this.legs[2]));



        this.addChairPole( 0, -5, 0);
        this.seat = this.addChairSeat( 0, 0, 0);
        this.addChairBack( 0, 8, 4.5);

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

    addChairSeat(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(10, 1, 10);
        var mesh = new THREE.Mesh(geometry, this.getChairBaseMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
        return mesh;
    }

    addChairBack(x, y, z) {
        'use strict';
        var geometry = new THREE.CubeGeometry(10, 15, 1);
        var mesh = new THREE.Mesh(geometry, this.getChairBackMaterial());
        mesh.position.set(x, y, z);
        this.seat.add(mesh);
        return mesh;
    }

    addChairPole(x, y, z) {
        'use strict';
        var geometry = new THREE.CylinderGeometry(1, 1, 10, 16);
        var mesh = new THREE.Mesh(geometry, this.getChairPoleMaterial());
        mesh.position.set(x, y, z);
        this.add(mesh);
        return mesh;
    }

    addChairLegs(x, y, z, rot) {
        'use strict';
        //var geometry = new THREE.CubeGeometry( 10, 1.2, 1.2 );
        var geometry = new THREE.CylinderGeometry(0.6, 0.6, 8, 16);
        var mesh = new THREE.Mesh(geometry, this.getChairHorizontalMateriall());
        mesh.position.set(x, y, z);

        
        mesh.rotateY(rot);
        mesh.rotateZ(Math.PI / 2);

        this.add(mesh);
        return mesh;
    }

    addChairWheel(x, y, z, rot, leg) {
        'use strict';
        //var geometry = new THREE.SphereGeometry(1, 16, 16); // ESFERA ANTIGO
        //TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
        var geometry = new THREE.TorusGeometry( 1, 0.5, 5, 6, 6.3 );
        var mesh = new THREE.Mesh(geometry, this.getChairWheelMaterial());

        mesh.position.set(x, y, z);

        mesh.rotateX(-rot + Math.PI/2); //antes de juntar a leg

        
        leg.add(mesh);
        
        return mesh;
    }


    rotateElement (object, axis, radians) {					// Rotacao
        var rotateMatrix = new THREE.Matrix4();
        rotateMatrix.makeRotationAxis(axis.normalize(), radians);
        object.matrix.multiply(rotateMatrix);
        object.rotation.setFromRotationMatrix(object.matrix);
    
    }
    

    update(deltatime) { 

        if (this.userData.moveKeys.right && this.userData.rotSpeed < 0.14) {
            this.userData.rotSpeed += 0.006;
            this.userData.rotWheel += deltatime * 10;
        }
        if (this.userData.moveKeys.left && this.userData.rotSpeed > -0.14) {
            this.userData.rotSpeed -= 0.006;
            this.userData.rotWheel -= deltatime * 10;
        }

        if (this.userData.moveKeys.up || this.userData.moveKeys.down) {
            
            
           if (this.userData.startedMove == false) {
                this.rotateY(this.userData.rotSeat);
                this.seat.rotateY(-this.userData.rotSeat);

                /*
                for (var i = 0; i < this.legs.length; i++) {
                    this.legs[i].rotateX(-this.userData.rotSeat);
                }
                for (var i = 0; i < this.wheels.length; i++) {
                    
                    this.wheels[i].rotateX(-this.userData.rotSeat);
                    this.wheels[i].rotation.y = 0;
                    this.wheels[i].rotation.z = 0;
                    
                    //this.wheels[i].rotateZ(this.userData.posSpeed);

                    //this.rotateElement(this.wheels[i], new THREE.Vector3(1,0,0), this.userData.rotSeat);

                }
                */
                
                this.userData.rotSeat = 0;
                this.userData.startedMove = true;
                this.userData.startedRotWheels = true;
            
           }
           
        }
        else { // se nao mover nem para frente nem para trás
            this.userData.startedMove = false;
            this.userData.startedRotWheels = false;

        }

        if (this.userData.moveKeys.up && this.userData.posSpeed > -0.6) {
            this.userData.posSpeed -= 1.5 * deltatime;
        }
        if (this.userData.moveKeys.down && this.userData.posSpeed < 0.6) {
            this.userData.posSpeed += 1.5 * deltatime;
        }
    
        // reduce rotation speed
        if (this.userData.rotSpeed != 0 && (this.userData.moveKeys.left == false && this.userData.moveKeys.right == false) ) {
    
            if (this.userData.rotSpeed < -0.01) {
                this.userData.rotSpeed += 0.2 * deltatime;
            }
            else if (this.userData.rotSpeed > 0.01) {
                this.userData.rotSpeed -= 0.2 * deltatime;
            }
            else {
                this.userData.rotSpeed = 0;
            }

        }
        
        // reduce movement speed
        if (this.userData.posSpeed != 0 && (this.userData.moveKeys.down == false && this.userData.moveKeys.up == false) ) {
            
            if (this.userData.posSpeed < -0.01) {
                this.userData.posSpeed += 0.3 * deltatime;
            }
            else if (this.userData.posSpeed > 0.01) {
                this.userData.posSpeed -= 0.3 * deltatime;
            }
            else {
                this.userData.posSpeed = 0;
            }
            
        }

        this.seat.rotateY(-this.userData.rotSpeed);
        this.userData.rotSeat -= this.userData.rotSpeed;
        this.translateZ(this.userData.posSpeed);

        for (var i = 0; i < this.wheels.length; i++) {
            //this.wheels[i].rotateZ(this.userData.posSpeed);
            var zVec = new THREE.Vector3( 0, 0, 1 );
            //zVec.applyQuaternion( this.wheels[i].quaternion );
            //this.rotateElement(this.wheels[i], zVec, this.userData.posSpeed);

            //this.wheels[i].rotateZ(this.userData.posSpeed);


            //var quaternion = new THREE.Quaternion().setFromAxisAngle( zVec, this.userData.posSpeed );
            
            var rotX = this.wheels[i].rotation.x;
            var rotY = this.wheels[i].rotation.y;
            //this.wheels[i].rotation.y = 0;
            //this.wheels[i].rotateX(this.userData.rotSeat);
            
            //!!!!!!!!!!!!!!!!!!
            this.wheels[i].rotateZ(this.userData.posSpeed);
            this.wheels[i].rotation.x = rotX;
            this.wheels[i].rotation.y = 0;
            
            /*
            this.wheels[i].quaternion.set(this.wheels[i].rotation.x, this.wheels[i].rotation.y, this.wheels[i].rotation.z, 1).normalize();
            var tmpQuaternion = new THREE.Quaternion();
            tmpQuaternion.set(0, 0, this.userData.posSpeed, 1).normalize();
            this.wheels[i].quaternion.multiply(tmpQuaternion);
            */

            
            //this.wheels[i].rotation.z += this.userData.posSpeed;
            /*
            good
            var quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0).normalize(), this.userData.posSpeed);
            this.wheels[i].position.applyQuaternion(quaternion);
            */
        }

        /*
        for (var i = 0; i < this.wheels.length; i++) {
            if (this.userData.startedRotWheels) {
                if (this.userData.moveKeys.up == true || this.userData.moveKeys.down == true) {
                    //this.wheels[i].rotateY(20);

                    if (this.userData.rotWheel > 0.01) {
                        this.userData.rotWheel -= deltatime * 10 / this.wheels.length;
                        //this.wheels[i].rotateY(-deltatime * 1 / this.wheels.length);
                        
                        //this.wheels[i].rotateX(-deltatime * 1 / this.wheels.length);
                        this.rotateElement(this.wheels[i], new THREE.Vector3(1,0,0), -deltatime * 10 / this.wheels.length);
                    }
                        
                    else if (this.userData.rotWheel <= 0.01) {
                        this.userData.rotWheel += deltatime  * 10 / this.wheels.length;  
                        //this.wheels[i].rotateY(deltatime * 1 / this.wheels.length); 
                        
                        //this.wheels[i].rotateX(deltatime * 1 / this.wheels.length); 
                        this.rotateElement(this.wheels[i], new THREE.Vector3(1,0,0), deltatime * 10 / this.wheels.length);
                    }
                    else {
                        console.log("stop");
                        this.userData.startedRotWheels = false;
                    }
                         
                    //console.log(this.userData.rotWheel);
                }
            
                
            }
            
        }
        */
        
    }
}