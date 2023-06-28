function remove_all_child_nodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function dynamic_round(val){
    if(val == 0){
        return val;
    }

    var divider = 100;
    var rounded = Math.round(val * divider) / divider;
    var itr = 0;
    while(val/rounded < 0.9){
        divider *= 10;
        rounded = Math.round(val * divider) / divider;
        itr++;
        if(itr == 2){
            break
        }
    }
    return rounded;
}

function hide_unhide(){

    var x = document.getElementById("no_print");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    var x = document.getElementById("menu");

    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}