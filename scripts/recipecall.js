var pullname = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    pullname = response.Recipe;

    var output = "";
    for (let i = 0; i < pullname.length; i++) {
      output += `
      <ul class="expandlist">
            <li class="collection-header">
                <details class="details-example">
                <summary class="collection-header">${pullname[i].name}</summary>
                    <ul id="list">
                        <li class="collection-item">${pullname[i].Measurement} ${pullname[i].Ingredient}</li>
                        <li class="collection-item">${pullname[i].Measurement1} ${pullname[i].Ingredient1}</li>
                        <li class="collection-item">${pullname[i].Measurement2} ${pullname[i].Ingredient2}</li>
                        <li>${pullname[i].Directions}</li>
                    </ul>
                </details>
            </li>
      </ul>`;
      // Get input element
      let filterInput = document.getElementById("filterInput");
      // Add event listener
      filterInput.addEventListener("keyup", filterNames);
      function debounce(func, timeout = 300){
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
      }
      function saveInput(){
        console.log('Saving data');
      }
      const processChange = debounce(() => saveInput());
      
      function filterNames() {
        // Get value of input
        let filterValue = document
          .getElementById("filterInput")
          .value.toUpperCase();
        let ul = document.getElementById("listcontainer");
        //console.log(filterValue);

        let li = ul.querySelectorAll("li.collection-header");
        for (let i = 0; i < li.length; i++) {
          // console.log(filterValue);
          let a = pullname[i].name;
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

    document.getElementById("listcontainer").innerHTML = output;
  }
};
xhttp.open("GET", "json/recipe.json", true);
xhttp.send();
