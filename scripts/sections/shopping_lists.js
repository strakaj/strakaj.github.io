function shopping_lists_visualization(){
    // initialize/reset variables and get amount of components from the meals in menu
    shopping_lists_initialization();

    for (const meal_name of Object.keys(state["menu"])) {
        var meals_menu = state["menu"][meal_name]
        components_amount = get_amounts_from_menu(meals_menu, components_amount, -1);
    }

    page_elements["shopping_list"].style.display = "block";
    components_list_visualization(components_amount, "c-seznam", 1)

    amounts_per_day()
    prepare_menu_lists()
    page_elements["shopping_list_days"].style.display = "flex";

    for (let i = 0; i < state["number_of_days"]; i++) {
        components_list_visualization(components_days[i], "seznam_den_" + i, 0)
    }
}

function components_list_visualization(components_to_visualize, html_id, in_advance){
    // reset html element and variables
    document.getElementById(html_id).innerHTML = '';
    let total_price = 0;
    for (const [key, value] of Object.entries(components_to_visualize)) {
        // if amount 0, skip component
        if (value == 0) {
            continue;
        }

        //
        if(components[key].predem != in_advance){
            continue
        }

        // unit conversion
        let conversion = 1;
        let unit = components[key].jednotky;
        if(components[key].jednotky == 'ml'){
            conversion = units_conversion['ml2l']
            unit = 'l'
        }
        if(components[key].jednotky == 'g'){
            conversion = units_conversion['g2kg']
            unit = 'kg'
        }

        // create html elements
        var val = dynamic_round(value * conversion);
        var p = document.createElement("p");
        p.innerHTML = key + ': ' + val + ' ' + unit;
        document.getElementById(html_id).appendChild(p);

        // vypocet ceny
        var amount = val //Math.round(value * conversion * 100)/100;
        var price = components[key].cena;
        if(unit == "l"){
            total_price += price * amount * units_conversion['l2ml']
        }
        if(unit == "kg"){
            total_price += price * amount * units_conversion['kg2g']
        }
        if(unit == "ks"){
            total_price += price * amount
        }
    }
	total_price = Math.round(total_price)
    p = document.createElement("p");
    p.innerHTML = "<hr><b>Odhad Ceny: " + total_price + "</b>";
    document.getElementById(html_id).appendChild(p);

}

function amounts_per_day(){
    //pruchod pres dny
    let all_meals = null;
    for (let i = 0; i < state["number_of_days"]; i++) {
        all_meals = new Array();
        for (const meal_name of Object.keys(state["menu"])) {
            all_meals.push(state["menu"][meal_name][i])
        }
        components_days[i] = get_amounts_from_menu(all_meals, components_days[i], i)
    }
}

function get_amounts_from_menu(meals, comp_amo, day){
    // iterate over the days
    for (let i = 0; i < meals.length; i++){
        // information about meal
        let j = meals[i].jednotky;
        let m = meals[i].mnozstvi;
        let s = meals[i].suroviny;
        let no = meals[i].na_osobu;


        // iterate over components
        for (let k = 0; k < s.length; k++) {

            // skip if components empty
            if (s[k] == ''){
                continue
            }

            // skip if components missing in component list
            if (!(s[k] in components)){
                console.log('Component: ' + s[k] + ' is missing in component list');
                continue
            }

            // components per person or for all?
            var multiply = 1;
            if(no[k] == 1){
                multiply = state["people_per_day"][i]
                if(day >= 0){
                    multiply = state["people_per_day"][day]
                }
            }

            // pokud jsou zadane jednotky stejne muze se zapsat, jinak potreba prevest
            if (components[s[k]].jednotky == j[k]){
                comp_amo[s[k]] += multiply * m[k];
            }
            else{
                let unit_conversion_name = j[k] + '2' + components[s[k]].jednotky;
                let mm = m[k] * units_conversion[ unit_conversion_name ];
                comp_amo[s[k]] += multiply * mm;
            }
        }
    }
    return comp_amo
}

function prepare_menu_lists(){
    document.getElementById("c-seznamy_po_dnech").innerHTML = '';
    for(var i = 0; i < state["number_of_days"]; i++){
        var div = document.createElement("div");
        var h = document.createElement("h3");
        var hr = document.createElement("hr");
        var div2 = document.createElement("div");

        div.classList.add("c-jidelnicek_vypis");
        div2.id = "seznam_den_" + i
        h.innerHTML = "Nakupni Seznam Den " + (i+1);


        document.getElementById("c-seznamy_po_dnech").appendChild(div);
        div.appendChild(h);
        div.appendChild(hr);
        div.appendChild(div2)
    }
}

function shopping_lists_initialization(){
    components_amount = new Object();
    components_days = new Array()
    components = new Object();

    for (let i = 0; i < components_data.length; i++) {
        components_amount[components_data[i].nazev] = 0;
        components[components_data[i].nazev] = components_data[i];
    }

    for (let j = 0; j < state["number_of_days"]; j++) {
        var den = new Object();
        for (let i = 0; i < components_data.length; i++) {
            den[components_data[i]['nazev']] = 0;
        }
        components_days.push(den);
    }
}
