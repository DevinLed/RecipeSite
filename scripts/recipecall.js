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
    const myData = "Recipe";

function returnText() {
 let input = document.getElementById('searchBar').value.toLowerCase();

 let filteredNames = myData.filter((e) => {
  return Object.values(e).some((value) => {
   return value.toString().toLowerCase().includes(input);
  });
 });

 console.log(filteredNames);
 }
    
    document.getElementById("Recipe").innerHTML = output;
    }
  }
xhttp.open("GET", "json/recipe.json", true);
xhttp.send();

