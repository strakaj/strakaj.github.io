function on_select_change(evnt){
    var select_id = evnt.currentTarget.meal_id;
    var meal_id_parameters = select_id.split("-");

    var meal_name = meal_id_parameters[0];
    var day = meal_id_parameters[2];

    var meal_id = document.getElementById(select_id).value;
    var meal = id_to_meal(meal_name, meal_id);

    state["menu"][meal_name][day] = meal;

    // reset other visualizations
    meal_selects_visualization();
    shopping_lists_visualization();
    menu_visualization();
}

function id_to_meal(meal_name, meal_id){
    meal_name = meal_name.split("_")[0]
    for (let j = 0; j < meals[meal_name].length; j++) {
        if(meals[meal_name][j].id == meal_id){
            return meals[meal_name][j];
        }
    }
    return null
}

function meal_selects_visualization(){
    document.getElementById("c-dny_vypis").innerHTML = '';
    for(var day = 0; day < state["number_of_days"]; day++){
        var div = document.createElement("div");
        var h = document.createElement("h2");
        var hr = document.createElement("hr");

        div.classList.add("c-den_vypis");
        h.innerHTML = "Den " + (day+1);

        div.appendChild(h);
        div.appendChild(hr);

        for (const meal_name of Object.keys(names_mapping)) {
            var table = document.createElement("table");
            table.style.width = "100%";
            div.appendChild(table);

            //Create and append select list
            var select = document.createElement("select");
            select.id = meal_name + "-select-" + day;
            select.addEventListener("change", on_select_change, false);
            select.meal_id = select.id

            var option = document.createElement("option");
            option.value = -1;
            option.text = "";
            if(state["menu"][meal_name][day] == null){
                option.selected = true;
            }
            select.appendChild(option);

            mn = meal_name.split("_")[0]
            //Create and append the options
            for (let i = 0; i < meals[mn].length; i++) {

                var option = document.createElement("option");
                option.value = meals[mn][i]["id"];
                option.text = meals[mn][i]["nazev"];
                if(state["menu"][meal_name][day]["id"] == meals[mn][i]["id"]){
                    option.selected = true;
                }
                select.appendChild(option);

            }

            let row = table.insertRow();
            let cell1 = row.insertCell();
            let b = document.createElement("b");
            b.classList.add("jidlo-text");
            cell1.style.width = "30%";
            b.appendChild(document.createTextNode(names_mapping[meal_name]));
            cell1.appendChild(b);
            let cell2 = row.insertCell();
            cell2.appendChild(select);

        }
        document.getElementById("c-dny_vypis").appendChild(div)
    }
}