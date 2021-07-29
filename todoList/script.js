var todoList = {
	initialise: function() {
		this.cacheDom();
		this.bindEvents();
		this.evalTasklist();
		this.initTippy();
	},

	cacheDom: function() {
		this.taskInput = document.getElementById("input-task");
		this.addBtn = document.getElementById("add-task-btn");
		this.clearCompletedBtn = document.getElementById("clear-done-btn");
		this.deleteAllBtn = document.getElementById("delete-all-btn")
		this.tasklist = document.getElementById("tasks");
		this.tasklistChildren = this.tasklist.children;
	},

	initTippy: function() {
		tippy('[data-tippy-content]', {
			theme: 'customTheme',
			placement: 'top-end',
			touch: 'hold',
			interactive: true,
			arrow: true,
			allowHTML: true,} );
	},

	bindEvents: function() {
		this.addBtn.onclick = this.addTask.bind(this);
		this.taskInput.onkeypress = this.enterKey.bind(this);

		this.clearCompletedBtn.onclick = function() {
			if (document.querySelectorAll(".task.completed").length > 0) {
				document.querySelectorAll(".task.completed").forEach(el => el.remove());
			} else { showMsg("Error", "You Haven't Completed Anything!", "warning", "Close") }	
		};

		this.deleteAllBtn.onclick = function() {
			document.getElementById("tasks").innerHTML = "";
			if (!jQuery.isEmptyObject(Cookies.get())) {
				Cookies.remove("classArray");
				Cookies.remove("textArray");
			}
		}
	},

	evalTasklist: function() {
		var i, chkBox, delBtn;
		for (i = 0; i < this.tasklistChildren.length; i += 1) {
			chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
			chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);

			delBtn = this.tasklistChildren[i].getElementsByTagName("i")[0];
			delBtn.onclick = this.delTask.bind(this, i);
		}
	},

	render: function() {
		var taskLi, taskChkbx, taskVal, taskTrsh;
		taskLi = document.createElement("li");
		taskLi.setAttribute("class", "task");
		taskLi.setAttribute('data-tippy-content', this.taskInput.value);
		taskChkbx = document.createElement("input");
		taskChkbx.setAttribute("type", "checkbox");
		taskVal = document.createTextNode(this.taskInput.value);
		taskTrsh = document.createElement("i");
		taskTrsh.setAttribute("class", "far fa-minus-square");

		taskLi.appendChild(taskChkbx);
		taskLi.appendChild(taskTrsh);
		taskLi.appendChild(taskVal);
		this.tasklist.appendChild(taskLi);
		this.initTippy();
	},

	completeTask: function(i, chkBox) {
		if (chkBox.checked) { i.className = "task completed"; }
		else { i.className = "task"; }
	},

	incompleteTask: function(i) { i.className = "task"; },
	enterKey: function(event) {	if (event.keyCode === 13 || event.which === 13) { this.addTask(); } },
	addTask: function() {
		var value = this.taskInput.value;
		if (value === "") { showMsg("Error", "Task field cannot be Empty", "error", "Close"); }
		else {
			this.render();
			this.taskInput.value = "";
			this.evalTasklist();
		}
	},

	delTask: function(i) {
		this.tasklist.children[i].remove();
		this.evalTasklist();
	},

	clearCompleted: function() {
		if (document.querySelectorAll(".task.completed").length > 0) {
			document.querySelectorAll(".task.completed").forEach(el => el.remove());
		} else { showMsg("Error", "You Haven't Completed Anything!", "warning", "Close") }
	},
	
};

showMsg = function(title='Default', text='default', icon='error', btnText='Close') {
	Swal.fire({
		title: title,
		html: text,
		icon: icon,
		confirmButtonText: btnText,
		allowOutsideClick: true,
		allowEscapeKey: true,
		allowEnterKey: true,
		backdrop: true,
	})
}

window.onload = function() { todoList.initialise(); }

document.getElementById("load-all-btn").addEventListener("click", loadTasks);
document.getElementById("save-all-btn").addEventListener("click", saveTasks);

function loadTasks() {
	if (jQuery.isEmptyObject(Cookies.get("classArray"))) {
		showMsg("Error", "No Saved Tasks Found, clearing cookies will remove all the saved tasks!", "info", "Close")
		return ;
	}

	var taskLi, taskChkbx, taskVal, taskTrsh, tasklist;
	tasklist = document.getElementById("tasks");
	let classArray = Cookies.get("classArray").split(',');
	let textArray = Cookies.get("textArray").split(",");

	for (let i = 0; i < classArray.length; i++) {
		taskLi = document.createElement("li");
		taskLi.setAttribute("class", classArray[i]);
		taskLi.setAttribute('data-tippy-content', textArray[i]);

		taskChkbx = document.createElement("input");
		taskChkbx.setAttribute("type", "checkbox");
		if (classArray[i] == "task completed") { taskChkbx.checked = true; }

		taskVal = document.createTextNode(textArray[i]);

		taskTrsh = document.createElement("i");
		taskTrsh.setAttribute("class", "far fa-minus-square");

		taskLi.appendChild(taskChkbx);
		taskLi.appendChild(taskTrsh);
		taskLi.appendChild(taskVal);
		tasklist.appendChild(taskLi);
	}
	todoList.evalTasklist();
	todoList.initTippy();
}

function saveTasks() {
	let array = document.querySelectorAll("li");
	if (array.length == "0") {
		showMsg("Error", "You have No Tasks To Save!", "info", "Close");
		return;
	}

	let textArray = [];
	let classArray = [];

	for (let i = 0; i < array.length; i++) {
		textArray.push(array[i].innerText);
		classArray.push(array[i].className);
	}

	Cookies.set('textArray', textArray.join(","), { expires: 366 })
	Cookies.set('classArray', classArray.join(","), { expires: 366 })
};

console.log("What You Doin Here ?");