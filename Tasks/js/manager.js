//manager mode
var managerButton = document.getElementById("btnManager");
managerButton.addEventListener("click", flipManagerMode);

function flipManagerMode() {
    managerButton.innerHTML = "user mode";
    managerButton.style.textTransform = 'uppercase';
    document.getElementById("progressPile").classList.add("none");
    document.getElementById("finishedPile").classList.add("none");
    document.getElementById("blockedPile").classList.add("none");
    document.getElementById("undefinedPile").classList.add("visible");
    document.getElementById("undefinedPile").style.flexBasis = "33%";
    document.getElementById("taskOwner").classList.add("none");
    document.getElementById("taskPriority").classList.add("visible");
    document.getElementById("usersPile").classList.add("visible");
    document.getElementById("usersPile").style.flexBasis = "33%";
    document.getElementById("notStartedPile").style.flexBasis = "33%";
    document.getElementById("display").classList.add("hide");
}

var users = document.getElementById("usersPile");
var userDiv = document.createElement("div");
users.appendChild(userDiv);
var userName = document.createElement("span");
userDiv.appendChild(userName); 
var addUserDiv = document.createElement("div");
users.appendChild(addUserDiv);
var addUserInput = document.createElement("input");
addUserDiv.appendChild(addUserInput);
var addUserBtn = document.createElement("button");
addUserDiv.appendChild(addUserBtn);
addUserBtn.innerHTML = "Add user";