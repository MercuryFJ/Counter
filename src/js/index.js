let pElement = document.createElement("p");
let inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("id", "date");


/*function parseDate(date){
  let arrayDate= date.split("-");
  let year = arrayDate[0];
  let month = arrayDate[1]-1; //Se le pone -1 porque los meses van del 0 al 11
  let day = arrayDate[2];
  return new Date(year, month, day);
}*/

function getSeconds(actualDate, targetDate){
  let totalSeconds = (targetDate - actualDate) / 1000;

  let months = Math.trunc(totalSeconds / 2592000);
  totalSeconds %= 2592000;

  let days = Math.trunc(totalSeconds / 86400);
  totalSeconds %= 86400;

  let hours = Math.trunc(totalSeconds / 3600);
  totalSeconds %= 3600;

  let minutes = Math.trunc(totalSeconds / 60);
  totalSeconds %= 60;

  let seconds = Math.trunc(totalSeconds);

  return [months, days, hours, minutes, seconds];
}

let actualDate = new Date();
inputDate.value = "2024-10-13";
let targetDate = new Date(inputDate.value);
let totalMs = targetDate - actualDate;
let arrayDate = getSeconds(actualDate, targetDate);

let totalSeconds = (targetDate - actualDate) / 1000;

  let months = Math.trunc(totalSeconds / 2592000);
  totalSeconds %= 2592000;

  let days = Math.trunc(totalSeconds / 86400);
  totalSeconds %= 86400;

  let hours = Math.trunc(totalSeconds / 3600);
  totalSeconds %= 3600;

  let minutes = Math.trunc(totalSeconds / 60);
  totalSeconds %= 60;

  let seconds = Math.trunc(totalSeconds);

  let flag=false;
setInterval(() => {

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
    if (months > 1) {
      pElement.classList = "textGreen";
    } else if (months < 1) {
      pElement.classList = "textOrange";
    } else if (days < 7) {
      pElement.classList = "textRed";
    }
    pElement.innerText = months + ":" + days + ":" + hours + ":" + minutes + ":" + seconds;
  } else {
    pElement.innerText = "Feliz Cumpleaños !!!";
    clearInterval(interval);
  }

}, 1000);

document.body.append(pElement);
document.body.append(inputDate);
