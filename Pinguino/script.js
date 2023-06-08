const btnVerde = document.getElementById("btn-verde");
const btnNaranja = document.getElementById("btn-naranja");
const btnCafe = document.getElementById("btn-cafe");
const barriga = document.getElementsByClassName("estomago");

changeBackgroundColor('greenyellow');

btnVerde.addEventListener('click', changeBackgroundColor.bind(null, 'greenyellow'));
btnNaranja.addEventListener('click', changeBackgroundColor.bind(null, 'orange'));
btnCafe.addEventListener('click', changeBackgroundColor.bind(null, 'peru'));

function changeBackgroundColor(color) {
    for (let i = 0; i < barriga.length; i++) {
        barriga[i].style.backgroundColor = color;
    }
}