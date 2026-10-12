
let signupForm = document.getElementById("signupForm");

let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let age = document.getElementById("age");
let country = document.getElementById("country");
let dob = document.getElementById("dob");

let errorname = document.getElementById("errorname");
let erroremail = document.getElementById("erroremail");
let errorpassword = document.getElementById("errorpassword");
let errorage = document.getElementById("errorage");
let errorcountry = document.getElementById("errorcountry");
let errordob = document.getElementById("errordob");

// Prevent dates in the future.
dob.max = new Date().toISOString().split("T")[0];

// Redirect an already logged-in user.
if (localStorage.getItem("loginUser")) {
    window.location.replace("quiz.html");
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear old errors.
    let errors = [
        errorname, erroremail, errorpassword,
        errorage, errorcountry, errordob
    ];

    errors.forEach(function (error) {
        error.innerText = "";
    });

    let nameValue = userName.value.trim();
    let emailValue = email.value.trim().toLowerCase();
    let passwordValue = password.value;
    let ageValue = Number(age.value);
    let countryValue = country.value;
    let dobValue = dob.value;

    let isValid = true;

    // Username validation.
    if (nameValue === "") {
        errorname.innerText = "Please enter your username.";
        isValid = false;
    }

    // Email validation.
    if (emailValue === "") {
        erroremail.innerText = "Please enter your email.";
        isValid = false;
    } else if (email.validity.typeMismatch) {
        erroremail.innerText = "Enter a valid email address.";
        isValid = false;
    }

    // Password validation.
    if (passwordValue.length < 8) {
        errorpassword.innerText =
            "Password must be at least 8 characters.";
        isValid = false;
    }

    // Age validation.
    if (
        age.value === "" ||
        !Number.isInteger(ageValue) ||
        ageValue < 1 ||
        ageValue > 120
    ) {
        errorage.innerText = "Enter an age between 1 and 120.";
        isValid = false;
    }

    // Country validation.
    if (countryValue === "") {
        errorcountry.innerText = "Please select your country.";
        isValid = false;
    }

    // Date of birth validation.
    if (dobValue === "") {
        errordob.innerText = "Please select your date of birth.";
        isValid = false;
    } else if (dobValue > dob.max) {
        errordob.innerText = "Date of birth cannot be in the future.";
        isValid = false;
    }

    // Stop if any field is invalid.
    if (!isValid) {
        return;
    }

    // Get existing users.
    let userList = JSON.parse(
        localStorage.getItem("UserList")
    ) || [];

    // Prevent duplicate email registrations.
    let userExists = userList.some(function (user) {
        return user.email.toLowerCase() === emailValue;
    });

    if (userExists) {
        erroremail.innerText = "This email is already registered.";
        return;
    }

    // Create a new user.
    let userObj = {
        userName: nameValue,
        email: emailValue,
        password: passwordValue,
        age: ageValue,
        country: countryValue,
        dob: dobValue
    };

    userList.push(userObj);

    // Save users in localStorage.
    localStorage.setItem("UserList", JSON.stringify(userList));

    alert("Account created successfully! Please sign in.");

    window.location.href = "index.html";
});

// Clear errors while typing.
userName.addEventListener("input", function () {
    errorname.innerText = "";
});

email.addEventListener("input", function () {
    erroremail.innerText = "";
});

password.addEventListener("input", function () {
    errorpassword.innerText = "";
});

age.addEventListener("input", function () {
    errorage.innerText = "";
});

country.addEventListener("change", function () {
    errorcountry.innerText = "";
});

dob.addEventListener("change", function () {
    errordob.innerText = "";
});
