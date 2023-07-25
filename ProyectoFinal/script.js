// Declaracion e inicialización de variables
const PIEDRA = "rock";
const PAPEL = "paper";
const TIJERA = "scissors";

const NOMBRE_NPC = "Carlos";
const TXT_PLAYER = "Puntuacion del Jugador: ";
const TXT_COMPUTER = `Puntuacion de ${NOMBRE_NPC}: `;

const EMPATE = 0;
const VICTORIA = 1;
const DERROTA = 2;

let puntajeJugador = 0;
let puntajeComputadora = 0;
let rondaJuego = 3;
let clicHabilitado = true;

const frasesVictoria = [
"Tuviste suerte",
"Para que sonrías un rato",
"Incluso perdiendo, soy el mejor.",
"Esto no cambia mi grandeza.",
"Las derrotas no me inquietan.",
"Te dejé ganar",
"Este revés es insignificante.",
"Las derrotas son temporales.",
"Ni las derrotas me detienen.",
"Incluso perdiendo, soy imbatible.",
];


const frasesDerrota = [
"Caíste ante mi grandeza.",
"Soy inalcanzable para ti.",
"Mi victoria era inevitable.",
"Las derrotas no me afectan.",
"La grandeza está en mí.",
"¿Esperabas vencerme? Iluso/a.",
"Mi talento es insuperable.",
"No hay nadie como yo.",
"Admira mi superioridad.",
"Tus esfuerzos son en vano.",
"Solo los mediocres caen.",
"La victoria siempre es mía.",
"Mis habilidades son supremas.",
"Mi grandeza es indiscutible.",
"Soy el único que importa.",
"Deberías rendirte ante mí.",
];

const btnPiedra = document.getElementById('rock');
const btnPapel = document.getElementById('paper');
const btnTijera = document.getElementById('scissors');
const txtResultado = document.getElementById('start-text');
const imgUsuario = document.getElementById('user-img');
const imgMaquina = document.getElementById('machine-img');
const txtScorePlayer = document.getElementById('score-player');
const txtScoreComputer = document.getElementById('score-computer');
const txtScoreRound = document.getElementById('score-round');
const gameCountElement = document.getElementById('game-count');

btnPiedra.addEventListener('click', ()=>{
    jugar(PIEDRA);
});
btnPapel.addEventListener('click', ()=>{
    jugar(PAPEL);
});
btnTijera.addEventListener('click', ()=>{
    jugar(TIJERA);
});

txtScorePlayer.innerHTML = TXT_PLAYER + puntajeJugador;
txtScoreComputer.innerHTML = TXT_COMPUTER + puntajeComputadora;

