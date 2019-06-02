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
    document.getElementsByClassName("addUsers")[0].classList.add("visibility");
}

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

document.addEventListener("DOMContentLoaded", function() {
    for (i = 0; i < userList.length; i++) {
        var user = userList[i];
        addUserToPile(user);
    }

    var addUsersBtn = document.getElementById("addUsersBtn");
    addUsersBtn.addEventListener('click', addUsers)
})

function addUserToPile(user) {
    var userPile = document.getElementById("usersPile");
    var userDiv = document.createElement("div");
    userPile.appendChild(userDiv);
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

