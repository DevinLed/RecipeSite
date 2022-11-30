// crates array for json input

let recipeCollection = [];
const searchText = document.querySelector("#filterInput");
const APP_ID = "e9121c76";
const API_KEY = "56b9fc8ce334b4a7a762c9a5d815ab88";
const baseUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}`;
const searchButton = document.querySelector("#searchAll");
const recipeContainer = document.getElementById("listcontainer");
let toolsCheck = 0;



//search function when button is pressed
searchButton.addEventListener("click", () => {
  recipeContainer.innerHTML = "<div class='loader'></div>";
  setTimeout(() => {
    loadRecipes(searchText.value);
  }, 200);
});
//search function at the press of Enter
searchText.addEventListener("keyup", (e) => {
  const inputVal = searchText.value;
  if (e.keyCode === 13) {
    recipeContainer.innerHTL = "<div class='loader'></div>";
    setTimeout(() => {
      loadRecipes(inputVal);
    }, 200);
  }
});

//loads list of pizza recipes by calling cnst renderRecipies
function loadRecipes(type = "pizza") {
  recipeContainer.innerHTML = "<div class='loader'></div>";
  setTimeout(() => {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => renderRecipies(data.hits))
      .catch((error) => console.log(error));
  }, 200);
}

/* temporarily disabled - testing eventlistener
function openDetails() {
  if (detailscount === 0) {
    document.getElementById("sidePanel").classList.add("open-details");
    document.getElementById("showDetails").innerHTML = "Hide Extra Details";
    detailscount++;
  } 
  else {
    document.getElementById("sidePanel").classList.remove("open-details");
    document.getElementById("showDetails").innerHTML = "View Extra Details";
    detailscount--;
  }
}
*/

//loads the list based off input in filterInput field, and calls subsequent info
const renderRecipies = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
      url: url,
      totalTime: time,
      yield: feeds,
      dishType: dishType,
      healthLabels: health,
    } = recipeObj.recipe;
    let htmlStr = `
    <ul class="expandlist" style="padding-left: 0px;">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipeTitle}</summary>
            <ul class="list">`;
    //loads list of ingredients from json for each initial item
    ingredientLines.forEach((ingredient) => {
      htmlStr += `<li class="collection-item">${ingredient}</li>`;
    });
    htmlStr += `</ul>
              <div class="imgandlink">
                <img class="previewimg" src="${recipeImage}"/>
              </div>

              <div class="directionBtn">
                <button type="submit" title="Visit external site" class="directionLink"><a href="${url}" target="_blank">Show Full Recipe</button></a>
                
                <div class="showdets">
                <button type="submit" title="View details" class="showDetails">View Extra Details</button>
                <div class= "extraDetails">
                <div class="sidePanel">
                 <p>Total cooking time is ${time} minutes</p>
                 <p>Enough for ${feeds} people</p>
                 <p>This item is a ${dishType}</p>
                 <ul class = "healthinfo">
                 `;
    //list of all health labels
    health.forEach((health) => {
      htmlStr += `<li>${health}</li>`;
    });
    htmlStr += `
                    </ul>
                    </div>
                    </div>
                </div>
              </div>
              
            </details>
        </li>
    </ul>
    `;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
  let cbox = document.querySelectorAll(".showDetails");
  cbox.forEach((showdets) => {
    let detailsShown = false;
    showdets.addEventListener("click", function (event) {
      if (detailsShown === false) {
        event.currentTarget.nextElementSibling.children[0].classList.add(
          "open-details"
        );
        event.target.textContent = "Hide Extra Details";
        detailsShown = !detailsShown;
      } else {
        event.target.textContent = "View Extra Details";
        event.currentTarget.nextElementSibling.children[0].classList.remove(
          "open-details"
        );
        detailsShown = !detailsShown;
        console.log(false);
      }
    });
  });
};

function clearInput() {
  document.getElementById("filterInput").value = "";

  var output = "";
  //generates initial clickable item in list
  output += `
    <ul class="expandlist" style="padding-left: 3px;">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header"></summary>
                <ul class="list">
                <li class="collection-item"></li>
                </ul>
                <div class="imgandlink">
                <img class="previewimg" src=""/>
                </div>
                <div class="directionBtn">
                <button type="submit" title="Visit external site" class="directionLink">Show Full Recipe</button>
                </div>
                </details>
        </li>
    </ul>
    `;

  document.getElementById("listcontainer").innerHTML = output;
}

//displays popup window with name and recipe, working on including measurements+ ingredient name
/*
function openPopup(recipeId) {
  document.getElementById("popup").classList.add("open-popup");
  const recipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  document.getElementById(
    "popup"
  ).innerHTML = `<li>${recipe.name}</li><li>${recipe.directions}</li>
    <button type="submit" class="showpop" onclick="closePopup()">Recipe</button>`;
}
function closePopup() {
  document.getElementById("popup").classList.remove("open-popup");
}
*/
let toolbarhide = document.getElementById("toolshide");

function openTools() {
  toolbarhide.classList.add("open-toolbar");
  popcnvt.classList.add("open-cnvt");
  btncnvt.classList.add("open-cnvt");
  poptimer.classList.add("open-timer");
  btntimer.classList.add("open-Btn");
}
function closeTools() {
  toolbarhide.classList.remove("open-toolbar");
  popcnvt.classList.remove("open-cnvt");
  btncnvt.classList.remove("open-cnvt");
  poptimer.classList.remove("open-timer");
  btntimer.classList.remove("open-Btn");
  toolsCheck = 0;
}

function openCnvt() {
  btntimer.classList.add("open-cnvt");
}
function closeCnvt() {
  btntimer.classList.remove("open-cnvt");
}
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let poptimer = document.getElementById("sidebar");
let btntimer = document.getElementById("showtimerbtn");

let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

startBtn.addEventListener("click", function () {
  timer = true;
  stopWatch();
});

stopBtn.addEventListener("click", function () {
  timer = false;
});

resetBtn.addEventListener("click", function () {
  timer = false;
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;
  document.getElementById("hr").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
  document.getElementById("count").innerHTML = "00";
});

function stopWatch() {
  if (timer) {
    count++;

    if (count == 100) {
      second++;
      count = 0;
    }

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    let hrString = hour;
    let minString = minute;
    let secString = second;
    let countString = count;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }

    if (count < 10) {
      countString = "0" + countString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    document.getElementById("count").innerHTML = countString;
    setTimeout(stopWatch, 0);
  }
}
//test for egg timer open/close button
function openTimer() {
  poptimer.classList.add("open-timer");
  btntimer.classList.add("open-Btn");
}
function closeTimer() {
  poptimer.classList.remove("open-timer");
  btntimer.classList.remove("open-Btn");
  toolsCheck++;
  if (toolsCheck === 2) {
    toolbarhide.classList.remove("open-toolbar");
    popcnvt.classList.remove("open-cnvt");
    btncnvt.classList.remove("open-cnvt");
    poptimer.classList.remove("open-timer");
    btntimer.classList.remove("open-Btn");
    toolsCheck = 0;
  } else {
    toolsCheck;
  }
}

function openBtn() {
  btntimer.classList.add("open-Btn");
}
function closeBtn() {
  btntimer.classList.remove("open-Btn");
}

let popcnvt = document.getElementById("converter");
let btncnvt = document.getElementById("showconverterbtn");
//weight conversion for 6 common cooking measurements LIQUID
function weightConverter(source, valNum) {
  const depends = "Depends on ingredient";
  valNum = parseFloat(valNum);
  let inputOunces = document.getElementById("inputOunces");
  let inputGrams = document.getElementById("inputGrams");
  let inputCups = document.getElementById("inputCups");
  let inputTbl = document.getElementById("inputTbl");
  let inputTspn = document.getElementById("inputTsp");
  let inputMl = document.getElementById("inputMl");
  //if statements for each type of input measurement, switch possible?
  if (source == "inputOunces") {
    inputGrams.value = (valNum * 28.35).toFixed(2);
    inputCups.value = (valNum / 8).toFixed(3);
    inputTbl.value = (valNum * 2).toFixed(2);
    inputTspn.value = (valNum * 6).toFixed(1);
    inputMl.value = (valNum * 29.5735).toFixed();
  }
  if (source == "inputGrams") {
    inputOunces.value = (valNum / 28.35).toFixed(1);
    inputCups.value = (valNum * 0.0041666666666667).toFixed(3);
    inputTbl.value = (valNum * 0.0676132521974307).toFixed(2);
    inputTspn.value = (valNum * 5.69).toFixed(1);
    inputMl.value = (valNum * 1).toFixed();
  }

  if (source == "inputCups") {
    inputOunces.value = (valNum * 8).toFixed(1);
    inputGrams.value = (valNum / 0.0041666666666667).toFixed(2);
    inputTbl.value = (valNum * 16).toFixed(2);
    inputTspn.value = (valNum * 48).toFixed(1);
    inputMl.value = (valNum * 236.588).toFixed();
  }
  if (source == "inputTbl") {
    inputOunces.value = (valNum / 2).toFixed(1);
    inputGrams.value = (valNum / 0.0676132521974307).toFixed(2);
    inputCups.value = (valNum / 16).toFixed(3);
    inputTspn.value = (valNum * 236.588).toFixed(1);
    inputMl.value = (valNum * 14.7868).toFixed();
  }
  if (source == "inputTsp") {
    inputOunces.value = (valNum / 6).toFixed(1);
    inputGrams.value = (valNum / 5.69).toFixed(2);
    inputCups.value = (valNum / 48).toFixed(3);
    inputTbl.value = (valNum / 236.588).toFixed(2);
    inputMl.value = (valNum * 4.929).toFixed();
  }
  if (source == "inputMl") {
    inputOunces.value = (valNum / 29.5735).toFixed(1);
    inputGrams.value = (valNum / 0.035274).toFixed(2);
    inputCups.value = (valNum / 236.588).toFixed(3);
    inputTbl.value = (valNum / 14.7868).toFixed(2);
    inputTspn.value = (valNum / 4.929).toFixed(1);
  }
  /* Not needed due to .toFixed()
      if ($("#outputGrams").html().length > 8) {
          short_text = $("#outputGrams").html().substr(0, 8);
          $("#outputGrams").html(short_text + "..");
        }
        if ($("#outputCups").html().length > 8) {
          short_text = $("#outputCups").html().substr(0, 8);
          $("#outputCups").html(short_text + "..");
        }
        if ($("#outputTbl").html().length > 8) {
          short_text = $("#outputTbl").html().substr(0, 8);
          $("#outputTbl").html(short_text + "..");
        }
        if ($("#outputTsp").html().length > 8) {
          short_text = $("#outputTsp").html().substr(0, 8);
          $("#outputTsp").html(short_text + "..");
        }
        if ($("#outputMl").html().length > 8) {
          short_text = $("#outputMl").html().substr(0, 8);
          $("#outputMl").html(short_text + "..");
        }
        */
}
//weight conversion for 6 common cooking measurements DRY
function weightConverterDry(source, valNum) {
  valNum = parseFloat(valNum);
  let inputDOunces = document.getElementById("inputDOunces");
  let inputDGrams = document.getElementById("inputDGrams");
  let inputDCups = document.getElementById("inputDCups");
  let inputDTbl = document.getElementById("inputDTbl");
  let inputDTspn = document.getElementById("inputDTsp");
  let inputDMl = document.getElementById("inputDMl");

  if (source == "inputDOunces") {
    inputDGrams.value = (valNum * 29.5735295625).toFixed(2);
    inputDCups.value = (valNum / 4.5).toFixed(3);
    inputDTbl.value = (valNum * 0.5).toFixed(2);
    inputDTspn.value = (valNum * 6).toFixed(1);
    inputDMl.value = (valNum * 29.5735).toFixed();
  }
  if (source == "inputDGrams") {
    inputDOunces.value = (valNum / 29.5735295625).toFixed(1);
    inputDCups.value = (valNum * 0.0041666666666667).toFixed(3);
    inputDTbl.value = (valNum * 0.0676132521974307).toFixed(2);
    inputDTspn.value = (valNum * 5.69).toFixed(1);
    inputDMl.value = (valNum * 1).toFixed();
  }

  if (source == "inputDCups") {
    inputDOunces.value = (valNum * 4.5).toFixed(1);
    inputDGrams.value = (valNum / 0.0041666666666667).toFixed(2);
    inputDTbl.value = (valNum * 16).toFixed(2);
    inputDTspn.value = (valNum * 48).toFixed(1);
    inputDMl.value = (valNum * 236.588).toFixed();
  }
  if (source == "inputDTbl") {
    inputDOunces.value = (valNum / 2).toFixed(1);
    inputDGrams.value = (valNum / 0.0676132521974307).toFixed(2);
    inputDCups.value = (valNum / 16).toFixed(3);
    inputDTspn.value = (valNum * 236.588).toFixed(1);
    inputDMl.value = (valNum * 14.7868).toFixed();
  }
  if (source == "inputDTsp") {
    inputDOunces.value = (valNum / 6).toFixed(1);
    inputDGrams.value = (valNum / 5.69).toFixed(2);
    inputDCups.value = (valNum / 48).toFixed(3);
    inputDTbl.value = (valNum / 236.588).toFixed(2);
    inputDMl.value = (valNum * 4.929).toFixed();
  }
  if (source == "inputDMl") {
    inputDOunces.value = (valNum / 29.5735).toFixed(1);
    inputDGrams.value = (valNum / 0.035274).toFixed(2);
    inputDCups.value = (valNum / 236.588).toFixed(3);
    inputDTbl.value = (valNum / 14.7868).toFixed(2);
    inputDTspn.value = (valNum / 4.929).toFixed(1);
  }
}
//clear button to wipe out all values in conversion chart
function clearMeasure() {
  inputOunces.value = (0).toFixed();
  inputGrams.value = (0).toFixed();
  inputCups.value = (0).toFixed();
  inputTbl.value = (0).toFixed();
  inputTsp.value = (0).toFixed();
  inputMl.value = (0).toFixed();
  inputDOunces.value = (0).toFixed();
  inputDGrams.value = (0).toFixed();
  inputDCups.value = (0).toFixed();
  inputDTbl.value = (0).toFixed();
  inputDTsp.value = (0).toFixed();
  inputDMl.value = (0).toFixed();
}
function openConverter() {
  popcnvt.classList.add("open-cnvt");
  btncnvt.classList.add("open-cnvt");
}
function closeConverter() {
  popcnvt.classList.remove("open-cnvt");
  btncnvt.classList.remove("open-cnvt");
  toolsCheck++;
  if (toolsCheck === 2) {
    toolbarhide.classList.remove("open-toolbar");
    popcnvt.classList.remove("open-cnvt");
    btncnvt.classList.remove("open-cnvt");
    poptimer.classList.remove("open-timer");
    btntimer.classList.remove("open-Btn");
    toolsCheck = 0;
  } else {
    toolsCheck;
  }
}

function openCnvt() {
  btntimer.classList.add("open-cnvt");
}
function closeCnvt() {
  btntimer.classList.remove("open-cnvt");
}
document.addEventListener("DOMContentLoaded", function () {
  loadRecipes();
  console.log("Content Loaded");
});
