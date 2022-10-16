const RecipesList = document.getElementById("name");
const searchBar = document.getElementById("searchBar");
let Recipe = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipe = Recipe.filter((name) => {
    return (
      Recipe.name.toLowerCase().includes(searchString) 
          );
  });
  displayRecipes(filteredRecipes);
});

const loadRecipes = async () => {
  try {
    const res = await fetch("json/recipe.json");
    Recipes = await res.json();
    displayRecipes(Recipes);
  } catch (err) {
    console.error(err);
  }
};

const displayRecipes = (Recipes) => {
  const htmlString = Recipes
    .map((Recipe) => {
      return `
            <li class="Recipe">
                <h2>${Recipe.name}</h2>
                <p>House: ${Recipe.house}</p>
                <img src="${Recipe.image}"></img>
            </li>
        `;
    })
    .join("");
  RecipesList.innerHTML = htmlString;
};




var Recipe = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    var Recipe = response.Recipe;

    var output = "";
    for (var i = 0; i < Recipe.length; i++) {
      output += `
      <ul class="Expand">
        <li>
            <details class="details-example">
                <summary>${Recipe[i].name}</summary>
                    <ul class="list">
                        <li>${Recipe[i].Measurement} ${Recipe[i].Ingredient}</li>
                        <li>${Recipe[i].Measurement1} ${Recipe[i].Ingredient1}</li>
                        <li>${Recipe[i].Measurement2} ${Recipe[i].Ingredient2}</li>
                        <li>${Recipe[i].Directions}</li>
                    </ul>
            </details>
      </li>
  </ul>`;
    }
    document.getElementById("Recipe").innerHTML = output;
  }
};
xhttp.open("GET", "json/recipe.json", true);
xhttp.send();


