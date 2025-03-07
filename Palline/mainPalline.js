let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.step = 5;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    update() {
        this.x += this.step;
        this.whenBorderIsFinished()
    }

    whenBorderIsFinished() {
        //this.x === canvas.width + this.radius && (this.x = -this.radius)
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.step = -this.step;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.step = -this.step;
        }

    }
}

let loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle.draw();
    circle.update();

    requestAnimationFrame(loop)
};

circle = new Circle(canvas.width / 2, canvas.height/2, 50);
requestAnimationFrame(loop);