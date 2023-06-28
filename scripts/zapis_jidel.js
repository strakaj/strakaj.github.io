var but_save = document.getElementById("ulozit_surovinu").addEventListener("click", save_data);
var allData = new Array();


document.getElementById("nazev").addEventListener("change", load_data);


zobrazeni_surovin(recipes, false)


function maxID(sd){
    var id = 0;

    for (let i = 0; i < sd.length; i++) {
        if(sd[i].id > id){
            id = sd[i].id
        }
    }
    return id

}


function save_data(){
    var nazev =  document.getElementById("nazev").value
    var typ = document.getElementById("typ").value
    var surovina = document.getElementById("surovina").value
    var mnozstvi = document.getElementById("mn").value
    var jednotky = document.getElementById("jed").value
    var na_os = document.getElementById("no").value
    var navod = document.getElementById("navod").value

    var ain = alreadyIn(nazev, recipes)
    var ain2 = alreadyIn(nazev, allData)
    
    //pokud uz je v datech upravi a nepridavat dalsi
    if (ain >= 0 ){
        recipes[ain] = {
            id : recipes[ain].id,
            nazev : nazev,
            typ : typ,
            suroviny : toArray(surovina, false),
            mnozstvi : toArray(mnozstvi, true),
            jednotky : toArray(jednotky, false), 
            na_osobu : toArray(na_os, true),
            navod : navod, 
        }
    }
    else if(ain2 >= 0 ){
        allData[ain2] = {
            id : allData[ain2].id,
            nazev : nazev,
            typ : typ,
            suroviny : toArray(surovina, false),
            mnozstvi : toArray(mnozstvi, true),
            jednotky : toArray(jednotky, false), 
            na_osobu : toArray(na_os, true),
            navod : navod, 
        }
        console.log(allData)
    }
    else{
        var id = 0;
        var id1 = maxID(recipes)
        var id2 = maxID(allData)
        if(id1 > id2){
            id = id1
        }
        else{
            id = id2
        }
        id = id + 1


        if(nazev != ""){

            var data = {
                id : id,
                nazev : nazev,
                typ : typ,
                suroviny : toArray(surovina, false),
                mnozstvi : toArray(mnozstvi, true),
                jednotky : toArray(jednotky, false), 
                na_osobu : toArray(na_os, true),
                navod : navod, 
            }
        
        
            
            //ulozeni dat
            allData.push(data)

            
        }
    }
    //reset formulare
    document.getElementById("nazev").value = ""
    document.getElementById("surovina").value = ""
    document.getElementById("mn").value = ""
    document.getElementById("jed").value = ""
    document.getElementById("no").value = ""
    document.getElementById("navod").value = ""

    //vypis dat
    document.getElementById("suroviny-vse").innerHTML = ''
    zobrazeni_surovin(allData, true)
    zobrazeni_surovin(recipes, false)

}

function zobrazeni_surovin(sd, new_s){
    var div =  document.getElementById("suroviny-vse")
    sd.reverse()
    for (let i = 0; i < sd.length; i++) {
        var div2 = document.createElement("div");
        div2.classList.add("surovina");
        if(new_s){
            div2.classList.add("surovina_new");
        }
        var sur_s = "<tr><td><b>suroviny: </b></td>";
        var mnz_s = "<tr><td><b>mnozstvi: </b></td>";
        var jed_s = "<tr><td><b>jednotky: </b></td>";
        var osb_s = "<tr><td><b>na osobu: </b></td>";
        for (let si = 0; si < sd[i].suroviny.length; si++) {
            sur_s += "<th>" + sd[i].suroviny[si] + "</th>"
            mnz_s += "<td>" + sd[i].mnozstvi[si] + "</td>"
            jed_s += "<td>" + sd[i].jednotky[si] + "</td>"
            osb_s += "<td>" + sd[i].na_osobu[si] + "</td>"
        }
        sur_s += "</tr>"
        mnz_s += "</tr>"
        jed_s += "</tr>"
        osb_s += "</tr>"

        div2.innerHTML = 
            "<p>id: <b>" + sd[i].id + "</b><br>" +
            "nazev: <b>" + sd[i].nazev + "</b><br>" +
            "typ: <b>" + sd[i].typ + "</b><br>" +
            //"suroviny: <b>" + sd[i].suroviny + "</b><br>" +
            //"mnozstvi: <b>" + sd[i].mnozstvi + "</b><br>" +
            //"jednotky: <b>" + sd[i].jednotky + "</b><br>" +
            //"na osobu: <b>" + sd[i].na_osobu + "</b><br>" +
            "<div class=\"scroll-table\"><table>" + 
            sur_s + mnz_s + jed_s + osb_s +
            "</table></div>" +
            "navod: <b>" + sd[i].navod + "</b></p><br><hr>"




            
        div.appendChild(div2)
    }
    sd.reverse()
}

function toArray(str, num){
    var split = str.split(",");
    var arr = new Array(split.length)
    for (let i = 0; i < split.length; i++) {
        var s = split[i].trim()
        if(num){
            s = parseFloat(s)
        }
        arr[i] = s
    }
    return arr
}


function alreadyIn(nazev, data){
    for (let i = 0; i < data.length; i++) {
        if(data[i].nazev == nazev){
            return i
        }
    }
    return -1
}

function load_data(){
    
    var nazev = document.getElementById("nazev").value
    var ain = alreadyIn(nazev, recipes);
    if( ain >= 0 ){
        document.getElementById("surovina").value = recipes[ain].suroviny
        document.getElementById("typ").value = recipes[ain].typ
        document.getElementById("mn").value = recipes[ain].mnozstvi
        document.getElementById("jed").value = recipes[ain].jednotky
        document.getElementById("no").value = recipes[ain].na_osobu
        document.getElementById("navod").value = recipes[ain].navod
    }
    ain = alreadyIn(nazev, allData);
    if( ain >= 0 ){
        document.getElementById("surovina").value = allData[ain].suroviny
        document.getElementById("mn").value = allData[ain].mnozstvi
        document.getElementById("jed").value = allData[ain].jednotky
        document.getElementById("no").value = allData[ain].na_osobu
        document.getElementById("navod").value = allData[ain].navod
    }
    
}



const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
      URL.revokeObjectURL(a.href);
  };
  
  document.querySelector('#ulozit_data').addEventListener('click', () => {
    const save_data = "var recepty = " + JSON.stringify(recipes.concat(allData));
    
    downloadToFile(save_data, 'recepty_json.js', 'text/js');
  });