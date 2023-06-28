function meals_visualization(meals){
    for (const key of Object.keys(meals)) {
        for(var i = 0; i < meals[key].length; i++){
            var p = document.createElement("p");
            p.innerHTML = meals[key][i].nazev;
            document.getElementById("c-"+key).appendChild(p);
        }
    }
}