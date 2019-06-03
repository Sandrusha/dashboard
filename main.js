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

class User {
    constructor(name) {
        this.name = name;   
    }
}

userList = [];
var user01 = new User("Alessandra Irving");
var user02 = new User("Steve Coles");
var user03 = new User("Maya North");
var user04 = new User("Alessia Rivera");
var user05 = new User("Primrose Phillips");

userList.push(user01);
userList.push(user02);
userList.push(user03);
userList.push(user04);
userList.push(user05);

var isManager = false;

managerPiles = ['undefinedPile', 'notStartedPile', 'usersPile'];
usersPiles = ['notStartedPile', 'progressPile', 'blockedPile', 'finishedPile'];

document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i < taskList.length; i++) {
        var task = taskList[i]; //each task from the list
        addTaskUI(task);
    }
    addDropEvents();
    
    //add new task
    var addNewTask = document.getElementById("addTask");
    addNewTask.addEventListener("click", addNewTaskOnDashboard);

    //add users on Manager mode
    for (i = 0; i < userList.length; i++) {
        var user = userList[i];
        addUserToPile(user);
    }
    var addUsersBtn = document.getElementById("addUsersBtn");
    addUsersBtn.addEventListener('click', addUsers);
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
    if (states[parentId].indexOf(pile.id) != -1) {
        var taskElement = document.getElementById(taskId);
        var reasonSpan = taskElement.getElementsByClassName("reason")[0];
        reasonSpan.classList.add("hide");
        var index = parseInt(taskId);
        if (pile.id === "blockedPile") {
            var reason = "";
            while (reason === "") {
                reason = prompt("What is the reason?").trim();
            }
            if (reason !== null) {
                taskList[index - 1].blockedReason = reason; // ca aici pt assignee
                reasonSpan.innerHTML = "Blocked reason: " + reason;
                reasonSpan.classList.remove("hide");
                pile.appendChild(taskElement);
            }
            setTimeout(function() {
                var progressPile = document.getElementById("progressPile");
                var taskEl = taskElement.cloneNode(true);
                progressPile.appendChild(taskEl);
                pile.removeChild(taskElement);
            }, 5000);
        } 
        else if (parentId === "undefinedPile") {
            var assignee = "";
            while (assignee === "") {
                assignee = prompt("Assignee to..").trim();
            } 
            if (assignee !== null) {
                var assigneeSpan = taskElement.getElementsByClassName("assignee")[0];
                assigneeSpan.innerHTML = "Assignee: " + assignee;
                assigneeSpan.classList.remove("none");
                pile.appendChild(taskElement);
                taskList[index - 1].assignee = assignee;
            }
        } 
        else if (pile.id === "finishedPile") {
            reset();
            startStop();   
            pile.appendChild(document.getElementById(taskId));
        }
        else {
            pile.appendChild(document.getElementById(taskId));
        }
    }
}

function addTaskUI(task) {
    var divPileName = task.state + "Pile"; //.pileName
    var pileContainer = document.createElement("div"); //container per task

    var createdTitle = document.createElement("span");
    createdTitle.innerHTML = "Title: " + task.title;

    var createdDescription = document.createElement("span");
    createdDescription.innerHTML = "Description: " + task.description;

    var createdAssignee = document.createElement("span");
    createdAssignee.innerHTML = "Assignee to: " + task.assignee;
    createdAssignee.setAttribute("class", "assignee");
    if (task.state === 'undefined') {
        createdAssignee.classList.add("none");
    }

    var createdPriority = document.createElement("span");
    createdPriority.innerHTML = "Priority: " + task.priority;
    createdPriority.classList.add("priority");

    if (task.state !== 'undefined') {
        createdPriority.classList.add("none");
    }

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
    var state = isManager ? "undefined" : "notStarted";
    var newTask = new Task(
        taskList.length + 1,
        document.getElementById("taskTitle").value,
        document.getElementById("taskDescription").value,
        !isManager ? document.getElementById("taskOwner").selectedOptions[0].innerHTML : "",
        !isManager ? "" : document.getElementById("taskPriority").selectedOptions[0].innerHTML,
        "",
        state
        );
    taskList.push(newTask);
    addTaskUI(newTask);
}

//manager mode
var managerButton = document.getElementById("btnManager");
managerButton.addEventListener("click", flipManagerMode);

var userPile = document.getElementById("usersPile");
var usersPileTitle = document.createElement("div");
userPile.insertBefore(usersPileTitle, userPile.childNodes[0]);
usersPileTitle.innerHTML = "USERS";

function flipManagerMode() {
    isManager = !isManager;
    managerButton.innerHTML = isManager ? "user mode" : "manager mode";
    managerButton.style.textTransform = 'uppercase';
    if (isManager) {
        for (var pile of usersPiles) {
            var pileEl = document.getElementById(pile);
            pileEl.classList.remove("visible");
            pileEl.classList.add("none");
        }
        for (var pile of managerPiles) {
            var pileEl = document.getElementById(pile);
            pileEl.classList.remove("none");
            pileEl.classList.add("visible");
            pileEl.style.flexBasis = "33%";
        } 
        document.getElementById("display").classList.add("hide");
        document.getElementById("taskOwner").classList.add("none");
        document.getElementById("taskPriority").classList.remove("none");
    } else {
        for (var pile of managerPiles) {
            document.getElementById(pile).classList.remove("visible");
            document.getElementById(pile).classList.add("none");
        }
        for (var pile of usersPiles) {
            document.getElementById(pile).classList.remove("none");
            document.getElementById(pile).classList.add("visible");
        }
        document.getElementById("display").classList.remove("hide");
        document.getElementById("taskOwner").classList.remove("none");
        document.getElementById("taskPriority").classList.add("none");
        document.getElementById("notStartedPile").style.flexBasis = "24%";
    }
}

function addUserToPile(user) {
    var userPile = document.getElementById("usersPile");
    var userDiv = document.createElement("div");
    userPile.insertBefore(userDiv, userPile.childNodes[1]);
    var userName = document.createElement("span");
    userDiv.appendChild(userName); 
    userName.innerHTML = user.name;    
}

function addUsers() {
    var userName = document.getElementById("userName");
    var newUser = new User(userName.value);
    userList.push(newUser);
    addUserToPile(newUser);
}

//create StopWatch
var container = document.getElementsByClassName("container")[0];
var stopWatchDiv = document.createElement("div");
container.insertBefore(stopWatchDiv, container.childNodes[2]);
var displayStopWatch = document.createElement("div");
stopWatchDiv.appendChild(displayStopWatch);
displayStopWatch.setAttribute("id", "display");
displayStopWatch.innerHTML = "Time passed from the last finished task: 00:00";

//define vars to hold time values
let seconds = 0;
let minutes = 0;

//define vars to hold display values
let displaySeconds = 0;
let displayMinutes = 0;

//define var to hold setInterval()
var interval = null;

//define var to hold stopWatch status
let status = "stopped";

function stopWatch() {
    seconds ++;

    if(seconds / 60 === 1) {
        seconds = 0;
        minutes ++;
    }

    if(seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    } else {
        displaySeconds = seconds;
    }

    if(minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

    document.getElementById("display").innerHTML = "Time passed from the last finished task: " + "<span>" + displayMinutes + ":" + displaySeconds + "</span>";
}

function startStop() {
    interval = window.setInterval(stopWatch, 1000);
}

function reset() {
    if (interval) {
        window.clearInterval(interval);
        seconds = 0;
        minutes = 0;
    }
    document.getElementById("display").innerHTML = "Time passed from the last finished task: 00:00";
}