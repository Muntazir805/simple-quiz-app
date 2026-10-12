
let loginForm = document.getElementById("loginForm");

let email = document.getElementById("email");
let password = document.getElementById("password");

let erroremail = document.getElementById("erroremail");
let errorpassword = document.getElementById("errorpassword");

// If already logged in, open the quiz.
if (localStorage.getItem("loginUser")) {
    window.location.replace("quiz.html");
}


loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors.
    erroremail.innerText = "";
    errorpassword.innerText = "";

    let enteredEmail = email.value.trim().toLowerCase();
    let enteredPassword = password.value;

    // Validate empty fields.
    if (enteredEmail === "") {
        erroremail.innerText = "Please enter your email.";
    } else if (email.validity.typeMismatch) {
        erroremail.innerText = "Please enter a valid email.";
    }

    if (enteredPassword === "") {
        errorpassword.innerText = "Please enter your password.";
    }

    if (
        enteredEmail === "" ||
        email.validity.typeMismatch ||
        enteredPassword === ""
    ) {
        return;
    }

    // Get registered users.
    let userList = JSON.parse(
        localStorage.getItem("UserList")
    ) || [];

    // Find the matching email.
    let selectedUser = userList.find(function (user) {
        return user.email.toLowerCase() === enteredEmail;
    });

    if (!selectedUser) {
        erroremail.innerText = "Email is not registered.";
        return;
    }

    // Check the password.
    if (enteredPassword !== selectedUser.password) {
        errorpassword.innerText = "Incorrect password.";
        return;
    }

    // Save only the information needed for the session.
    let loginData = {
        userName: selectedUser.userName,
        email: selectedUser.email
    };

    localStorage.setItem(
        "loginUser",
        JSON.stringify(loginData)
    );

    // Open the quiz.
    window.location.href = "quiz.html";
});

// Clear errors as the user types.
email.addEventListener("input", function () {
    erroremail.innerText = "";
});

password.addEventListener("input", function () {
    errorpassword.innerText = "";
});
