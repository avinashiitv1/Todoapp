console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;

window.onload = getTodosAJAX();

function updatetodos(Todos_json){
    var todos = JSON.parse(Todos_json);
    var parent1 = document.getElementById("activetodos");
    var parent2 = document.getElementById("completetodos");
    var parent3 = document.getElementById("deletedtodos");
    parent1.innerHTML = "";parent2.innerHTML = "";parent3.innerHTML = "";
    Object.keys(todos).forEach(
        function(key){
            if(todos[key].status == "ACTIVE"){
                var todo_element = createTodoElement(key, todos[key]);
                parent1.appendChild(todo_element);
            }
            else if(todos[key].status == "COMPLETE"){
                var todo_element = createTodoElement(key, todos[key]);
                parent2.appendChild(todo_element);
            }
            else{
                var todo_element = createTodoElement(key, todos[key]);
                parent3.appendChild(todo_element);
            }
        }
    )
}

/*function updatecompletetodos(Todos_json){
    console.log("hi");
    var todos = JSON.parse(Todos_json);
    var parent = document.getElementById("completetodos");
    parent.innerHTML = "";
    if(parent){
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status == "COMPLETE"){
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                }
            }
        )
    }
}

function updatedeletetodos(Todos_json){
    console.log("hi");
    var todos = JSON.parse(Todos_json);
    var parent = document.getElementById("deletedtodos");
    parent.innerHTML = "";
    if(parent){
        Object.keys(todos).forEach(
            function(key){
                if(todos[key].status == "DELETED"){
                    var todo_element = createTodoElement(key, todos[key]);
                    parent.appendChild(todo_element);
                }
            }
        )
    }
}*/

function createTodoElement(id, todo_object){
    var todo_element = document.createElement("tr");
    var inn1 = document.createElement("input");
    var inn2 = document.createElement("td"); inn2.innerHTML = todo_object.title;
    var inn3 = document.createElement("td");
    var inn = document.createElement("button"); inn3.appendChild(inn);
    inn.setAttribute("class","link");
    inn.setAttribute("onclick","runclick("+id+","+3+")");
    inn.innerHTML = "X";
    todo_element.appendChild(inn1);todo_element.appendChild(inn2);todo_element.appendChild(inn3);
    if(todo_object.status == "COMPLETE") {
        console.log("com");
        inn1.setAttribute("type","checkbox");
        inn1.setAttribute("checked","true");
        inn1.setAttribute("onclick","runclick("+id+","+1+")");
    }
    else if(todo_object.status == "ACTIVE") {
        console.log("act");
        inn1.setAttribute("type","checkbox");
        inn1.setAttribute("onclick","runclick("+id+","+2+")");
    }
    else{
        todo_element.innerHTML = "<td>"+todo_object.title + "</td>";
    }
    todo_element.setAttribute(
        "data-id", id
    );
    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );
    return todo_element;
}
function runclick(id,i) {
    if(i==1){
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/todos/"+id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        data = "todo_status=ACTIVE";
        xhr.onreadystatechange = function(){
            if (xhr.readyState == RESPONSE_DONE) {
                if (xhr.status == STATUS_OK) {
                    console.log(xhr.responseText);
                    updatetodos(xhr.responseText);
                }
                else {
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
    else if(i==2){
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/todos/"+id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        data = "todo_status=COMPLETE";
        xhr.onreadystatechange = function(){
            if (xhr.readyState == RESPONSE_DONE) {
                if (xhr.status == STATUS_OK) {
                    updatetodos(xhr.responseText);
                }
                else {
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
    else if(i==3){
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE","/api/todos/"+id,true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if(xhr.readyState == RESPONSE_DONE){
                if(xhr.status == STATUS_OK){
                    updatetodos(xhr.responseText);
                }
                else{
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.send();
    }
}
function getTodosAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                updatetodos(xhr.responseText);
                hidetodos(-1);
                hidetodos(-2);
                //updatecompletetodos(xhr.responseText);
                //updatedeletetodos(xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
function addTodoAJAX(){
    var title= document.getElementById("new_todo_input").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded");
    // HW : Read format of X-W-F-U-E
    // HW : Look up encodeURI
    var data = "todo_title=" + encodeURI(title);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                updatetodos(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function hidetodos(i) {
    if(i==-1){
        document.getElementById("complete").style.display = "block";
        document.getElementById("showcomplete").style.display = "none";
    }
    if(i==1){
        document.getElementById("complete").style.display = "none";
        document.getElementById("showcomplete").style.display = "block";
    }
    else if(i==2){
        document.getElementById("delete").style.display = "none";
        document.getElementById("showdeleted").style.display = "block";
    }
    else if(i==-2){
        document.getElementById("delete").style.display = "block";
        document.getElementById("showdeleted").style.display = "none";
    }
}
