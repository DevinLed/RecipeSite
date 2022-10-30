function showdirection(){
var pullname2 = [];
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    pullname2 = response.Recipe;

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
    for (let i = 0; i < pullname2.length; i++) {
      output += `
      <ul class="expandlist2">
            <li class="collection-header2" style="display: none">${pullname2[i].Directions}</li>
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
          let a = pullname2[i].name;
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
};
xhttp.open("GET", "json/recipe.json", true);
xhttp.send();
}
showdirection();