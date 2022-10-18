var PullR = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    var PullR = response.Recipe;

    var output = "";
    for (let i = 0; i < PullR.length; i++) {
      output += `
      <ul class="Expand">
            <li class="collection-header">
                <details class="details-example">
                <summary class="collection-header">${PullR[i].name}</summary>
                    <ul id="list">
                        <li class="collection-item">${PullR[i].Measurement} ${PullR[i].Ingredient}</li>
                        <li class="collection-item">${PullR[i].Measurement1} ${PullR[i].Ingredient1}</li>
                        <li class="collection-item">${PullR[i].Measurement2} ${PullR[i].Ingredient2}</li>
                        <li>${PullR[i].Directions}</li>
                    </ul>
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
        let ul = document.querySelector("ul.Expand");
        //console.log(filterValue);

        let li = ul.querySelectorAll("li.collection-header");
        for (let i = 0; i < li.length; i++) {
          // console.log(filterValue);
          let a = PullR[i].name;
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

    document.getElementById("FullList").innerHTML = output;
  }
};
xhttp.open("GET", "json/recipe.json", true);
xhttp.send();
