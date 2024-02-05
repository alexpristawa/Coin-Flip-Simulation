const root = document.querySelector(':root');
const body = document.querySelector('body');

const dayNumDiv = document.querySelector('#dayNum > h2');
const maxRoundsDiv = document.querySelector('#maxRounds > h2');
const roundNumDiv = document.querySelector('#roundNum > h2');
const foot = document.querySelector('#foot > h2');

let canvas;
let ctx;
let canvasWidth;
let canvasHeight;

let dayNum = 0;
let maxRoundsNum = 0;
let roundNum = 0;
let defaultRemainingObj = {
    burrillville: 16740,
    rhodeIsland: 1098163,
    world: 8019876189
}
let defaultRemaining = defaultRemainingObj.burrillville;
let remaining = defaultRemaining;
let makeRed = true;
let updateMakeRed = true;
let spedUp = 0;

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvasWidth = canvas.offsetWidth;
    canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    Dot.maxDotSize = canvasHeight/10;
    foot.innerHTML = `${remaining}`;
}

document.addEventListener('keydown', (event) => {
    if(event.key == 'n') {
        updateMakeRed = false;
    }
    if(event.key == 'y') {
        updateMakeRed = true;
    }
    if(event.key == 'Enter') {
        newDay();
    }
    if(event.key == 'b') {
        defaultRemaining = defaultRemainingObj.burrillville;
    }
    if(event.key == 'r') {
        defaultRemaining = defaultRemainingObj.rhodeIsland;
    }
    if(event.key == 'w') {
        defaultRemaining = defaultRemainingObj.world;
    }
    if(event.key == 's') {
        spedUp++;
    }
});

let newDay = () => {
    if(spedUp == 1) {
        requestAnimationFrame(newSpedUpDay);
        return;
    }
    dayNum++;
    roundNum = 0;
    remaining = defaultRemaining;
    dayNumDiv.innerHTML = `${dayNum}`;
    {
        let loopAmount = remaining;
        if(remaining > 10000) {
            loopAmount = 10000;
        }
        for(let i = 0; i < loopAmount; i++) {
            new Dot();
        }
    }
    let dayInterval = setInterval(() => {
        makeRed = updateMakeRed;
        newRound();
        if(remaining == 0) {
            clearInterval(dayInterval);
            setTimeout(() => {
                newDay();
            }, 1500);
        } else {
            roundNum++;
            if(roundNum > maxRoundsNum) {
                maxRoundsNum = roundNum;
            }
            roundNumDiv.innerHTML = `${roundNum}`;
            maxRoundsDiv.innerHTML = `${maxRoundsNum}`;
        }
    }, 500);
}

let newRound = () => {
    let newRemaining = 0;
    if(remaining <= 10000) {
        for(let i = 0; i < remaining; i++) {
            if(Math.random() > 0.5) {
                newRemaining++;
            }
        }
    } else {
        newRemaining = boxMullerRandom(remaining);
    }
    Dot.drawAllDots(remaining - newRemaining);
    setTimeout(() => {
        Dot.deleteReds();
    }, 250);
    remaining = newRemaining;
    foot.innerHTML = `${remaining}`;

}

let hundredSpedUp = () => {
    spedUp = 3; //So it doesn't trigger again
    for(let i = 0; i < 5; i++) {
        if(i == 10) {
            newSpedUpDay();
        } else {
            newSpedUpDay(true);
        }
    }
    requestAnimationFrame(hundredSpedUp);
}

let newSpedUpDay = (updateDom = false) => {
    if(spedUp == 2) {
        requestAnimationFrame(hundredSpedUp);
    }
    dayNum++;
    if(dayNum == 3651) {
        return;
    }
    roundNum = 0;
    remaining = defaultRemaining;
    if(updateDom) dayNumDiv.innerHTML = `${dayNum}`;
    while(remaining > 0) {
        roundNum++;
        newSpedUpRound();
    }
    if(updateDom) roundNumDiv.innerHTML = `${roundNum}`;
    if(roundNum > maxRoundsNum) {
        maxRoundsNum = roundNum;
        maxRoundsDiv.innerHTML = `${maxRoundsNum}`;
    }
    requestAnimationFrame(newSpedUpDay);
}

let newSpedUpRound = () => {
    let newRemaining = 0;
    if(remaining > 100) {
        newRemaining = boxMullerRandom(remaining);
    } else {
        for(let i = 0; i < remaining; i++) {
            console.log(remaining);
            if(Math.random() > 0.5) {
                newRemaining++;
            }
        }
    }
    remaining = newRemaining;
}

// Function to generate a normally distributed random number
function boxMullerRandom(n) {

    const p = 0.5; // Probability of getting heads
    const mu = n * p; // Mean of the distribution
    const sigma = Math.sqrt(n * p * (1 - p)); // Standard deviation of the distribution

    let u = 0, v = 0;
    while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  
    num = num * sigma + mu; // Adjust for mean and standard deviation
    return Math.round(num);
}