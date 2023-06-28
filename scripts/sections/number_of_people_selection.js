function number_of_people_visualization(){
    // reset element
    remove_all_child_nodes(page_elements["ndays_display"])

    // create table element
    var table = document.createElement("table");
    page_elements["ndays_display"].appendChild(document.createElement("br"));
    page_elements["ndays_display"].appendChild(table);

    // add rows
    let row1 = table.insertRow();
    let row2 = table.insertRow();

    // add first cells with text
    let cell1 = row1.insertCell();
    cell1.appendChild(document.createTextNode("Den: "));
    let cell2 = row2.insertCell();
    cell2.appendChild(document.createTextNode("Počet lidí: "));

    // add number of people in table
    let i = 1
    for (let element of state.people_per_day) {
        let cell1 = row1.insertCell();
        cell1.appendChild(document.createTextNode(i));

        let cell2 = row2.insertCell();
        cell2.appendChild(document.createTextNode(element));
        i += 1
    }

    // display element
    page_elements["ndays_display"].style.display = "block";
}