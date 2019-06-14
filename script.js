function Todo(id, task, dueDate, dueTime) {  
  this.id = id;
  this.task = task; 
  var dueTime = dueTime;  
  this.myTime = dueTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 
  var now = new Date();
  var myDate = dueDate;
  myDate = new Date(myDate).toUTCString();
  this.myDate = myDate.split(' ').slice(0, 4).join(' ');
  this.dueDate = Math.floor((Date.parse(dueDate) - Date.parse(now)) / 86400000);
  this.done = true;
  }

var todos = new Array();

window.onload = init;

function init() { 

var submitButton = document.getElementById("submit"); 
   submitButton.onclick = getFormData; 
   getTodoItems();   

}

function getTodoItems() {  
  if (localStorage) {     
  for (var i = 0; i < localStorage.length; i++) {   
  var key = localStorage.key(i);    
  if (key.substring(0, 4) == "todo") {      
  var item = localStorage.getItem(key);     
  var todoItem = JSON.parse(item);       
  todos.push(todoItem);     
    }      
  }     
   addTodosToPage();  
   }else {    
   console.log("Error: you don't have localStorage!"); 
   }
}
   
   
function addTodosToPage() {  
   var ul = document.getElementById("todoList"); 
   var listFragment = document.createDocumentFragment();   
   for (var i = 0; i < todos.length; i++) {      
   var todoItem = todos[i];    
   var li = createNewTodo(todoItem); 
   listFragment.appendChild(li); 
   }
   ul.appendChild(listFragment);
  }
  
function addTodoToPage(todoItem) {  
  var ul = document.getElementById("todoList");  
  var li = createNewTodo(todoItem); 
  ul.appendChild(li); 
  document.forms[0].reset();
  }
  
  function createNewTodo(todoItem) {  
    var li = document.createElement("li");  
	li.setAttribute("id", todoItem.id);
    var spanTodo = document.createElement("span");  
    spanTodo.innerHTML = todoItem.task + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| by " + todoItem.myDate + " @ " + todoItem.myTime + " (" + todoItem.dueDate + " days left)"; 
    var spanDone = document.createElement("span"); 
    if (!todoItem.done) {      
      spanDone.setAttribute("class", "notDone");    
      spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"; 
    }else {      
      spanDone.setAttribute("class", "done");    
      spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";  
    } 
    var spanDelete = document.createElement("span");    
	spanDelete.setAttribute("class", "delete");  
	spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";  
	
	spanDelete.onclick = deleteItem;	
	
    li.appendChild(spanDone);  
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);
	
  return li;
  }
  
/*function getConfirmation() {
  var retVal = confirm("Do you want to continue ?");
  if( retVal == true ) {
	  deleteItem;
    //return true;
  } else {
    document.write ("User does not want to continue!");
    return false;
  }
}*/
  
function getFormData() {   
  var task = document.getElementById("task").value;  
  if (checkInputText(task, "Please enter a task"))
	  return;   
  var date = document.getElementById("dueDate").value;  
  if (checkInputText(date, "Please enter a due date")) 
	  return;  
   var time = document.getElementById("dueTime").value;  
  if (checkInputText(time, "Please enter a due time"))
	  return;  
  
  
  var id = (new Date()).getTime();
  var todoItem = new Todo(id, task, date, time);  
  todos.push(todoItem);
  addTodoToPage(todoItem);
  saveTodoItem(todoItem);
  }
  
function checkInputText(value, msg) {  
  if (value == null || value == "") {  
  alert(msg);    
  return true;   
  }   
  return false;
  }
  
function saveTodoItem(todoItem) { 
   if (localStorage) {     
   var key = "todo" + todoItem.id;       
   var item = JSON.stringify(todoItem);    
   localStorage.setItem(key, item); 
   }else {     
   console.log("Error: you don't have localStorage!");  
   }
 }
 
function deleteItem(e) {   
  var span = e.target;  
  var id = span.parentElement.id; 
  console.log("delete an item: " + id);
 
 // find and remove the item in localStorage  
  var key = "todo" + id;    localStorage.removeItem(key);  
 // find and remove the item in the array 
  for (var i = 0; i < todos.length; i++) {   
    if (todos[i].id == id) {         
      todos.splice(i, 1);    
	  break;      
	  }   
  }  
  // find and remove the item in the page  
  var li = e.target.parentElement;   
  var ul = document.getElementById("todoList");   
  ul.removeChild(li);
}
