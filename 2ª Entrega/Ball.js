class Ball extends GraphicEntity {
    constructor(x, y, z,radius,id) {
        'use strict';

        super(x, y, z,
            new THREE.MeshBasicMaterial({ color: 0xaedfff, wireframe: false }),
            "ball"+id);

        this.radius = radius;
        var angle = Math.random() * 2 * Math.PI;
        this.addBall(angle);
        this.velocity = new THREE.Vector3(Math.cos(angle),0,Math.sin(angle));
        this.speed = Math.random()*2+1; //Math.random() * 10;
    }

    toggleAxis() {
        this.axis.visible = !this.axis.visible;
    }

    increaseSpeed() {
        this.speed *= 1.1;
    }

    addBall(angle) {
        'use strict';
        this.axis = new THREE.AxisHelper(6);
        var geometry = new THREE.SphereGeometry(this.radius, 15, 15);
        var mesh = new THREE.Mesh(geometry, this.material);
        this.rotation.y=angle;
        this.add(mesh);
        this.add(this.axis);
    }

    ballColliding(ball) {
        'use strict';
        var distance = this.ballDistance(ball);
        if (distance <= 2 * this.radius) {
            return true;
        } else {
            return false;
        }
    }

    ballDistance(ball) {
        'use strict';
        return Math.sqrt((this.position.x-ball.position.x)*(this.position.x-ball.position.x)
                        +(this.position.y-ball.position.y)*(this.position.y-ball.position.y)
                        +(this.position.z-ball.position.z)*(this.position.z-ball.position.z));
    }

    updateBall(delta, speedUp) {
        'use strict';
        var x = delta * Math.PI * 2 * this.speed;
        var angle = Math.acos(this.velocity.x);
        if (this.velocity.z > 0){
            angle *= -1;
        }
        this.rotation.y=angle;//angle+Math.PI/2;
        this.updatePosition(this.velocity, x);
        for (var i = 0; i < this.children.length; i++) {
            //console.log(this.children[i]," is mesh? ",this.children[i].isMesh)
            if (this.children[i] instanceof THREE.Mesh) {
                //console.log("ROLANDO");
                //this.children[i].rotation.x+=-delta*this.velocity.z;
                //this.children[i].rotation.z+=-delta*this.velocity.x;
                this.children[i].rotation.z+=-delta*this.speed;
            }
        }
        if (speedUp) {
            this.increaseSpeed();
            console.log("heyhey");

        }
    }

}
