// crates array for json input

let recipeCollection = [];
const searchText = document.querySelector("#filterInput");
const APP_ID = "e9121c76";
const API_KEY = "56b9fc8ce334b4a7a762c9a5d815ab88";
const baseUrl = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}`;
const searchButton = document.querySelector(".testsearch");
const recipeContainer = document.getElementById("listcontainer");

searchButton.addEventListener("click", () => loadRecipes(searchText.value));

searchText.addEventListener("keyup", (e) => {
  const inputVal = searchText.value;
  if (e.keyCode === 13) {
    loadRecipes(inputVal);
  }
});

function loadRecipes(type = "recipe") {
  const url = baseUrl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipies(data.hits))
    .catch((error) => console.log(error));
}

const renderRecipies = (recipeList = []) => {
  recipeContainer.innerHTML ="";
  recipeList.forEach((recipeObj) => {
    const {
      label: recipeTitle,
      ingredientLines,
      image: recipeImage,
      url: url,
    } = recipeObj.recipe;
    let htmlStr = `
    <ul class="expandlist">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipeTitle}</summary>
              <ul id="list">`;
              
    //loads list of ingredients from json for each initial item
    ingredientLines.forEach((ingredient) => {
      htmlStr += `<li class="collection-item">${ingredient}</li>`;
    });
    htmlStr += `</ul>
              <div class="imgandlink">
                <img class="previewimg" src="${recipeImage}"/>
              </div>
              <div class="directionBtn">
                <button type="submit" class="showpop" id="directionlink"><a href="${url}">Show Full Recipe</button></a>
              </div>
            </details>
        </li>
    </ul>`;
    recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};
//loads pizza list on page start
async function sendApiRequest() {
  let response = await fetch(
    `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&q=pizza`
  );
  let data = await response.json();
  useApiData(data);
}
//call to load each pizza item
function useApiData(data) {
  var output = "";
  const bar = document.querySelector(".collection-header");
  for (let i = 0; i < data.hits.length; i++) {
    output += `
    <ul class="expandlist">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${data.hits[i].recipe.label}</summary>
            <ul id="list">
    `;
    //loads list of ingredients from json for each initial item
    data.hits[i].recipe.ingredientLines.forEach((ingredient) => {
      output += `<li class="collection-item">${ingredient}</li>`;
    });
    output += `     
                </ul>
                <div class="imgandlink">
                <img class="previewimg" src="${data.hits[i].recipe.image}"/>
                </div>
                <div class="directionBtn">
                <button type="submit" class="showpop" id="directionlink"><a href="${data.hits[i].recipe.url}">Show Full Recipe</button></a>
                </div>
                </details>
        </li>
    </ul>
    <div class="outerpop">
    <div class="popup" id="popup">
                </div>
    `;
  }
  document.getElementById("listcontainer").innerHTML = output;
}

function clearInput() {
  document.getElementById("filterInput").value = "";

  var output = "";
  //generates initial clickable item in list
  output += `
    <ul class="expandlist">
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
    <button type="submit" class="showpop" onclick="closePopup()">Close Recipe</button>`;
}
function closePopup() {
  document.getElementById("popup").classList.remove("open-popup");
}

document.addEventListener("DOMContentLoaded", function () {
  sendApiRequest();
  // Get input element
  let filterInput = document.getElementById("filterInput");
  // Add event listener
});
