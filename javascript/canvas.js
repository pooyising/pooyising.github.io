// If you don't want jQuery $(document).ready(function(){}), then can refer to
 // https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
 // for plain vanilla Javascript.

$(document).ready(function() {

  // Initial Setup
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')

  canvas.width = innerWidth
  canvas.height = innerHeight

  // Variables
  const mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
  }

  // const touch = {
  //     x: innerWidth / 2,
  //     y: innerHeight / 2
  // }

  // const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
  const colors = ['#00bdff', '#4d39ce', '#088eff']



  // Event Listeners (to add INTERACTIVITY) ===================
  // addEventListener('mousemove' , event => {
  //     mouse.x = event.clientX
  //     mouse.y = event.clientY
  // });
  // addEventListener('touchstart', event => {
  //     touch.x = event.clientX
  //     touch.y = event.clientY
  // });

  // addEventListener('touchmove', event => {
  //     touch.x = event.clientX
  //     touch.y = event.clientY
  // });

  addEventListener('resize', () => {
      canvas.width = innerWidth
      canvas.height = innerHeight

      init()
  })



  // Utility Functions (e.g to generate random numbers/colors etc.)
  function randomIntFromRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)]
  }

  function distance(x1, y1, x2, y2) {
      const xDist = x2 - x1
      const yDist = y2 - y1

      return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }

  // Objects
  function Particle(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      // this.radians = 0; // this.radians = radians;
      // note that this also affects where is the particle's starting location (e.g if radians = 0, then starting location is x = some positive x-coordinate, y = 0) So, to alter the starting locations along the circumference of a circle, we can use a Math.random() function to generate random starting locations; we want the numbers to be from 0 to 2 * pie because that will mean the particle has travelled a full revolution of a circular path.

      this.radians = Math.random() * Math.PI * 2;
      // to spawn particles at various random points on the circumference of the circle.

      this.velocity = 0.005; // determine the speed at which the particle moves

      // this.distanceFromCenter = {x: randomIntFromRange(50, 120), y: randomIntFromRange(50, 120)};

      if (innerHeight <= innerWidth) {
        this.distanceFromCenter = randomIntFromRange((50), (innerWidth / 2));
      }
      else {
        this.distanceFromCenter = randomIntFromRange((50), (innerHeight / 2));
      }

      // this.lastMouse = {x: x, y: y} // x & y are the initial starting locations of the particles.

      // to draw the particle on the screen, we need to call the particle's "update" function which in return calls the "draw" function.
      this.update = () => {
        const lastPoint = {x: this.x , y: this.y}; // this is going to give us the particle's last point before we actually edit anything. (note we're using "const" so we can't change them.)


        // ================ Move points over times ===========
        this.radians += this.velocity; // (rmb to create a new property - i.e "VELOCITY".)

        // DRAG EFFECT =======================================
        // this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;

        // CIRCULAR MOTION ===================================
        // (this is where we edit our x and y coordinates.)
        this.x = x + Math.cos(this.radians) * this.distanceFromCenter;
        // this.x = mouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        // this.x = touch.x + Math.cos(this.radians) * this.distanceFromCenter;

        // -  we need to make sure that whenever we move our mouse that the X & Y positioning of our circle or the center of our particles move along with it. so instead of referencing x as our initial x-coordinate, we're going to use mouse.x instead. same for y, we use mouse.y
        //  - however, we see that even though the particles are moving along, it isn't a smooth effect because the center of the particles are moving along with the mouse in REAL TIME, rather than creating a DRAG EFFECT.


        // this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x;
        // -  need "this.distanceFromCenter.x" because that is the code that will randomise our particle distance from its starting location. think of it as a range of distance deviating from its original starting location, and therefore, distance from center of the circle.

        // this.x = x + Math.cos(this.radians) * randomIntFromRange(50, 120)
        // each time we're runing the update function, we getting another random integer which throws everything; it doesn't give us a smooth motion. we want to make sure we generate a random value but only ONCE instead of everytime we run the update function.


        // this.x += 1 // this will make the particle move the right infinitely.

        // this.x = x + Math.cos(this.radians) * 100;
        // with Math.cos() that takes in radian as argument, our x coordinate will be anywhere from -1 to 1. The y-coordinate will remain as innerHeight / 2 as specified earlier in the code. As we increase our radians over time, our x coordinate will change as the Math.cos(this.radians) will chage from -1 to 1. To make the motion more obvious, we want to multiply by a larger value, e.g 100. Now the particle is moving from 100 to -100 in a linear horizontal manner. This creates an oscillating motion when we add it to our particle original X coordinate and set the new X coordinate.

        // Because cosine is adjacent/hypotenuse, the output is 1 when the triangle is a horizontal line on the positive x-axis and -1 on the negative x-axis.

        // Because sine is opposite / hypotenuse, the output is 1 when the triangle is a vertical line on the positive y-axis and -1 on the negative y-axis.

        // Rmb for x-coordinate, we use Math.cos()
        // Rmb for y-coordinate, we use Math.sin()

        // this.y = y + Math.cos(this.radians) * 100; WRONG!!!
        //  - Now the particle moves diagonally. The reason for this is we're using cosine in 2 spots. To get the circular motion, we need to use sine in one of them.

        this.y = y + Math.sin(this.radians) * this.distanceFromCenter;
        // this.y = mouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        // this.y = touch.y + Math.sin(this.radians) * this.distanceFromCenter;

        // -  we need to make sure that whenever we move our mouse that the X & Y positioning of our circle or the center of our particles move along with it. so instead of referencing x as our initial x-coordinate, we're going to use mouse.x instead. same for y, we use mouse.y



        // this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y

        // this.y = y + Math.sin(this.radians) * 100; // CORRECT!!!

        // SUMMARY: creating circular motion all comes down to the 2 lines of code using Math.cos() and Math.sin() and incrementating the radian that you pass through it (can be done by a MULTIPLIER (e.g 100) to increase the radius from the center)


        // console.log(Math.cos(this.radians)); // to test if the particle is moving as expected.

        // ============= 3D Effects =================
        // the issue here is that we're generating a random value or distance from the center of the circle for each of our particles for both X and Y coordinates, when what we should we do is to let the X and Y coordinates have the SAME random values, i.e
        //    this.distanceFromCenter(50, 120) instead of
        //    this.distanceFromCenter = {x: randomIntRange(50,120), y:randomIntRange(50,120)}
        // and get rid of the x & y from this.distanceFromCenter

        this.draw(lastPoint); // pass in lastPoint so we can use it.
      };
      // using lastPoint that we passed in as argument to this.draw, we can access its x and y coordinates.
      this.draw = (lastPoint) => {
        c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.fillStyle = this.color;
        // c.fill()
        c.strokeStyle = this.color; // set the stroke style equal to the color of our particle
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y); // the whole idea behid a smooth trail is that we taking our particle previous location within the previous frame and then drawing a line to the particle new location in the new frame. so c.moveTo() will accept the particle's coordinates in the previous frame. we have to create a new variable in this.update for these coordinates.

        c.lineTo(this.x, this.y); // c.lineTo() will accept the particle's coordinates in the new frame. this shall be the this.x and this.y that we we previously used.

        c.stroke();
        c.closePath();
        // -  the trails have ridges on them and that is due to the shape we're drawing within our draw function, since we're using an arc to draw this, it creates knots and not so smooth effects that we want. so instead of using an arc, we're going to be using an line.
      };
      // now our animation will be much smoother than if we use the particles as shapes.
  }
  // ================================== Template ======================
  // Object.prototype.update = function() {
  //     this.draw()
  // }
  //
  // Object.prototype.draw = function() {
  //     c.beginPath()
  //     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  //     c.fillStyle = this.color
  //     c.fill()
  //     c.closePath()
  // }

  // Implementation (to add particles alwaus go to the "init" function)
  let particles
  function init() {
      particles = []; //(storing all our particles in an array)
      var w = $(window).width();
      // Mobile size
      if (w < 600) {
        for (let i = 0; i < 25; i++) {
            const radius = (Math.random() * 2) + 1; // we only want the radius to be from 1 to 2.
            // To achieve a smooth effect, we want to make sure that the particles are spawned with different radii(so they are not identical in size) For each time a new particle is generated, we will give it a different radius. We use Math.random() which will give us any value from 0 to 1, mutiply it by 2 which will give us value from 0 to 2. We only want the radius to be from 1 to 2, so we add 1 at the end.


            // particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            // using randomColor(colors), we'll generate particles with random colors.
        }
        console.log(particles);
      }
      // Tablet size
      else if ( 600 <= w && w <= 1200) {
        for (let i = 0; i < 50; i++) {
            const radius = (Math.random() * 2) + 1; // we only want the radius to be from 1 to 2.
            // To achieve a smooth effect, we want to make sure that the particles are spawned with different radii(so they are not identical in size) For each time a new particle is generated, we will give it a different radius. We use Math.random() which will give us any value from 0 to 1, mutiply it by 2 which will give us value from 0 to 2. We only want the radius to be from 1 to 2, so we add 1 at the end.


            // particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            // using randomColor(colors), we'll generate particles with random colors.
        }
        console.log(particles);
      }
      // Desktop size (more than 1200px)
      else {
        for (let i = 0; i < 50; i++) {
            const radius = (Math.random() * 2) + 1; // we only want the radius to be from 1 to 2.
            // To achieve a smooth effect, we want to make sure that the particles are spawned with different radii(so they are not identical in size) For each time a new particle is generated, we will give it a different radius. We use Math.random() which will give us any value from 0 to 1, mutiply it by 2 which will give us value from 0 to 2. We only want the radius to be from 1 to 2, so we add 1 at the end.


            // particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
            particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
            // using randomColor(colors), we'll generate particles with random colors.
        }
        console.log(particles);
      }
      // for (let i = 0; i < 25; i++) {
      //     const radius = (Math.random() * 2) + 1; // we only want the radius to be from 1 to 2.
      //     // To achieve a smooth effect, we want to make sure that the particles are spawned with different radii(so they are not identical in size) For each time a new particle is generated, we will give it a different radius. We use Math.random() which will give us any value from 0 to 1, mutiply it by 2 which will give us value from 0 to 2. We only want the radius to be from 1 to 2, so we add 1 at the end.
      //
      //
      //     // particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, 'blue'));
      //     particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
      //     // using randomColor(colors), we'll generate particles with random colors.
      // }
      // console.log(particles);

  } // End of function init()

  // Animation Loop
  function animate() {
      requestAnimationFrame(animate)
      c.fillStyle = 'rgba(0, 0, 0, 0.2)';
      // canvas background color as well as the trailing color effect. set to white color with opacity of 0.05

      c.fillRect(0, 0, canvas.width, canvas.height);
      // c.clearRect(0, 0, canvas.width, canvas.height)
      // -  instead of using clearRect which is the function that refreshes the screen to give us a new slate to draw on each time we call particle.update, we're going to use fillRect and we're going to set our fill style
      // -  what we're doing is essentially creating a rectangle to be drawn on top of our circle each time we run this animate loop. So for each frame, we're drawing white rectangle on top of it and that rectangle has a very slight transparency which once we start layering each of these transparencies on top of each other, we start to get this trail effect as a result.

      // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
      // -  we don't need this above; it's just a text that can move along with mouse's cursor.


      // objects.forEach(object => {
      //  object.update();
      // });
      // -  to animate our particle, we need to uncomment the block of code above; this is how you animate multiple objects at once.
      particles.forEach(particle => {
        particle.update(); // this will produce a particle on the canvas.
      });

  };

  init()
  animate()

});
