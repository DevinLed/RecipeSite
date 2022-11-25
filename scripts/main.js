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
    document.getElementById("sidepanel").classList.add("open-details");
    document.getElementById("showdetails").innerHTML = "Hide Extra Details";
    detailscount++;
  } 
  else {
    document.getElementById("sidepanel").classList.remove("open-details");
    document.getElementById("showdetails").innerHTML = "View Extra Details";
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
    console.log(recipeObj);
    let htmlStr = `
    <ul class="expandlist" style="padding-left: 0px;">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipeTitle}</summary>
            <ul class="list">
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
                <button type="submit" title="Visit external site" class="directionlink"><a href="${url}" target="_blank">Show Full Recipe</button></a>
                
                <div class="showdets">
                <button type="submit" title="View details" class="showdetails">View Extra Details</button>
                <div class= "extradetails">
                <div class="sidepanel" id="sidepanel">
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
    
  let cbox = document.querySelectorAll(".showdets");
  
  cbox.forEach((showdets) => {
    let detailscount = 0;
    showdets.addEventListener("click", function () {
      if (detailscount === 0) {
        document.getElementById("sidepanel").classList.add("open-details");
        document.querySelector('.showdetails').innerHTML = "Hide Extra Details";
        detailscount++;
        console.log(showdets);
      } else {
        document.getElementById("sidepanel").classList.remove("open-details");
        document.querySelector('.showdetails').innerHTML = "View Extra Details";
        detailscount--;
        console.log(false);
      }
    });
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
                <button type="submit" class="showpop" id="directionlink" onclick="openPopup()">Show Full Recipe</button>
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
