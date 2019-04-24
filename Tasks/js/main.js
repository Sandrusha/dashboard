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

taskList = [];
var task01 = new Task("id01", "Learn Js", "Lorem Ipsum is simply dummy text of the printing and typesetting industry", "Ruby-Mae Fields", "High", "", "progress");
var task02 = new Task("id02", "Learn HTML", "Lorem Ipsum has been the industry's standard dummy text", "Shelbie Kaye", "Medium", "", "progress");
var task03 = new Task("id03", "Easter PP", "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature", "Daniaal Bob", "High", "", "notStarted");
var task04 = new Task("id04", "Easter LP", "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters", "Daniaal Bob", "Low", "", "notStarted");
var task05 = new Task("id05", "Set Easter Campaign", "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text", "Shelbie Kaye", "High", "", "finished");

taskList.push(task01);
taskList.push(task02);
taskList.push(task03);
taskList.push(task04);
taskList.push(task05);

document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i < taskList.length; i++) {
        var task = taskList[i]; //fiecare task din lista
        var divPileName = task.state + "Pile"; //.pileName
        var pileContainer = document.createElement("div"); //containerul fiecarui task

        var createdTitle = document.createElement("span");
        createdTitle.innerHTML = "Title: " + task.title;

        var createdDescription = document.createElement("span");
        createdDescription.innerHTML = "Description: " + task.description;

        var createdAssignee = document.createElement("span");
        createdAssignee.innerHTML = "Assignee to: " + task.assignee;

        var createdPriority = document.createElement("span");
        createdPriority.innerHTML = "Priority: " + task.priority;

        pileContainer.appendChild(createdTitle);
        pileContainer.appendChild(createdDescription);
        pileContainer.appendChild(createdAssignee);
        pileContainer.appendChild(createdPriority);

        var pile = document.getElementById(divPileName);
        pile.appendChild(pileContainer);

        pileContainer.setAttribute("id", task.id);
        pileContainer.setAttribute("draggable", true);
        pileContainer.addEventListener("dragstart", dragStartTask);

        pile.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
        pile.addEventListener("drop", dropTask);
    }
})
function dragStartTask(ev) {
    ev.dataTransfer.setData("Id", ev.target.id);
}

function dropTask() {
    event.preventDefault();
    var data = event.dataTransfer.getData("Id");
    event.target.appendChild(document.getElementById(data));
}

//add new task
var addNewTask = document.getElementById("addTask");
addNewTask.addEventListener("click", addNewTaskOnDashboard);

function addNewTaskOnDashboard(){
    
}