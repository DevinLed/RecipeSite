// crates array for json input

let recipeCollection = [];
const searchText = document.querySelector("#filterInput");
const APP_ID = "e9121c76";
const API_KEY = "56b9fc8ce334b4a7a762c9a5d815ab88";
const baseUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}`;
const searchButton = document.querySelector(".testsearch");
const recipeContainer = document.getElementById("listcontainer");

//search function when button is pressed
searchButton.addEventListener("click", () => {
  recipeContainer.innerHTML = "<div class='loader'></div>";
  setTimeout(() => {
  loadRecipes(searchText.value); 
  }, 700);
});
//search function at the press of Enter
searchText.addEventListener("keyup", (e) => {

  
    const inputVal = searchText.value;
    if (e.keyCode === 13) {
      recipeContainer.innerHTML = "<div class='loader'></div>"
  setTimeout(() => {
      loadRecipes(inputVal);
    }, 700);
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
  }, 500);
};

//loads the list based off input in filterInput field, and calls subsequent info
const renderRecipies = (recipeList = []) => {
  recipeContainer.innerHTML = "";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
      url: url,
    } = recipeObj.recipe;
    let htmlStr = `
    <ul class="expandlist" style="padding-left: 0px;">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipeTitle}</summary>
            <ul id="list">
             `;

    //loads list of ingredients from json for each initial item
    ingredientLines.forEach((ingredient) => {
      htmlStr += `<li class="collection-item">${ingredient}</li>`;
    });
    htmlStr += `</ul>
              <div class="imgandlink">
                <img class="previewimg" src="${recipeImage}"/>
              </div>

              <div class="directionBtn">
                <button type="submit" title="Visit external site" class="showpop" id="directionlink"><a href="${url}" target="_blank">Show Full Recipe</button></a>
              </div>
              
            </details>
        </li>
    </ul>`;

    
    
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);


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
                <ul id="list">
                <li class="collection-item"></li>
     
                <li class="collection-item"></li>
                </ul>
                <div class="imgandlink">
                <img class="previewimg" src=""/>
                </div>
                <div class="directionBtn">
                <button type="submit" class="showpop" id="directionlink" onclick="openPopup()">Show Full Recipe</button>
                </div>
                </details>
        </li>
    </ul>
    <div class="outerpop">
    <div class="popup" id="popup">
                </div>
    `;

  document.getElementById("listcontainer").innerHTML = output;
}

//populates popup window with directions from json data
function showdirection(recipeId) {
  const recipe = recipeCollection.find((recipe) => recipe.id === recipeId);
  document.getElementById(
    "listdirection"
  ).innerHTML = `<li>${recipe.directions}</li>`;
}

//displays popup window with name and recipe, working on including measurements+ ingredient name

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

document.addEventListener("DOMContentLoaded", function () {
  loadRecipes();
  console.log("Content Loaded");
});
