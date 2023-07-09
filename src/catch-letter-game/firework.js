import { Particle } from "./particle.js";

export class Firework {
    constructor(x, y, p5) {
      this.p5 = p5;
      this.shell = new Particle(x, y, this.p5);
      this.exploded = false;
      this.particles = [];
    }
  
    update() {
      if (!this.exploded) {
        // apply upward force to the shell
        this.shell.applyForce(this.p5.createVector(0, -0.1));
        this.shell.update();
        
        // once the shell starts falling down
        if (this.shell.vel.y >= 0) { 
          this.exploded = true;
          this.explode();
        }
      }
  
      for (let i = this.particles.length - 1; i >= 0; i--) {
        // apply gravity to particles
        this.particles[i].applyForce(this.p5.createVector(0, 0.1));
        this.particles[i].update();

        // if the particle's life is over
        if (this.particles[i].isDead()) {
            // remove the particle from the array
            this.particles.splice(i, 1); 
        }
      }
    }
  
    explode() {
      for (let i = 0; i < 100; i++) {
        let p = new Particle(this.shell.pos.x, this.shell.pos.y, this.p5);
        this.particles.push(p);
      }
    }
  
    show() {
      if (!this.exploded) {
        this.shell.show();
      }
  
      for (let particle of this.particles) {
        particle.show();
      }
    }
  
    finished() {
      return this.exploded && this.particles.length === 0;
    }
  }
  