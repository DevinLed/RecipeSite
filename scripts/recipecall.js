function showall(){

// var recipeCollection = [];
// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function click() {
//   if (this.readyState == 4 && this.status == 200) {
//     var response = JSON.parse(xhttp.responseText);
//     recipeCollection = response.Recipe;

    /*
    *Debounce testing, only working with debounce span as test*
    const input = document.querySelector("input")
    const debounceText = document.getElementById("debounce")
    const updateDebounceText = debounce(text => {
      debounceText.textContent = text
    })
    input.addEventListener("input", e => {
      updateDebounceText(e.target.value)
    })
    function debounce (cb, delay= 1500){
      let timeout
      return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(...args)
        }, delay)
      }
    }
    */

    
    var output = "";
    for (let i = 0; i < recipeCollection.length; i++) {

      output += `
      
      <ul class="expandlist">
            <li class="collection-header">
                <details class="details-example">
                <summary class="collection-header">${recipeCollection[i].name}</summary>
                    <ul id="list">
                        <li class="collection-item">${recipeCollection[i].Measurement} ${recipeCollection[i].Ingredient}</li>
                        <li class="collection-item">${recipeCollection[i].Measurement1} ${recipeCollection[i].Ingredient1}</li>
                        <li class="collection-item">${recipeCollection[i].Measurement2} ${recipeCollection[i].Ingredient2}</li>
                        <li class="collection-item">${recipeCollection[i].Directions}</li>
                    </ul>
                    <div class="imgandlink">
                    <img class="previewimg" src="img/${recipeCollection[i].name}.jpg"/>
                    <button onclick="showdirection()">Show Full Recipe</button>
                    </div>
                </details>
            </li>
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
        let ul = document.getElementById("listcontainer");
        //console.log(filterValue);

        let li = ul.querySelectorAll("li.collection-header");
        for (let i = 0; i < li.length; i++) {
          let a = recipeCollection[i].name;
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
    

    document.getElementById("listcontainer").innerHTML = output;
  }
  }

showall();