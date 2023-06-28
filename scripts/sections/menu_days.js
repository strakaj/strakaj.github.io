function menu_visualization(){
    document.getElementById("c-jidelnicky_po_dnech").innerHTML = '';
    //tlacitko na skryti
    var div = document.createElement("div");
    var butt = document.createElement("input");

    butt.value = "Skrýt"
    butt.id = 'hide_butt'
    butt.type = 'button'
    butt.addEventListener('click', hide_unhide)

    div.classList.add("jidelnicek");

    document.getElementById("c-jidelnicky_po_dnech").appendChild(div);
    //document.getElementById("buttons").appendChild(div)
    div.appendChild(butt)

    //jidelnicky jednotlivych dnu
    let all_meals = null;
    for (let i = 0; i < state["number_of_days"]; i++) {
        all_meals = new Array();
        for (const meal_name of Object.keys(state["menu"])) {
            all_meals.push(state["menu"][meal_name][i])
        }

        var nadpisy = ["Snídaně", "Svačina", "Oběd", "Svačina", "Večeře"]

        var div = document.createElement("div");
        var h = document.createElement("p");
        var hr = document.createElement("hr");
        var br = document.createElement("br");

        div.classList.add("jidelnicek");

        //nadpis
        h.innerHTML = "<h2 style=\"display: inline;\">Den " + (i+1) + " jídelníček</h2>			<h3 style=\"display: inline; margin-left: 450px;\">Počet lidí: " + state["people_per_day"][i] + "</h3>";
        document.getElementById("c-jidelnicky_po_dnech").appendChild(div);
        div.appendChild(h);
        div.appendChild(hr);


        for (let k = 0; k < all_meals.length; k++) {
            //nazev
            var p = document.createElement("p");
            var brr = document.createElement("br");
            p.innerHTML = "<h2 style=\" display: inline;\">" + nadpisy[k] + ": </h2>" + all_meals[k].nazev;
            div.appendChild(p)

            //suroviny
            var s = ''
            var no = all_meals[k].na_osobu;
            if(all_meals[k].suroviny[0] != ""){
                for (let j = 0; j < all_meals[k].suroviny.length; j++) {

                    //prevod jednotek
                    var prevod = 1;
                    var jed = all_meals[k].jednotky[j];
                    if(all_meals[k].jednotky[j] == 'ml'){
                        prevod = units_conversion['ml2l']
                        jed = 'l'
                    }
                    if(all_meals[k].jednotky[j] == 'g'){
                        prevod = units_conversion['g2kg']
                        jed = 'kg'
                    }
                    var nasobit = 1;
                    if(no[j] == 1){
                        nasobit = state["people_per_day"][i]
                    }


                    var val = dynamic_round(all_meals[k].mnozstvi[j] * nasobit * prevod);
                    s += val + jed + "    " + all_meals[k].suroviny[j]
                    //s += Math.round(all_meals[k].mnozstvi[j] * nasobit * prevod * 100)/100 + jed + "    " + all_meals[k].suroviny[j]
                    if( j != all_meals[k].suroviny.length-1){
                        s += ', '
                    }
                }
            }

            var p = document.createElement("p");
            p.innerHTML = "<h3 style=\" display: inline;\">Suroviny: </h3>" + s
            div.appendChild(p)


            if(all_meals[k].navod != ""){
                var p = document.createElement("p");
                p.innerHTML = "<h3 style=\" display: inline;\">Návod: </h3>" + all_meals[k].navod;
                div.appendChild(p)

            }
            div.appendChild(brr)

        }
    }
}