function jugar(opcionJugador){

    // Verifica si el botón está deshabilitado (se ha hecho clic previamente)
    if(clicHabilitado){
    
        // Deshabilitar los botones temporalmente para evitar sobre-clicks
        clicHabilitado = false;
        
        // Animacion de las imagenes en el detalle de resultados
        const interval = setInterval(function(){
            const opcionNPC = calcOpcionNPC();
            imgMaquina.src = `img/${opcionNPC}.svg`;
            imgUsuario.src = `img/${opcionNPC}.svg`;
        }, 200);
    
        setTimeout(function(){
            clearInterval(interval);
    
            const opcionNPC = calcOpcionNPC();
            const resultado = calcularResultado(opcionJugador, opcionNPC); 
    
            txtScoreRound.innerHTML = rondaJuego - 1;
            imgUsuario.src = `img/${opcionJugador}.svg`;
            imgMaquina.src = `img/${opcionNPC}.svg`;
    
            switch(resultado){
                case EMPATE:
                    rondaJuego--;
                    txtResultado.innerHTML = "¡Tenemos un empate!";
                    break;
                case VICTORIA:
                    rondaJuego--;
                    puntajeJugador++;
                    const vIndiceAleatorio = Math.floor(Math.random() * frasesVictoria.length);
                    txtScorePlayer.innerHTML = TXT_PLAYER + puntajeJugador;
                    txtResultado.innerHTML = frasesVictoria[vIndiceAleatorio];
                    break;
                case DERROTA:
                    rondaJuego--;
                    puntajeComputadora++;
                    const dIndiceAleatorio = Math.floor(Math.random() * frasesDerrota.length);
                    txtScoreComputer.innerHTML = TXT_COMPUTER + puntajeComputadora;
                    txtResultado.innerHTML = frasesDerrota[dIndiceAleatorio];
                    break;
            }

            conteoDeEspera();

            if(rondaJuego == 0){
                setTimeout(function(){
                    if(puntajeJugador == puntajeComputadora){
                        txtResultado.innerHTML = "EMPATE 😌";
                    }else if(puntajeJugador > puntajeComputadora){
                        txtResultado.innerHTML = "VICTORIA 🎉";
                    }else{
                        txtResultado.innerHTML = "PERDISTE 😎";
                    }
                    rondaJuego = 3;
                    puntajeComputadora = 0;
                    puntajeJugador = 0;
                    txtScorePlayer.innerHTML = TXT_PLAYER + puntajeJugador;
                    txtScoreComputer.innerHTML = TXT_COMPUTER + puntajeComputadora;
                    txtScoreRound.innerHTML = rondaJuego;
                }, 3000);
            }
        }, 2000);

        txtResultado.innerHTML = "¡Piedra, papel, tijera!";
        gameCountElement.innerText = "5";

        // Habilitar nuevamente los botones despues de un tiempo
        setTimeout(function(){
            clicHabilitado = true;
        }, 8000);
    }
}

function calcOpcionNPC(){
    const numeroNPC = Math.floor(Math.random() * 3);

    switch(numeroNPC){
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIJERA;
    }
}

function calcularResultado(opcionJugador, opcionNPC){
    if(opcionJugador === opcionNPC){
        return EMPATE;
    }else if(opcionJugador === PIEDRA){
        if(opcionNPC === PAPEL) return DERROTA;
        if(opcionNPC === TIJERA) return VICTORIA;
    }else if(opcionJugador === PAPEL){
        if(opcionNPC === TIJERA) return DERROTA;
        if(opcionNPC === PIEDRA) return VICTORIA;
    }else if(opcionJugador === TIJERA){
        if(opcionNPC === PIEDRA) return DERROTA;
        if(opcionNPC === PAPEL) return VICTORIA;
    }
}

function conteoDeEspera() {
    let tiempoEspera = 6;
    var timeInterval = setInterval(function(){
        if(tiempoEspera > 0){
            tiempoEspera--;
            gameCountElement.innerText = tiempoEspera;
            gameCountElement.classList.remove('animate-counter');
            void gameCountElement.offsetWidth; // Reiniciar la animación
            gameCountElement.classList.add('animate-counter');
        }else{
            clearInterval(timeInterval);
            tiempoEspera = 6;
        }
    }, 1000);
}

// TODO: logica de sidebar
const sidebar = document.getElementById('sidebar');
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', ()=>{
    sidebar.classList.toggle('close');
});

// TODO: Mode-toggle light<-->dark

const modeToggle = document.getElementById('mode-toggle');
const body = document.querySelector('body');
const resultDetail = document.getElementById('result-detail');
const iconElement = modeToggle.querySelector('i');

modeToggle.addEventListener('click', ()=>{
    body.classList.toggle('dark-mode');
    resultDetail.classList.toggle('dark-mode');

    // Alternar entre dark mode y light mode cambiando la clase del icono
    if (modeToggle.classList.contains('dark-mode')) {
    // Cambiar a light mode
    modeToggle.classList.remove('dark-mode');
    modeToggle.classList.add('light-mode');
    iconElement.classList.remove('ri-moon-line');
    iconElement.classList.add('ri-sun-line');
    } else {
    // Cambiar a dark mode
    modeToggle.classList.remove('light-mode');
    modeToggle.classList.add('dark-mode');
    iconElement.classList.remove('ri-sun-line');
    iconElement.classList.add('ri-moon-line');
    }
    
});