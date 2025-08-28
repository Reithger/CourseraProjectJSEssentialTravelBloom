let map = undefined;

fetch("./travel_recommendation_api.json").then((response) =>
        response.json()
).then((data) => {
    console.log(data);
    map = {"beach" : null, "country" : null, "temple" : null};
    map["country"] = data["countries"];
    map["beach"] = data["beaches"];
    map["temple"] = data["temples"];
})

function clear_search(){
    let bar = document.getElementById("search");
    bar.value = "";    
    let last_check = document.getElementById("search_results_element");
    if(last_check !== null){
        let relative = document.getElementById("main_page");
        relative.removeChild(last_check)
    }
}

function search_user(){
    let search_term = document.getElementById("search").value;
    search_term = interpret_input(search_term);
    console.log("Interpreted: " + search_term + " " + (search_term === null));
    if(search_term === null){
        document.getElementById("popup").style.visibility = "visible";
        return;
    }

    let relative = document.getElementById("main_page");
    let result_div = document.createElement("div");
    result_div.id = "search_results_element";
    result_div.className = "search_results";
    for(let i = 0; i < num_entries(map[search_term]); i++){
        result_div.appendChild(create_search_result(map[search_term], i));
    }
    let last_check = document.getElementById("search_results_element");
    if(last_check !== null){
        relative.removeChild(last_check)
    }
    relative.appendChild(result_div);
    
}

function create_search_result(category, index){
    let info_list = category[index];

    let result = document.createElement('div');
    result.className = "search_results_result";

    let img = document.createElement('img');
    img.src = info_list.imageUrl;

    let info = document.createElement('div');
    info.className = "search_results_info";

    let header = document.createElement("h2");
    header.textContent = info_list.name;
    
    let par = document.createElement('p');
    par.textContent = info_list.description;

    let button = document.createElement("button");
    button.textContent = "Visit";

    info.appendChild(header);
    info.appendChild(par);
    info.appendChild(button);
    result.append(img);
    result.append(info);

    return result;
}

function num_entries(category){
    return category.length;
}

function close_popup(){
    console.log(document.getElementById("popup").style.visibility);
    document.getElementById("popup").style.visibility = "hidden";
    console.log(document.getElementById("popup").style.visibility);
}

function interpret_input(user_in){
    console.log("Interpreting : " + user_in);
    let standard = user_in.toLowerCase();
    let beach_match = ["beach", "beaches"];
    let temple_match = ["temple", "temples"];
    let country_match = ["country", "countries"];
    if(beach_match.includes(standard)){
        return "beach";
    }
    if(temple_match.includes(standard)){
        return "temple";
    }
    if(country_match.includes(standard)){
        return "country";
    }
    return null;
}