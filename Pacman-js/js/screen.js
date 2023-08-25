let canvas;
let context;
let sObj = {};
let x = 0,
    y = 0;
let level = []
const scoreText = document.getElementById('score-text')
let score = 0;

let setScreenObj = (screenObj) => {
     sObj = screenObj;
} ;

let setGameLevel = (gameLevel) => {
	level = gameLevel;
};

let drawScreen = () =>{
    canvas = document.getElementById(sObj.canvasId);
    canvas.height = sObj.height;
    canvas.width = sObj.width;
    context = canvas.getContext("2d");
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(0,0,sObj.width, sObj.height)
};

let drawLevel = () => {
    for (const yElement of level){
        for(const xElement of yElement){
            switch(xElement){
                case 1: // PARED
                    context.fillStyle = "blue"; 
                    context.fillRect(x , y, sObj.dimension, sObj.dimension);
                    break;
                case 2: // FANTASMA
                    context.beginPath();
                    context.fillStyle = "#6A2CE3";
                    context.beginPath();
                    context.fillStyle = "purple"
                    context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension /2.8, 
                    Math.PI * 0.15,
                    Math.PI * 1.85,
                    false
                    );
                    context.lineTo(x+sObj.dimension/2,y+sObj.dimension/2)
                    context.closePath();
                    context.fill();
                    break;
                case 3: // SUPER COMIDA
                    context.beginPath();
                    context.fillStyle = "green";
                    context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension / 4, 
                    0,
                    Math.PI * 2,
                    true
                    );
                    context.closePath();
                    context.fill();
                    break;
                    case 4: // COMIDA
                    context.beginPath();
                    context.fillStyle = "#FEFF9F";
                    context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension / 8, 
                    0,
                    Math.PI * 2,
                    true
                    );
                    context.closePath();
                    context.fill();
                    break;
                case 5: // PACMAN
                    context.beginPath();
                    context.fillStyle = "yellow"
                    context.arc(
                    x + sObj.dimension / 2,
                    y + sObj.dimension / 2,
                    sObj.dimension /2.8, 
                    Math.PI * 0.15,
                    Math.PI * 1.85,
                    false
                    );
                    context.lineTo(x+sObj.dimension/2,y+sObj.dimension/2)
                    context.closePath();
                    context.fill();
                    break;
            }
            //Math.PI*0.15, Math.PI * 1.85, false
            x = x + sObj.dimension;
            }
        y = y + sObj.dimension;
        x = 0;
    }
};

let movePacman = (dir, pos) => {
    let arrowPosX = 0,
        arrowPosY = 0;
    let nextPos = 0,
        prevPos = 0;

    switch(dir){
        case "ArrowLeft":
            arrowPosY = pos[1];
            arrowPosX = pos[0] - 1;
            nextPos = level[arrowPosY][arrowPosX];
            break;
        case "ArrowRight":
            arrowPosY = pos[1];
            arrowPosX = pos[0] + 1;
            nextPos = level[arrowPosY][arrowPosX];
            break;
        case "ArrowUp":
            arrowPosY = pos[1] - 1;
            arrowPosX = pos[0];
            nextPos = level[arrowPosY][arrowPosX];
            break;
        case "ArrowDown":
            arrowPosY = pos[1] + 1;
            arrowPosX = pos[0];
            nextPos = level[arrowPosY][arrowPosX];
            break;
    }

    if ([0, 3, 4, 6].includes(nextPos)) {
        level[pos[1]][pos[0]] = 0; // level [x][y] ya me lo comi
        if(level[arrowPosY][arrowPosX] == 4){ // si es comida
            score++;
            scoreText.innerHTML = `Score: ${score}`
        }
        level[arrowPosY][arrowPosX] = 5; // pacman se movio
        pos = [arrowPosX, arrowPosY];
        drawPacman(dir, pos);
    }
    return pos;
};

let drawPacman = (dir, pos) => {
    let x = pos[0] * sObj.dimension;
    let y = pos[1] * sObj.dimension;

    clearRect(dir, pos);

    switch(dir){
        case "ArrowLeft":
            context.beginPath();
            context.fillStyle = "yellow";
            context.arc(
                x + sObj.dimension / 2,
                y + sObj.dimension / 2,
                sObj.dimension / 2.8,
                Math.PI * 0.75,
                Math.PI * 1.25,
                true
            );
            context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
            context.closePath();
            context.fill();
            break;
        case "ArrowRight":
            context.beginPath();
            context.fillStyle = "yellow";
            context.arc(
                x + sObj.dimension / 2,
                y + sObj.dimension / 2,
                sObj.dimension / 2.8,
                Math.PI * 0.15,
                Math.PI * 1.85,
                false
            );
            context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
            context.closePath();
            context.fill();
            break;
        case "ArrowUp":
            context.beginPath();
            context.fillStyle = "yellow";
            context.arc(
                x + sObj.dimension / 2,
                y + sObj.dimension / 2,
                sObj.dimension / 2.8,
                Math.PI * 1.70,
                Math.PI * 1.30,
                false
            );
            context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
            context.closePath();
            context.fill();
            break;
        case "ArrowDown":
            context.beginPath();
            context.fillStyle = "yellow";
            context.arc(
                x + sObj.dimension / 2,
                y + sObj.dimension / 2,
                sObj.dimension / 2.8,
                Math.PI * 0.70,
                Math.PI * 0.30,
                false
            );
            context.lineTo(x + sObj.dimension / 2, y + sObj.dimension / 2);
            context.closePath();
            context.fill();
            break;
    }
};

let clearRect = (dir, pos) => {
    let cRX = pos[0];
    let cRY = pos[1];
    context.fillStyle = sObj.backgroundColor;
    context.fillRect(
        pos[0] * sObj.dimension,
        pos[1] * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );

    switch(dir){
        case "ArrowLeft": cRX++; break;
        case "ArrowRight": cRX--; break;
        case "ArrowUp": cRY++; break;
        case "ArrowDown": cRY--; break;
    }
    context.fillRect(
        cRX * sObj.dimension,
        cRY * sObj.dimension,
        sObj.dimension,
        sObj.dimension
    );
};
export { setScreenObj, setGameLevel, drawScreen, drawLevel, movePacman};