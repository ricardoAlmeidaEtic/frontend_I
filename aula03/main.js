window.onload = async() =>{
    const canvas1 = document.querySelector("#canvas1");
    const ctx1 = canvas1.getContext("2d");

    const width1 = canvas1.width;
    const height1 = canvas1.height;

    const blockWidth = width1/2;
    const blockHeight = height1/2;

    const colors = ["green", "yellow", "blue","red"];
    const rectElements = [
        [blockWidth,0,blockWidth,blockHeight],
        [blockWidth,blockHeight,blockWidth,blockHeight],
        [0,blockWidth,blockWidth,blockHeight],
        [0,0,blockWidth,blockHeight]
    ]
    

    async function drawWithDelay() {
        for (let i = 0; i < colors.length; i++) {
            await new Promise(resolveLogo => {
                setTimeout(() => {
                    ctx1.fillStyle = colors[i];
                    ctx1.fillRect(rectElements[i][0],rectElements[i][1],rectElements[i][2],rectElements[i][3]);
                    resolveLogo();
                }, 1000);
            });
        }

        await new Promise(resolve => {
            setTimeout(() => {
                ctx1.strokeStyle = "black";
                ctx1.lineWidth = 5;
                ctx1.beginPath();
                ctx1.moveTo(200,0);
                ctx1.lineTo(200,400);
                ctx1.stroke();
                resolve();
            }, 1000);
        });

        
        await new Promise(resolve => {
            setTimeout(() => {
                ctx1.strokeStyle = "black";
                ctx1.lineWidth = 5;
                ctx1.beginPath();
                ctx1.moveTo(0,200);
                ctx1.lineTo(400,200);
                ctx1.stroke();
                resolve()
            }, 1000);
        });
    }


    function startLoop() {
        drawWithDelay();
        setTimeout(function() {
            ctx1.clearRect(0, 0, width1, height1);
            startLoop();
        }, 10000);
    }

    startLoop();

    const canvas = document.querySelector("#canvas2");
    const ctx = canvas.getContext("2d");

    let animId = null

    const button = document.querySelector("button")
    button.onclick = () =>{
        if(animId){
            cancelAnimationFrame(animId)
            animId = null;
            button.innerText="Start"
        }else{
            animate()
            button.innerText="Stop"
        }
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Star {
        constructor() {
            this.x = random(0, canvas.width);
            this.y = random(0, canvas.height);
            this.radius = random(0.5, 1.5);
            this.speed = random(0.1, 0.5);
        }

        move() {
            this.x += this.speed;
            if (this.x > canvas.width) {
                this.x = 0;
                this.y = random(0, canvas.height);
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    const stars = [];
    const numStars = 500;

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    class Planet {
        constructor(x, y, radius, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        move() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width + this.radius || this.x < -this.radius ||
                this.y > canvas.height + this.radius || this.y < -this.radius) {
                this.resetPosition();
            }
        }

        resetPosition() {
            this.x = random(-this.radius, canvas.width + this.radius);
            this.y = random(-this.radius, canvas.height + this.radius);
        }

        draw() {
            ctx.drawImage(planetImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }

    const planetImage = new Image();
    planetImage.src = 'planet.png';

    const planet = new Planet(random(0, canvas.width), random(0, canvas.height), 100, random(-1, 1), random(-1, 1));

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.move();
            star.draw();
        });

        planet.move();
        planet.draw();

        animId = requestAnimationFrame(animate);
    }

    animate();

}