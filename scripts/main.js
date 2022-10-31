let recipeCollection = [];

function loadAllRecipes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      recipeCollection = response.Recipe;

      showAllRecipes();
    }
  };
  xhttp.open('GET', 'json/recipe.json', true);
  xhttp.send();
}

function showAllRecipes() {
  var output = '';
  recipeCollection.forEach(recipe => {
    output += `
    <ul class="expandlist">
        <li class="collection-header">
            <details class="details-example">
            <summary class="collection-header">${recipe.name}</summary>
                <ul id="list">
    `
    recipe.ingredients.forEach(ingredient => {
      output += `<li class="collection-item">${ingredient.name} ${ingredient.measure}</li>`;
    });      
    output += `     
                    <li class="collection-item">${recipe.directions}</li>
                </ul>
                <div class="imgandlink">
                <img class="previewimg" src="${recipe.img}"/>
                <button onclick="showdirection(${recipe.id})">Show Full Recipe</button>
                </div>
            </details>
        </li>
    </ul>`;
  });
  document.getElementById('listcontainer').innerHTML = output;
}

function filterNames(event) {
  // Get value of input
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  let ul = document.getElementById('listcontainer');
  //console.log(filterValue);

  let li = ul.querySelectorAll('li.collection-header');
  for (let i = 0; i < li.length; i++) {
    let a = recipe.name;
    // If matched
    if (a.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';
      console.log(i);
    } else {
      li[i].style.display = 'none';
      console.log(false);
    }
  }
}

function showdirection(recipeId) {
  const recipe = recipeCollection.find(recipe => recipe.id === recipeId);
  document.getElementById('listdirection').innerHTML = `<li>${recipe.directions}</li>`
}

document.addEventListener('DOMContentLoaded', function () {
  loadAllRecipes();

  // Get input element
  let filterInput = document.getElementById('filterInput');
  // Add event listener
  filterInput.addEventListener('keyup', filterNames);
});
