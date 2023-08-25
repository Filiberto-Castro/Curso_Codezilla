import { gameLevels } from "./js/level.js";
import { setScreenObj, setGameLevel, drawScreen, drawLevel, movePacman} from "./js/screen.js";
import { getPos } from "./js/utility.js";

let sObj = {
    height: 500,
    width: 600,
    backgroundColor: "black",
    canvasId:"canvas1",
    dimension: 20,
};
let currentLevel = 0;
let inGameLevel = [];
let pacPos = [];

class juego {
    constructor(){
        setScreenObj(sObj);
        drawScreen();
        setGameLevel([...gameLevels[currentLevel]]);
        drawLevel();
    };
    play = () =>{
        inGameLevel = [...gameLevels[currentLevel]];
        setGameLevel(inGameLevel);
        pacPos = getPos(inGameLevel,5);  
        document.addEventListener("keydown", (e) => {
            pacPos = movePacman(e.key, pacPos);
            console.log(e.key)
        });
    };
}


let PacmanJuego = new juego();
PacmanJuego.play();
