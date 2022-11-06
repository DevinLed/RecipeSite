// crates array for json input

let recipeCollection = [];

// Loads all recipes in listcontainer to start page
function loadAllRecipes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      //array fills with json data
      recipeCollection = response.recipe;

      // uses button function to preload everything"
      showAllRecipes();
    }
  };
  xhttp.open("GET", "/json/recipe.json", true);
  xhttp.send();
}
/*
function clearInput() {
  document.getElementById("filterInput").innerHTML = `"Search recipes`;
}
*/

// Loads all recipes in listcontainer, linked to button "showpop". Resets list from search function
function showAllRecipes() {
  document.getElementById("filterInput").value = "";
  var output = "";
  //cycles through recipe.json data
  recipeCollection.forEach((recipe) => {
    //generates initial clickable item in list
    output += `
    <ul class="expandlist">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipe.name}</summary>
                <ul id="list">
    `;
    //loads list of ingredients from json for each initial item
    recipe.ingredients.forEach((ingredient) => {
      let popup = document.getElementById("popup");
      output += `<li class="collection-item">${ingredient.measure}${ingredient.name}</li>`;
    });
    output += `     
                <li class="collection-item">${recipe.directions}</li>
                </ul>
                <div class="imgandlink">
                <img class="previewimg" src="${recipe.img}"/>
                </div>
                <div class="directionBtn">
                <button type="submit" class="showpop" id="directionlink" onclick="openPopup(${recipe.id})">Show Full Recipe</button>
                </div>
                </details>
        </li>
    </ul>
    <div class="outerpop">
    <div class="popup" id="popup">
                </div>
    `;
  });
  //prints list of json values into listcontainer field
  document.getElementById("listcontainer").innerHTML = output;
}

//delay of 600ms needed after typing to search list
function debounce(func, timeout = 600) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
//compares input value to names in json
function filterNames(event) {
  filterInput.addEventListener("keyup", filterNames);
  // Get value of input
  let filterValue = document.getElementById("filterInput").value.toUpperCase();
  let ul = document.getElementById("listcontainer");
  //fills list with data pulled from json
  let li = ul.querySelectorAll("li.collection-header");
  for (let i = 0; i < li.length; i++) {
    let a = recipeCollection[i].name;
    // If matched
    if (a.toUpperCase().indexOf(filterValue) > -1) {
      //if name matched, display in list
      li[i].style.display = "";
      console.log(i);
    } else {
      //hide if not
      li[i].style.display = "none";
      console.log(false);
    }
  }
}

//runs through debounce function before actioning searchkeyevent input
/*  only working for first instance!!
    errors on backspace -1
    after initial debounce, search function runs without debounce, then again with debounce
*/
const searchKeyUpEvent = debounce((event) => filterNames(event));

//populates popup window with directions from json data
function showdirection(recipeId) {
  const recipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  document.getElementById(
    "listdirection"
  ).innerHTML = `<li>${recipe.directions}</li>`;
}

//displays popup window with name and recipe, working on including measurements+ ingredient name

function openPopup(recipeId) {
  popup.classList.add("open-popup");
  const recipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  document.getElementById(
    "popup"
  ).innerHTML = `<li>${recipe.name}</li><li>${recipe.directions}</li>
    <button type="submit" class="showpop" onclick="closePopup()">Close Recipe</button>`;
}
function closePopup() {
  popup.classList.remove("open-popup");
}

//scroll function for img scroll in footer
function scrolll() {
  var left = document.querySelector(".scroll-images");
  left.scrollBy(-350, 0);
}

function scrollr() {
  var right = document.querySelector(".scroll-images");
  right.scrollBy(350, 0);
}

//test for egg timer open/close button
let poptimer = document.getElementById("sidebar");
let btntimer = document.getElementById("showtimerbtn");
function openTimer() {
  poptimer.classList.add("open-timer");
  btntimer.classList.add("open-Btn");
}
function closeTimer() {
  poptimer.classList.remove("open-timer");
  btntimer.classList.remove("open-Btn");
}

function openBtn() {
  btntimer.classList.add("open-Btn");
}
function closeBtn() {
  btntimer.classList.remove("open-Btn");
}
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
document.addEventListener("DOMContentLoaded", function () {
  loadAllRecipes();

  // Get input element
  let filterInput = document.getElementById("filterInput");
  // Add event listener
});
