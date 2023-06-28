// GLOBAL VARIABLES
var state = new Object();
var page_elements = new Object();
var meals = new Object();
var names_mapping = new Object();

var components_amount = new Object();
var components_days = new Array()
var components = new Object();
var units_conversion = {kg2g: 1000, g2kg: 1/1000, ml2l: 1/1000, l2ml: 1000};

state = {
	stage: 0,
	number_of_days: 0,
	people_per_day: [],
	menu: {
		breakfast: [],
		snack_1: [],
		lunch: [],
		snack_2: [],
		dinner: [],
	}
}

page_elements = {
	ndays_display: document.getElementById("display-days"),
	shopping_list: document.getElementById("c-nakupni_seznam"),
	shopping_list_days: document.getElementById("c-seznamy_po_dnech")
}

meals = {
	breakfast: [],
	lunch: [],
	dinner: [],
	snack: []
}

names_mapping = {
	breakfast: "Snídaně",
	snack_1: "Svačina",
	lunch: "Oběd",
	snack_2: "Svačina",
	dinner: "Večeře",
}

// general functions
function set_state(stage){

	if((state.stage == 0 || state.stage == 1) && stage == 1){
		state.stage = stage;
		initialize_menu(true, false);
		number_of_people_visualization();
		meal_selects_visualization();
		shopping_lists_visualization();
		menu_visualization();
	}

}

function reset_everything(){
	state.stage = 0;
	state.number_of_days = 0;
	state.people_per_day = [];
}

function hide_all_page_elements(){
	for (const key of Object.keys(page_elements)) {
		page_elements[key].style.display = "none";
	}
}

function load_meals(){
	for(var i = 0; i < recipes.length; i++){

		typ = recipes[i].typ;
		if(typ == "snídaně"){
			meals["breakfast"].push(recipes[i]);
		}
		else if(typ == "svačina"){
			meals["snack"].push(recipes[i]);
		}
		else if(typ == "oběd"){
			meals["lunch"].push(recipes[i]);
		}
		else if(typ == "večeře"){
			meals["dinner"].push(recipes[i]);
		}
	}
}

function initialize_menu(last_year, recipes_from_file){
	k = 0
	//console.log(jidelnicek_2022)
	for (const meal_name of Object.keys(state["menu"])) {
		if(last_year == false){
			mn = meal_name.split("_")[0]
			for(var i = 0; i < state["number_of_days"]; i++){
				state["menu"][meal_name][i] = meals[mn][0]
			}
		}
		else{
		    if(recipes_from_file == true){
		        state["menu"][meal_name] = jidelnicek_2022[k]
            	k++;

		    }
		    else{
		        let new_meals = new Array();
		        let n = 0;
		        for(let i = 0; i < state.number_of_days; i++){ //jidelnicek_2022[k].length

		            mn = meal_name.split("_")[0]
		            if (n < jidelnicek_2022[k].length) {
		                for(let j = 0; j < meals[mn].length; j++){
                            if(jidelnicek_2022[k][i]["id"] == meals[mn][j]["id"]){
                                new_meals.push(meals[mn][j]);
                                n++;
                            }
                        }
		            }
		            else{
		                new_meals.push(meals[mn][0]);
		            }

                    //
                    if(n == state.number_of_days){
                        break;
                    }

		        }

                state["menu"][meal_name] = new_meals;
                k++;

		    }

		}
	}
}

// button functions
function get_ndays(){
    reset_everything();
	var value_ndays = input_ndays.value.trim();
	if(value_ndays == ""){
		console.log("WARNING: Number of days was not provided.")
		return null
	}


	value_ndays = value_ndays.split(',')
	//input_ndays.value = ''

	for(var i = 0; i < value_ndays.length; i++){
		var value = value_ndays[i].trim().split('-')
		var days = parseInt(value[0].trim())
		var people = parseInt(value[1].trim())
		
		state.number_of_days += days
	    for(var p = 0; p < days; p++){
			state.people_per_day.push(people)
	    }
	}
	set_state(1)
}



// initialize
reset_everything();

load_meals();
meals_visualization(meals);


hide_all_page_elements();

// number of people selection
console.log(state);
console.log(meals);
var input_ndays = document.getElementById("days");
var button_ndays = document.getElementById("button-days");
button_ndays.addEventListener("click", get_ndays);


// load menu from file
let form = document.querySelector('#upload');
let file = document.querySelector('#file');
form.addEventListener('submit', handleSubmit);
function handleSubmit (event) {
	// Stop the form from reloading the page
	event.preventDefault();
	// If there's no file, do nothing
	if (!file.value.length) return;
	// Create a new FileReader() object
	let reader = new FileReader();
	// Setup the callback event to run when the file is read
	reader.onload = logFile;
	// Read the file
	reader.readAsText(file.files[0]);
}

function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);

	state = json;
	set_state(state["stage"]);
}

// save menu to the file
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});

    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();

      URL.revokeObjectURL(a.href);
  };

  document.querySelector('#ulozit_jidelnicek').addEventListener('click', () => {
    const save_data = JSON.stringify(state, null, 4);
    downloadToFile(save_data, 'jidelnicek.json', 'text/plain');
});
