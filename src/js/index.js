//Father container, this div contains a h1 and child div
let divElement = document.createElement("div");
divElement.setAttribute("id", "divParent");

//This h1 has the tittle of the timer
let h1Element = document.createElement("h1");
h1Element.setAttribute("id", "tittle");
h1Element.innerText = "Counter";

//This child div contains the information and the countdown of the timer.
let container = document.createElement("div");
container.setAttribute("id", "divChild");

//infoDate contains the countdown information, that is, the top text of the counter (months, days...)
let infoDate = document.createElement("p");
infoDate.setAttribute("id", "infoDate");

//pElement has the timer (Months:days:hours:minutes:seconds)
let pElement = document.createElement("p");
pElement.setAttribute("id", "textCounter");

//This input has the posibility of change the target date. The date default is my birthday :)
let inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");
inputDate.setAttribute("value", "2024-10-13");

//If we click we can restore the counter and change the target date
inputDate.addEventListener("change", getCounter);

//This contains today's date.
let actualDate = new Date();

getCounter();

//Insert all the components in the body element with their childs.
document.body.append(divElement);
divElement.appendChild(h1Element);
divElement.appendChild(container);
container.appendChild(infoDate);
container.appendChild(pElement);
container.appendChild(inputDate);

/**
 * This function get the counter. 
 * First part is for compute the total seconds of the current date.
 * Then set the countdown to avoid negative numbers and print with the correct color.
 */
function getCounter(){
  infoDate.innerText = "Month(s) Day(s) Hour(s) Minute(s) Second(s)";
  targetDate = new Date(inputDate.value);
  //Total seconds for the counter.
  let totalSeconds = (targetDate - actualDate) / 1000;

  let months = Math.trunc(totalSeconds / 2592000);
  totalSeconds %= 2592000;

  let days = Math.trunc(totalSeconds / 86400);
  totalSeconds %= 86400;

  //(7200 seconds = 2 hours) are subtracted so that the counter matches the current time .
  let hours = Math.trunc((totalSeconds-7200) / 3600); 
  totalSeconds %= 3600;

  let minutes = Math.trunc(totalSeconds / 60);
  totalSeconds %= 60;

  let seconds = Math.trunc(totalSeconds);

  //This allows if there is any interval in operation on the page, it can be canceled for correct performance in case the user enters a new date.
  if (window.interval) clearInterval(window.interval);

  //Flag for check if the target date has arrived.
  let flag = false;
  
  //window.interval is a global enviroment varible that can do posible the reset of the interval. 
  //This variable can store the id of setInterval to end the interval if necessary.
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
      pElement.innerText = "Happy Birthday !!!";
      clearInterval(interval);
    }

  }, 1000);
}




