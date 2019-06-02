class Task {
    constructor(id, title, description, assignee, priority, blockedReason, state) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.priority = priority;
        this.blockedReason = blockedReason;
        this.state = state;
    }
}

states = {
    "undefinedPile": ["notStartedPile"],
    "notStartedPile": ["undefinedPile", "progressPile", "blockedPile"],
    "progressPile": ["notStartedPile", "blockedPile", "finishedPile"],
    "blockedPile": ["notStartedPile", "progressPile"],
    "finishedPile": []
}

taskList = [];
var task01 = new Task("1", "Learn Js", "Lorem Ipsum is simply dummy text of the printing and typesetting industry", "Ruby-Mae Fields", "High", "", "progress");
var task02 = new Task("2", "Learn HTML", "Lorem Ipsum has been the industry's standard dummy text", "Shelbie Kaye", "Medium", "", "progress");
var task03 = new Task("3", "Easter PP", "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature", "Daniaal Bob", "High", "", "notStarted");
var task04 = new Task("4", "Easter LP", "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters", "Daniaal Bob", "Low", "", "notStarted");
var task05 = new Task("5", "Set Easter Campaign", "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text", "Shelbie Kaye", "High", "", "finished");

taskList.push(task01);
taskList.push(task02);
taskList.push(task03);
taskList.push(task04);
taskList.push(task05);

document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i < taskList.length; i++) {
        var task = taskList[i]; //fiecare task din lista
        addTaskUI(task);
    }

    addDropEvents();

    //add new task
    var addNewTask = document.getElementById("addTask");
    addNewTask.addEventListener("click", addNewTaskOnDashboard);
})

function dragStartTask(ev) {
    ev.dataTransfer.setData("Id", ev.target.id);
    ev.dataTransfer.setData("parentId", ev.target.parentElement.id);
}

function dropTask() {
    event.preventDefault();
    var taskId = event.dataTransfer.getData("Id");
    var parentId = event.dataTransfer.getData("parentId");
    var target = event.target;
    var pile = target.closest(".pile");
    if(states[parentId].indexOf(pile.id) != -1) {
        if(pile.id === "blockedPile") {
            var reason = "";
            while(reason === "") {
                reason = prompt("What is the reason?").trim();
            }
            if (reason !== null) {
                var index = parseInt(taskId);
                taskList[index - 1].blockedReason = reason;
                var taskElement = document.getElementById(taskId);
                var reasonSpan = taskElement.getElementsByClassName("reason")[0];
                reasonSpan.innerHTML = "Blocked reason: " + reason;
                reasonSpan.classList.remove("hide");
                pile.appendChild(taskElement);
            }
        } else {
            pile.appendChild(document.getElementById(taskId));
            var taskElement = document.getElementById(taskId);
            var reasonSpan = taskElement.getElementsByClassName("reason")[0];
            reasonSpan.classList.add("hide");
        }
    }
}

function addTaskUI(task) {
    var divPileName = task.state + "Pile"; //.pileName
    var pileContainer = document.createElement("div"); //containerul fiecarui task

    var createdTitle = document.createElement("span");
    createdTitle.innerHTML = "Title: " + task.title;

    var createdDescription = document.createElement("span");
    createdDescription.innerHTML = "Description: " + task.description;

    var createdAssignee = document.createElement("span");
    createdAssignee.innerHTML = "Assignee to: " + task.assignee;
    createdAssignee.setAttribute("class", "assignee");

    var createdPriority = document.createElement("span");
    createdPriority.innerHTML = "Priority: " + task.priority;
    createdPriority.classList.add("priority");
    createdPriority.classList.add("hide");

    var createdBlockedReason = document.createElement("span");
    createdBlockedReason.classList.add("reason");
    createdBlockedReason.innerHTML = "Blocked reason: " + task.blockedReason;
    createdBlockedReason.classList.add("hide");

    pileContainer.appendChild(createdTitle);
    pileContainer.appendChild(createdDescription);
    pileContainer.appendChild(createdAssignee);
    pileContainer.appendChild(createdPriority);
    pileContainer.appendChild(createdBlockedReason);

    var pile = document.getElementById(divPileName);
    pile.appendChild(pileContainer);

    pileContainer.setAttribute("id", task.id);
    pileContainer.setAttribute("draggable", true);
    pileContainer.addEventListener("dragstart", dragStartTask);
}

function addDropEvents() {
    var pileList = document.getElementsByClassName("pile");
    for (i = 0; i < pileList.length; i++) {
        var pile = pileList[i];

        pile.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
        pile.addEventListener("drop", dropTask);
    }
}

function addNewTaskOnDashboard(){
    var priority = "";
    var state = "notStarted";
    var newTask = new Task(
        taskList.length + 1,
        document.getElementById("taskTitle").value,
        document.getElementById("taskDescription").value,
        document.getElementById("taskOwner").selectedOptions[0].innerHTML,
        priority,
        "",
        state
        );
    taskList.push(newTask);
    addTaskUI(newTask);
}