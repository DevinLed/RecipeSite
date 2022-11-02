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

// Loads all recipes in listcontainer, linked to button "showpop". Resets list from search function
function showAllRecipes() {
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

document.addEventListener("DOMContentLoaded", function () {
  loadAllRecipes();

  // Get input element
  let filterInput = document.getElementById("filterInput");
  // Add event listener
});
//displays popup window with name and recipe, working on including measurements+ ingredient name

function openPopup(recipeId) {
  popup.classList.add("open-popup");
  const recipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  document.getElementById("popup").innerHTML = `<li>${recipe.name}</li><li>${recipe.directions}</li>
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
let poptimer = document.getElementById("mainpage");
function openTimer(){
    poptimer.classList.add("open-timer");
}
function closeTimer(){
    poptimer.classList.remove("open-timer");
}
