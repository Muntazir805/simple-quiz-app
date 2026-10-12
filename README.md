# Simple Quiz App

A simple, responsive quiz application built using **HTML, CSS, and vanilla JavaScript**. Users can create an account, sign in, answer multiple-choice questions, track their score, and retry the quiz.

## Features

- **Sign Up:** Register with your name, email, password, age, country, and date of birth.
- **Sign In:** Log in using your registered email and password.
- **Quiz Questions:** Answer multiple-choice questions.
- **Timer:** Complete the quiz within the given time.
- **Score & Results:** View your score and percentage after completing the quiz.
- **Retry Quiz:** Restart the quiz and try again.
- **Logout:** End the current session and return to the sign-in page.
- **Responsive Design:** Works on desktop, tablet, and mobile screens.
- **Local Storage:** Store registered user data and login session in the browser.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

## Project Structure

```text
quiz-app/
├── index.html       # Sign-in page
├── signup.html      # Sign-up page
├── quiz.html        # Quiz page
├── style.css        # Shared authentication page styles
├── quiz.css         # Quiz page styles
├── script.js        # Sign-in functionality
├── signup.js        # Sign-up functionality
├── quiz.js          # Quiz logic, timer, and results
└── README.md        # Project documentation
```

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in your browser, or use the **Live Server** extension in VS Code.
4. Create a new account on the sign-up page.
5. Sign in using your registered email and password.
6. Start answering the quiz questions.
7. View your results, retry the quiz, or log out.

## How It Works

1. A new user registers through the sign-up page.
2. The application saves the registered user's information in browser Local Storage.
3. The user signs in with their registered credentials.
4. After successful sign-in, the user is redirected to the quiz page.
5. The quiz displays questions, tracks the remaining time, and calculates the final score.
6. The user can retry the quiz or log out.

## Learning Objectives

This project helped me practice:

- Creating forms with HTML.
- Styling responsive layouts with CSS.
- Handling form submissions and user input with JavaScript.
- Using arrays and objects to manage quiz questions and user data.
- Working with browser Local Storage.
- Implementing conditional logic, timers, and event listeners.
- Updating webpage content dynamically through the DOM.

## Important Note

This project is intended for learning and practice. It uses browser Local Storage for user registration and session management. **It is not suitable for real-world authentication**, because client-side storage does not securely protect passwords or user data.

## Future Improvements

- Add more quiz categories and questions.
- Randomize the questions and answer options.
- Add difficulty levels.
- Store high scores and quiz history.
- Connect to a backend for secure authentication and data storage.

## Author

**Muntazir Hussain**

Computer Science Graduate | MERN Stack Trainee

GitHub: [Muntazir805](https://github.com/Muntazir805)