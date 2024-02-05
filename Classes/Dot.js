class Dot {

    static dots = [];
    static dotSize = 1;
    static maxDotSize;

    constructor() {
        this.x = Math.random() * (canvasWidth-Dot.maxDotSize) + Dot.maxDotSize/2;
        this.y = Math.random() * (canvasHeight-Dot.maxDotSize) + Dot.maxDotSize/2;
        Dot.dots.push(this);
        this.red = false;
        this.i = Dot.dots.length - 1;
    }

    static drawAllDots(redNumber) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        let amount = Dot.dots.length;
        if(remaining < 10000 || redNumber == 0) {

        } else if(remaining - redNumber < 10000) {
            redNumber = 10000 - (remaining - redNumber);
        } else {
            redNumber = 5000;
        }
        Dot.dotSize = Math.max(1, 1000/Math.sqrt(amount));
        Dot.dotSize = Math.min(Dot.dotSize, Dot.maxDotSize);

        let colorArr = new Array(amount).fill('#C0C0C0');
        for (let i = 0; i < redNumber; i++) {
            let index = Math.floor(Math.random() * amount);
            while (colorArr[index] === '#ff0000') {
                index = Math.floor(Math.random() * amount);
            }
            colorArr[index] = '#ff0000';
        }
        for(let i = 0; i < colorArr.length; i++) {
            Dot.dots[i].draw(colorArr[i]);
        }
    }

    static deleteReds() {
        for(let i = 0; i < Dot.dots.length; i++) {
            if(remaining <= 10000) {
                if(Dot.dots[i].red) {
                    Dot.dots.splice(i,1);
                    i--;
                }
            } else {
                Dot.dots[i].red = false;
            }
        }
        Dot.drawAllDots(0);
    }

    draw(color = '#C0C0C0') {
        if(color == '#ff0000') {
            this.red = true;
        }
        if(makeRed || !this.red) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, Dot.dotSize, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}