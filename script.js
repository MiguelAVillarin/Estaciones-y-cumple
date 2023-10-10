const daysElement = document.getElementById('diasCum');
const hoursElement = document.getElementById('horasCum');
const minsElement = document.getElementById('minutosCum');
const secondsElement = document.getElementById('segundosCum');

const daysEst = document.getElementById('diasEst');
const hoursEst = document.getElementById('horasEst');
const minsEst = document.getElementById('minutosEst');
const secondsEst = document.getElementById('segundosEst');
const estacionActual=document.getElementById('estacionActual');
const estacionProxima=document.getElementById('estacionProxima');
const fondo=document.body;

const felecitacion=document.getElementById("felicitacion");
const tarta=document.getElementById("tarta");

let currentDate = new Date();
let goalDate = new Date(2024, 0, 21, 0, 0); // Año, mes (enero==0), día, hora, minutos¡
let months, days, hours, mins, seconds, totalSeconds;

let primaveraDate = new Date(2024, 2, 21, 1, 0);
let veranoDate = new Date(2024, 5, 21, 19, 0);
let otonoDate = new Date(2023, 8, 23, 10, 0);
let inviernoDate = new Date(2023, 11, 22, 7, 0);

let arrayEst;

let primaveraS, veranoS, otonoS, inviernoS, segundosEstaciones = 0;
let daysSEst, hoursSEst, minsSEst, secondsSEst;

let countdownInterval = setInterval(countdown, 1000);
countdown();

function countdown() {
  currentDate=new Date();
  countdownEst();
  totalSeconds = (goalDate - currentDate) / 1000;

  // Condición para comprobar si ha llegado la hora establecida
  if (Math.floor(totalSeconds) <= 0) {
    esCumple();
    return;
  }

  //Para saber el equivalente de 1 segundo - dias se dividen los segundos entre 86400 o entre 3600 y luego entre 24
  //Para saber el equivalente de 1 segundo - horas se dividen los segundos entre 3600
  //Para saber el equivalente de 1 segundo - minutos se dividen los segundos entre 60

  days = Math.floor(totalSeconds / 3600 / 24);
  hours = Math.floor(totalSeconds / 3600) % 24;
  mins = Math.floor(totalSeconds / 60) % 60;
  seconds = Math.floor(totalSeconds) % 60;

  daysElement.innerHTML = days;
  hoursElement.innerHTML = hours;
  minsElement.innerHTML = mins;
  secondsElement.innerHTML = seconds;

};

function esCumple() {
  if(currentDate.getDay() === goalDate.getDay()){
    felecitacion.innerText="Feliz Cumpleaños";
    secondsElement.innerText=0;
    tarta.src="tarta.webp";
    daysElement.innerHTML = 0;
  hoursElement.innerHTML = 0;
  minsElement.innerHTML = 0;
  secondsElement.innerHTML = 0;
  }else{
    felecitacion.innerText="";
    tarta.src="";
    resetFecha(goalDate);
  }
}

function countdownEst() {

  if (Math.floor(segundosEstaciones) <= 0) {
    arrayEst = 0;
    resetFecha(primaveraDate);
    resetFecha(veranoDate);
    resetFecha(otonoDate);
    resetFecha(inviernoDate);
    primaveraS = (primaveraDate - currentDate) / 1000;
    veranoS = (veranoDate - currentDate) / 1000;
    otonoS = (otonoDate - currentDate) / 1000;
    inviernoS = (inviernoDate - currentDate) / 1000;
    arrayEst = [primaveraS, veranoS, otonoS, inviernoS];
    arrayEst.sort(function (a, b) { return b - a });
    segundosEstaciones=arrayEst[3];

    switch (segundosEstaciones) {
      case primaveraS:
        estacionProxima.innerText="Primavera";
        estacionActual.innerText="Invierno";
        fondo.className="invierno";
        break;
      case veranoS:
        estacionProxima.innerText="Verano";
        estacionActual.innerText="Primavera";
        fondo.className="primavera";
        break;
      case otonoS:
        estacionProxima.innerText="Otoño";
        estacionActual.innerText="Verano";
        fondo.className="verano";
        break;
      default:
        estacionProxima.innerText="Invierno";
        estacionActual.innerText="Otoño";
        fondo.className="otono";
        break;
    }

  }

  switch (estacionProxima.innerText) {
    case "Verano":
        segundosEstaciones=(veranoDate - currentDate) / 1000;
      break;
      case "Otoño":
        segundosEstaciones=(otonoDate- currentDate) / 1000;
      break;
      case "Invierno":
        segundosEstaciones=(inviernoDate - currentDate) / 1000;
      break;
    default:
        segundosEstaciones=(primaveraDate - currentDate) / 1000;
      break;
  }
  daysSEst = Math.floor(segundosEstaciones / 3600 / 24);
  hoursSEst = Math.floor(segundosEstaciones / 3600) % 24;
  minsSEst = Math.floor(segundosEstaciones / 60) % 60;
  secondsSEst = Math.floor(segundosEstaciones) % 60;

  daysEst.innerHTML = daysSEst;
  hoursEst.innerHTML = hoursSEst;
  minsEst.innerHTML = minsSEst;
  secondsEst.innerHTML = secondsSEst;
}

function resetFecha(fecha) {
  
  if(fecha-currentDate<=0){
    do {
      fecha.setFullYear(fecha.getFullYear()+1);
    } while (fecha-currentDate<=0);
  }
}