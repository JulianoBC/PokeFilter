// POKEMON API => https://pokeapi.co
// Useful Documentation links:
// https://pokeapi.co/docs/v2.html#pokemon
// RESTfull api 


const GetPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}/`

const generatePokemonPromises = () => Array(850).fill().map((_, index) => 
    fetch(GetPokemonUrl(index + 1 )).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    //console.log(pokemons)     
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
     accumulator += `
     <li class="card ${elementTypes[0]}" class="filtro">
     <img class="card-image"   alt= "${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png"/>   
       <h2 class="card-title">${id}. ${name}</h2>
       <p class="card-subtitle"> ${elementTypes.join(' | ')} </p>               
     </li>
    `
    return accumulator 
    }, '')   

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}
filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("card");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
     w3RemoveClass(x[i], "show");
     if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}
    
    // Show filtered elements
    function w3AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }
    
    // Hide elements that are not selected
    function w3RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }
    
    // Add active class to the current control button (highlight it)
    var btnContainer = document.getElementById("myBtnContainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }    

const pokePromises = generatePokemonPromises()
Promise.all(pokePromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
filterSelection("show")
