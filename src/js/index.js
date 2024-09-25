let divElement = document.createElement("div");
divElement.setAttribute("id", "divParent");
let h1Element = document.createElement("h1");
h1Element.setAttribute("id", "tittle");
h1Element.innerText = "Counter";
let container = document.createElement("div");
container.setAttribute("id", "divChild");
let infoDate = document.createElement("p");

infoDate.setAttribute("id", "infoDate");
let pElement = document.createElement("p");
pElement.setAttribute("id", "textCounter");
let inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");

let actualDate = new Date();
inputDate.setAttribute("value", "2024-10-13");
getCounter();
function getCounter(){
  infoDate.innerText = "Month(s) Day(s) Hour(s) Minute(s) Second(s)";
  targetDate = new Date(inputDate.value);
  console.log(inputDate.value);
  let totalSeconds = (targetDate - actualDate) / 1000;

  let months = Math.trunc(totalSeconds / 2592000);
  totalSeconds %= 2592000;

  let days = Math.trunc(totalSeconds / 86400);
  totalSeconds %= 86400;

  let hours = Math.trunc((totalSeconds-7200) / 3600); //Se restan 2 horas para que el contador cuadre con el horario actual.
  totalSeconds %= 3600;

  let minutes = Math.trunc(totalSeconds / 60);
  totalSeconds %= 60;

  let seconds = Math.trunc(totalSeconds);

  if (window.interval) clearInterval(window.interval);
  let flag = false;
  window.interval = setInterval(() => {

    if (seconds < 1) {
      seconds = 60;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hours--;
        if (hours < 0) {
          hours = 23;
          days--;
          if (days < 0) {
            days = 30;
            months--;
          } if (months < 0) {
            flag = true;
          }
        }
      }
    }

    if (!flag) {
      seconds--;
      pElement.className = "";
      infoDate.className = "";
      if (months >= 1) {
        pElement.classList.add("textGreen");
        infoDate.classList.add("textGreen");
      } else if (months < 1 && days > 6) {
        pElement.classList.add("textOrange");
        infoDate.classList.add("textOrange");
      } else {
        pElement.classList.add("textRed");
        infoDate.classList.add("textRed");
      }
      pElement.innerText = months + ":" + days + ":" + hours + ":" + minutes + ":" + seconds;
    } else {
      infoDate.innerText = "";
      pElement.className = "";
      pElement.classList.add("textMagenta");
      pElement.innerText = "¡¡¡ Feliz Cumpleaños !!!";
      clearInterval(interval);
    }

  }, 1000);
}

inputDate.addEventListener("change", getCounter);

document.body.append(divElement);
divElement.appendChild(h1Element);
divElement.appendChild(container);
container.appendChild(infoDate);
container.appendChild(pElement);
container.appendChild(inputDate);


