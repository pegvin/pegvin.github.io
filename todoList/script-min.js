var todoList={initialise:function(){this.cacheDom(),this.bindEvents(),this.evalTasklist(),this.initTippy()},cacheDom:function(){this.taskInput=document.getElementById("input-task"),this.addBtn=document.getElementById("add-task-btn"),this.clearCompletedBtn=document.getElementById("clear-done-btn"),this.deleteAllBtn=document.getElementById("delete-all-btn"),this.tasklist=document.getElementById("tasks"),this.tasklistChildren=this.tasklist.children},initTippy:function(){tippy("[data-tippy-content]",{theme:"customTheme",placement:"top-end",touch:"hold",interactive:!0,arrow:!0,allowHTML:!0})},bindEvents:function(){this.addBtn.onclick=this.addTask.bind(this),this.taskInput.onkeypress=this.enterKey.bind(this),this.clearCompletedBtn.onclick=function(){document.querySelectorAll(".task.completed").length>0?document.querySelectorAll(".task.completed").forEach((t=>t.remove())):showMsg("Error","You Haven't Completed Anything!","warning","Close")},this.deleteAllBtn.onclick=function(){document.getElementById("tasks").innerHTML="",jQuery.isEmptyObject(Cookies.get())||(Cookies.remove("classArray"),Cookies.remove("textArray"))}},evalTasklist:function(){var t,e;for(t=0;t<this.tasklistChildren.length;t+=1)(e=this.tasklistChildren[t].getElementsByTagName("input")[0]).onclick=this.completeTask.bind(this,this.tasklistChildren[t],e),this.tasklistChildren[t].getElementsByTagName("i")[0].onclick=this.delTask.bind(this,t)},render:function(){var t,e,s,i;(t=document.createElement("li")).setAttribute("class","task"),t.setAttribute("data-tippy-content",this.taskInput.value),(e=document.createElement("input")).setAttribute("type","checkbox"),s=document.createTextNode(this.taskInput.value),(i=document.createElement("i")).setAttribute("class","far fa-minus-square"),t.appendChild(e),t.appendChild(i),t.appendChild(s),this.tasklist.appendChild(t),this.initTippy()},completeTask:function(t,e){e.checked?t.className="task completed":t.className="task"},incompleteTask:function(t){t.className="task"},enterKey:function(t){13!==t.keyCode&&13!==t.which||this.addTask()},addTask:function(){""===this.taskInput.value?showMsg("Error","Task field cannot be Empty","error","Close"):(this.render(),this.taskInput.value="",this.evalTasklist())},delTask:function(t){this.tasklist.children[t].remove(),this.evalTasklist()},clearCompleted:function(){document.querySelectorAll(".task.completed").length>0?document.querySelectorAll(".task.completed").forEach((t=>t.remove())):showMsg("Error","You Haven't Completed Anything!","warning","Close")}};function loadTasks(){if(!0===jQuery.isEmptyObject(Cookies.get()))return void showMsg("Error","No Saved Tasks Found, clearing cookies will remove all the saved tasks!","info","Close");var t,e,s,i,n;n=document.getElementById("tasks");let l=Cookies.get("classArray").split(","),a=Cookies.get("textArray").split(",");for(let o=0;o<l.length;o++)(t=document.createElement("li")).setAttribute("class",l[o]),t.setAttribute("data-tippy-content",a[o]),(e=document.createElement("input")).setAttribute("type","checkbox"),"task completed"==l[o]&&(e.checked=!0),s=document.createTextNode(a[o]),(i=document.createElement("i")).setAttribute("class","far fa-minus-square"),t.appendChild(e),t.appendChild(i),t.appendChild(s),n.appendChild(t);todoList.evalTasklist(),todoList.initTippy()}function saveTasks(){let t=document.querySelectorAll("li");if("0"==t.length)return void showMsg("Error","You have No Tasks To Save!","info","Close");let e=[],s=[];for(let i=0;i<t.length;i++)e.push(t[i].innerText),s.push(t[i].className);Cookies.set("textArray",e.join(","),{expires:366}),Cookies.set("classArray",s.join(","),{expires:366})}showMsg=function(t="Default",e="default",s="error",i="Close"){Swal.fire({title:t,html:e,icon:s,confirmButtonText:i,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,backdrop:!0})},window.onload=function(){todoList.initialise()},document.getElementById("load-all-btn").addEventListener("click",loadTasks),document.getElementById("save-all-btn").addEventListener("click",saveTasks);