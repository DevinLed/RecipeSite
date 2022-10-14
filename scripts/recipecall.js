
        var Recipe = [
        ];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                var Recipe = response.Recipe;

                var output = '';
        for (var i = 0; i < Recipe.length; i++) {
            output += '<li>' + Recipe[i].name + '</li>' + '<ul class="Ingredients">'+ '<li>' +Recipe[i].Ingredient+'</li>'+'</ul>';
        }
        document.getElementById('Recipe').innerHTML = output;
            }
        };
        xhttp.open("GET", "json/recipe.json", true);
        xhttp.send();