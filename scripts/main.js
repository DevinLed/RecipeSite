// crates array for json input

let recipeCollection = [];
const searchText = document.querySelector("#filterInput");
const APP_ID = "e9121c76";
const API_KEY = "56b9fc8ce334b4a7a762c9a5d815ab88";
const baseUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}`;
const searchButton = document.querySelector("#searchAll");
const recipeContainer = document.querySelector(".listcontainer");
const currSearch = document.querySelector(".currentSearch");

let toolsCheck = 0;

//search function when button is pressed
searchButton.addEventListener("click", () => {
  currSearch.style.height = "25px";
  recipeContainer.innerHTML =
    "<div class='loadBar'><div class='loader'></div></div>";
  setTimeout(() => {
    loadRecipes(searchText.value);
    if (searchText.value != null) {
      currSearch.innerHTML = "No search inputted.";
      currSearch.style.height = "20vh";
    } else {
      console.log(false);
    }
  }, 200);
});
//search function at the press of Enter
searchText.addEventListener("keyup", (e) => {
  const inputVal = searchText.value;
  if (e.keyCode === 13) {
    currSearch.style.height = "25px";
    recipeContainer.innerHTL =
      "<div class='loadBar'><div class='loader'></div></div>";
    setTimeout(() => {
      loadRecipes(inputVal);
    }, 200);
  }
});

//loads list of pizza recipes by calling cnst renderRecipies
function loadRecipes(type = "Pizza") {
  recipeContainer.innerHTML = "<div class='loader'></div>";
  setTimeout(() => {
    const url = baseUrl + `&q=${type}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => renderRecipies(data.hits))
      .catch((error) => console.log(error));
  }, 200);
  currSearch.innerHTML = "Current Search: ";
  currSearch.insertAdjacentHTML("beforeend", type);
}

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
    var colors = [
      "rgb(116, 88, 60, 0.5)",
      "rgb(132, 137, 147, 0.5)",
      "rgb(196, 185, 168, 0.5)",
      "rgb(114, 73, 48, 0.5)",
      "rgb(117, 129, 155, 0.5)",
      "rgb(109, 156, 69, 0.5)",
      "rgb(140, 123, 106, 0.5)",
      "rgb(121, 52, 6, 0.5)",
      "rgb(90, 107, 112, 0.5)",
      "rgb(99, 66, 40, 0.5)",
      "rgb(190, 152, 116, 0.5)",
      "rgb(70, 50, 29, 0.5)",
      "rgb(109, 78, 50, 0.5)",
    ];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    let htmlStr = `

    <ul class="expandlist" style="padding-left: 0px;">
        <li class="collection-header">
        
            <div class="details-example" style="background-color: ${randomColor}">
            <summary class="collectionSummary"><img class="previewimg" src="${recipeImage}"/><p class="titleWord">${recipeTitle}</p>        
            </summary>
            <div class= "extraDetails">
                <div class="sidePanel">`;
    if (time === 0) {
      htmlStr += `
                             <p class="cookTime">This item is not cooked</p>`;
    } else {
      htmlStr += `
                             <p class="cookTime">Total cooking time is ${time} minutes</p>`;
    }
    htmlStr += `
                <p>Serves: ${feeds}</p>
                <p>${dishType}</p>
                </div>
                </div>
              <div class="btnExtra">
              <div class="directionBtn">
                <button type="submit" title="Visit external site" class="directionLink"><a href="${url}" target="_blank">Show Full Recipe</button></a>
                </div>
                <div class="showdets">
                  <button type="submit" title="View details" class="showDetails">View Details</button>
                  <ul class="list">
                  
                  <div class="recipeCardDiv">
                  <button type="submit" title="View details" class="hideDetails">Close</button>
                  <h style="margin-top:0;font-size: 25px;font-style:bold;margin-bottom: 5px;">${recipeTitle}</h>
                  <img class="previewimgopen" src="${recipeImage}"/>
                  <p style="font-size: 18px;margin-top: 0;">Ingredients: </p>
                  <div class="recipeCard">
                  <div class="recipeCardList">
                  `;
    //loads list of ingredients from json for each initial item

    ingredientLines.forEach((ingredient) => {
      htmlStr += `
                    <li class="collection-item">${ingredient}</li>`;
    });
    htmlStr += `
                  
                    
                    </div>
                  <p style="font-size:18px;text-align:center;">Health Information: </p>
                    <ul class = "healthinfo">
                   `;
    //list of all health labels
    health.forEach((health) => {
      htmlStr += `<li>${health}</li>`;
    });
    htmlStr += `
                  
                    </ul>
                    <div style="text-align:center;">
                  <button type="submit" title="Visit external site" class="recipeCardLink"><a href="${url}" target="_blank">Show Full Recipe</button></a>
                  </div>
                    </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                    </li>
                    </ul>
                  `;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    document.querySelector(".expandlist").style.transition = "all 2s";
  });

  let cbox = document.querySelectorAll(".showDetails");

  let hbox = document.querySelectorAll(".hideDetails");
  let detailsShown = false;
  let blkBkg = document.getElementById("blackBackground");
  cbox.forEach((showdets) => {
    showdets.addEventListener("click", function (event) {
      if (detailsShown === false) {
        
        event.currentTarget.nextElementSibling.children[0].classList.add(
          "open-details"
        );
        blkBkg.style.visibility= "visible";
        event.target.textContent = "Hide Details";
        detailsShown = !detailsShown;
      } else {
        event.target.textContent = "View Details";
        event.currentTarget.nextElementSibling.children[0].classList.remove(
          "open-details"
        );
        detailsShown = !detailsShown;
      }
    });
  });
  hbox.forEach((showdets) => {
    showdets.addEventListener("click", function (event) {
      
      blkBkg.style.visibility= "hidden";
      detailsShown = !detailsShown;
      event.currentTarget.parentNode.classList.remove("open-details");
      event.currentTarget.parentNode.parentNode.previousElementSibling.textContent =
        "View Details";
      console.log(false);
    });
  });
};

function clearInput() {
  document.getElementById("filterInput").value = "";
  currSearch.style.height = "20vh";

  var output = "";
  //generates initial clickable item in list
  output += `
    <ul class="expandlist" style="display:none;">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collectionSummary"></summary>
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

  currSearch.innerHTML = "Current Search: Cleared";
  document.querySelector(".listcontainer").innerHTML = output;
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

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let poptimer = document.getElementById("sidebar");

function openTools() {
  toolbarhide.classList.add("open-toolbar");
  popcnvt.classList.add("open-cnvt");
  poptimer.classList.add("open-timer");
}
function closeTools() {
  toolbarhide.classList.remove("open-toolbar");
  popcnvt.classList.remove("open-cnvt");
  poptimer.classList.remove("open-timer");
  toolsCheck = 0;
}

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
}

let popcnvt = document.getElementById("converter");
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
  inputOunces.value = "Oz";
  inputGrams.value = "g";
  inputCups.value = "cups";
  inputTbl.value = "tbsp";
  inputTsp.value = "tsp";
  inputMl.value = "ml";
  inputDOunces.value = "Oz";
  inputDGrams.value = "g";
  inputDCups.value = "cups";
  inputDTbl.value = "tbsp";
  inputDTsp.value = "tsp";
  inputDMl.value = "ml";
}
function openConverter() {
  popcnvt.classList.add("open-cnvt");
}

document.addEventListener("DOMContentLoaded", function () {
  loadRecipes();
  console.log("Content Loaded");
});
