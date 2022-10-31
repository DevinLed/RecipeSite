/*
On page load, load all recipes from json
  - add to our recipe array
setup event listener for search
  - requires hide/show functionality for recipe list
when recipe is selected, show full view
when 'show full' button clicked, show directions in right panel
*/




function x() {
  var output = "";
    for (let i = 0; i < recipeCollection.length; i++) {
      output += `
      <ul class="expandlist2">
            <li class="collection-header2" style="display: none">${recipeCollection[i].Directions}</li>
       </ul>`;

      // Get input element
      let filterInput = document.getElementById("filterInput");
      // Add event listener
      filterInput.addEventListener("keyup", filterNames);

      function filterNames() {
        // Get value of input
        let filterValue = document
          .getElementById("filterInput")
          .value.toUpperCase();
        let ul = document.getElementById("listdirection");
        //console.log(filterValue);

        let li = ul.querySelectorAll("li.collection-header2");
        for (let i = 0; i < li.length; i++) {
          let a = recipeCollection[i].name;
          if (a.toUpperCase().indexOf(filterValue) > 0) {
            li[i].style.display = "none";
          } else{
            li[i].style.display = "";
          }
          // If matched
          if (a.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = "";
            console.log(i);
          } else {
            li[i].style.display = "none";
            console.log(false);
          }
        }
      }
    }

    document.getElementById("listdirection").innerHTML = output;
}