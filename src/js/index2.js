let divElement = document.createElement("div");
let pElement = document.createElement("p");

let inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("id", "date");
inputDate.setAttribute("value", "2024-10-13");
let actualDate = new Date();
let mes = String(actualDate.getMonth()+1).padStart(2,0);
let dia = String(actualDate.getDate()).padStart(2,0);
let fechaActual = actualDate.getFullYear() + "-" + mes + "-" + dia;
console.log(fechaActual);
inputDate.setAttribute("min", fechaActual);
console.log(inputDate);
document.body.append(inputDate);


//2024-10-13
let targetDate = new Date('10/13/2024');

let seconds;
let minutes;
let hours;
let days;
let months;

/*
seconds = 3;
minutes = 0;
hours = 0;
days = 14;
months = 0;
*/


inputDate.addEventListener("change", () => {
  let date = document.getElementById("date").value;
  date = date.split("-");
  let anio = date[0];
  let mes = date[1]-1;
  console.log(mes);
  let dia = date[2];
  console.log(dia);

  targetDate = new Date(anio, mes, dia);
  console.log(targetDate);
  console.log(actualDate);
  let totalMs = targetDate - actualDate;
  console.log(totalMs);
  totalSeconds = totalMs / 1000;

  months = Math.trunc(totalSeconds / 2592000);
  totalSeconds %= 2592000;

  days = Math.trunc(totalSeconds / 86400);
  totalSeconds %= 86400;

  hours = Math.trunc(totalSeconds / 3600);
  totalSeconds %= 3600;

  minutes = Math.trunc(totalSeconds / 60);
  totalSeconds %= 60;

  seconds = Math.trunc(totalSeconds);

  let flag = false;
  let interval = setInterval(() => {

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
      if (months >= 1) {
        pElement.classList = "textGreen";
      } else if (days >= 14) {
        pElement.classList = "textBlack";
      } else if (days >= 7) {
        pElement.classList = "textOrange";
      } else {
        pElement.classList = "textRed";
      }
      pElement.innerText = months + ":" + days + ":" + hours + ":" + minutes + ":" + seconds;
    } else {
      pElement.innerText = "Feliz Cumpleaños !!!";
      clearInterval(interval);
    }
  
  }, 1000);
})

document.body.append(pElement);