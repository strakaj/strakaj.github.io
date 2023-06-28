var but_save = document.getElementById("ulozit_surovinu").addEventListener("click", save_data);
var allData = new Array();

document.getElementById("nazev_surovina").addEventListener("change", load_data);


zobrazeni_surovin(components_data, false)
chybejici()

function maxID(sd){
    var id = 0;

    for (let i = 0; i < sd.length; i++) {
        if(sd[i].id > id){
            id = sd[i].id
        }
    }
    return id

}

function chybejici(){
    var suroviny = new Array();
    var suroviny_chybejici = "<p><b>Chybějící suroviny: </b><br>";

    for (let i = 0; i < components_data.length; i++) {
        suroviny.push(components_data[i].nazev)
    }
    for (let i = 0; i < allData.length; i++) {
        suroviny.push(allData[i].nazev)
    }
    
    for (let i = 0; i < recipes.length; i++) {
        var sur = recipes[i].suroviny
        var jed = recipes[i].jednotky
        
        for (let j = 0; j < sur.length; j++) {
            if(sur[j] == ""){
                continue
            }
            if( !(suroviny.includes( sur[j] )) ){
                suroviny_chybejici += "" + sur[j] + " - " + jed[j] + "<br>"
                //suroviny_chybejici.push(sur[j])
            }
            
        }
    }
    document.getElementById("chybejici").innerHTML = suroviny_chybejici + "</p>"

}

function save_data(){
    var nazev =  document.getElementById("nazev_surovina").value
    var predem =  document.getElementById("predem_surovina").checked
    var jednotky = document.getElementById("jednotky_surovina").value
    var cena = document.getElementById("cena_surovina").value
    if(predem){
        predem = 1
    }
    else{
        predem = 0
    }
    
    var ain = alreadyIn(nazev, components_data)
    var ain2 = alreadyIn(nazev, allData)
    
    if (ain >= 0 ){
        components_data[ain] = {
            id : components_data[ain].id,
            nazev : nazev,
            predem : predem,
            jednotky : jednotky,
            cena: parseFloat(cena.trim())
        }
    }
    else if(ain2 >= 0 ){
        allData[ain2] = {
            id : allData[ain2].id,
            nazev : nazev,
            predem : predem,
            jednotky : jednotky,
            cena: parseFloat(cena.trim())
        }
        console.log(allData)
    }
    else{
        var id = 0;
        var id1 = maxID(components_data)
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
                predem : predem,
                jednotky : jednotky,
                cena: parseFloat(cena.trim())
            }
        
            console.log(JSON.stringify(data));
        
            document.getElementById("nazev_surovina").value = "";
            document.getElementById("predem_surovina").checked = false;
            document.getElementById("jednotky_surovina").value = "g";
            document.getElementById("cena_surovina").value = "";

            allData.push(data)
        }
        
    }
    document.getElementById("suroviny-vse").innerHTML = ''
    zobrazeni_surovin(allData, true)
    zobrazeni_surovin(components_data, false)
    chybejici()
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
        div2.innerHTML = 
            "<p>id: <b>" + sd[i].id + "</b><br>" +
            "nazev: <b>" + sd[i].nazev + "</b><br>" +
            "predem: <b>" + sd[i].predem + "</b><br>" +
            "jednotky: <b>" + sd[i].jednotky + "</b><br>" +
            "cena: <b>" + sd[i].cena + "</b></p><br><hr>"
            
            
		div.appendChild(div2)

    }
    sd.reverse()
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
    
    var nazev = document.getElementById("nazev_surovina").value;
    var ain = alreadyIn(nazev, components_data);
    if( ain >= 0 ){
        var predem = true;
        if(components_data[ain].predem == 0){
            predem = false
        }
        document.getElementById("predem_surovina").checked = predem;
        document.getElementById("jednotky_surovina").value = components_data[ain].jednotky;
        document.getElementById("cena_surovina").value = components_data[ain].cena;
    }
    ain = alreadyIn(nazev, allData);
    if( ain >= 0 ){
        var predem = true;
        if(allData[ain].predem == 0){   
            predem = false
        }
        document.getElementById("predem_surovina").checked = predem;
        document.getElementById("jednotky_surovina").value = allData[ain].jednotky;
        document.getElementById("cena_surovina").value = allData[ain].cena;
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
    const save_data = "var components_data = " + JSON.stringify(components_data.concat(allData));
    
    downloadToFile(save_data, 'suroviny_json.js', 'text/js');
  });