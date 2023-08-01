var users = [];   // list to all users 
var names=[];     // list to the founded users 
var x;  
if (JSON.parse(localStorage.getItem('arr')) != null) {  // update the local storage 
    users = JSON.parse(localStorage.getItem('arr'));
}
if (JSON.parse(localStorage.getItem('lists')) != null) {    // update the local storage 
    names = JSON.parse(localStorage.getItem('lists'));
}
// print the name of founded user in the welcome page 
var cartouna=document.getElementById('demo'); 
if(names[0]!=null){
    cartouna.innerHTML = 'Welcome '+names[0];
}
// validation function 
function validEmail(email) {
    const patternEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return patternEmail.test(email);
}


//signup function 
function signup() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!username || !password || !email) {
        document.getElementById("incorrect").innerHTML = "All inputs are required";
        return;
    }

    var loggedInUser = users.find((user) => user.email === email);

    if (loggedInUser) {
        document.getElementById("incorrect").innerHTML = "Email already exists";
        clear2()
    }

    else if (!validEmail(email)) {
        document.getElementById("incorrect").innerHTML = "Invalid email.";
        clear2()
    }
    else {
        var user = {
            name: username,
            email: email,
            password: password
        };
        users.unshift(user);
        localStorage.setItem('arr', JSON.stringify(users));
        // Change success message color to green
        document.getElementById("incorrect").style.color = "#28a745";
        document.getElementById("incorrect").innerHTML = "Success";
        clear2()
    }
}

// login function 
function login() {
    var email = document.getElementById("useremail").value;
    var password = document.getElementById("userpassword").value;
    if (!email || !password) {
        document.getElementById("incorrect").innerHTML = "All inputs are required";
        return;
    }
    var loggedInUser = checkelement(email);
    if (loggedInUser != -1) {
        names.unshift(loggedInUser);
        localStorage.setItem('lists', JSON.stringify(names));
    }
    // Clear input fields
    clear()
}


// logout function to return to login page 
function logout() {
    // Replace "index.html" with the actual URL of the login page
    window.location.href = "index.html";
}

// clear function to login vars 
function clear() {
    // Clear input fields
    document.getElementById("useremail").value = "";
    document.getElementById("userpassword").value = "";

}

// clear function to signup vars
function clear2() {
    document.getElementById('username').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
}

// check if the element is exixit or not 
function checkelement(y) {
    //if match user is found
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == y) {
            window.location.href="welcom.html"
            return users[i].name;
        }
    }
    // If no matching user is found
    document.getElementById("incorrect").innerHTML = "Invalid email or password.";
    document.getElementById("incorrect").style.color = "red";
    return -1;
}
