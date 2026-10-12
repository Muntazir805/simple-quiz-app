
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

let container = document.getElementById("container");
let welcomeText = document.getElementById("welcomeText");
let logoutBtn = document.getElementById("logoutBtn");

let question = document.getElementById("question");
let qno = document.getElementById("qno");
let timer = document.getElementById("timer");
let progressBar = document.getElementById("progressBar");

let quizForm = document.getElementById("quizForm");
let nextBtn = document.getElementById("nextBtn");
let quizError = document.getElementById("quizError");

let options = document.querySelectorAll('input[name="quiz"]');
let labels = [
    document.getElementById("label1"),
    document.getElementById("label2"),
    document.getElementById("label3"),
    document.getElementById("label4")
];

// Protect the quiz page.
if (!loginUser) {
    window.location.replace("index.html");
} else {
    startQuiz();
}

function startQuiz() {
    let questions = [
        {
            question: "What does SMIT stand for?",
            Option: [
                "Saylani Mass IT Training",
                "Software Management IT Training",
                "Student Mass IT Training",
                "Saylani Modern IT Technology"
            ],
            answer: "Saylani Mass IT Training"
        },
        {
            question: "Which language is used to structure a web page?",
            Option: ["CSS", "HTML", "JavaScript", "SQL"],
            answer: "HTML"
        },
        {
            question: "Which language is used to style a web page?",
            Option: ["HTML", "Java", "CSS", "PHP"],
            answer: "CSS"
        },
        {
            question: "Which language can add interactivity to a web page?",
            Option: ["JavaScript", "HTML", "SQL", "CSS"],
            answer: "JavaScript"
        },
        {
            question: "Which method selects an element by its ID?",
            Option: [
                "getElementsByClassName()",
                "getElementById()",
                "querySelectorAll()",
                "getElementsByTagName()"
            ],
            answer: "getElementById()"
        }
    ];

    let index = 0;
    let score = 0;
    let time = 120;
    let startInterval;
    let quizFinished = false;

    welcomeText.innerText = "Welcome, " + loginUser.userName + "!";

    // Show the current question and options.
    function showQuestion() {
        let currentQuestion = questions[index];

        qno.innerText =
            "Question " + (index + 1) + " of " + questions.length;

        question.innerText = currentQuestion.question;

        progressBar.style.width =
            ((index + 1) / questions.length) * 100 + "%";

        for (let i = 0; i < options.length; i++) {
            options[i].value = currentQuestion.Option[i];
            options[i].checked = false;
            labels[i].innerText = currentQuestion.Option[i];
        }

        quizError.innerText = "";

        if (index === questions.length - 1) {
            nextBtn.innerText = "Submit Quiz";
        } else {
            nextBtn.innerText = "Next Question";
        }
    }

    // Check the selected answer.
    function checkAnswer() {
        let selectedOption = document.querySelector(
            'input[name="quiz"]:checked'
        );

        if (!selectedOption) {
            quizError.innerText = "Please select an answer.";
            return false;
        }

        if (selectedOption.value === questions[index].answer) {
            score++;
        }

        return true;
    }

    // Update the countdown timer.
    function updateTimer() {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timer.innerText =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (time <= 20) {
            timer.classList.add("time-warning");
        } else {
            timer.classList.remove("time-warning");
        }
    }

    function startTimer() {
        updateTimer();

        startInterval = setInterval(function () {
            time--;

            updateTimer();

            if (time <= 0) {
                finishQuiz();
            }
        }, 1000);
    }

    // Display the final result.
    function finishQuiz() {
        if (quizFinished) {
            return;
        }

        quizFinished = true;
        clearInterval(startInterval);

        let percentage = Math.round(
            (score / questions.length) * 100
        );

        let message;

        if (percentage >= 80) {
            message = "Excellent work!";
        } else if (percentage >= 50) {
            message = "Good effort! Keep practicing.";
        } else {
            message = "Keep learning and try again.";
        }

        container.innerHTML = `
            <div class="result-card">
                <h2>Quiz Completed!</h2>
                <p>${message}</p>

                <div class="result-score">${percentage}%</div>

                <p>
                    You answered ${score} out of
                    ${questions.length} questions correctly.
                </p>

                <button type="button" id="retryBtn" class="next-btn">
                    Try Again
                </button>
            </div>
        `;

        document.getElementById("retryBtn").addEventListener(
            "click",
            function () {
                window.location.reload();
            }
        );
    }

    // Move to the next question or submit the quiz.
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (quizFinished) {
            return;
        }

        if (!checkAnswer()) {
            return;
        }

        if (index === questions.length - 1) {
            finishQuiz();
        } else {
            index++;
            showQuestion();
        }
    });

    // Clear the selection error when an option is chosen.
    options.forEach(function (option) {
        option.addEventListener("change", function () {
            quizError.innerText = "";
        });
    });

    // Log out and return to sign in.
    logoutBtn.addEventListener("click", function () {
        clearInterval(startInterval);

        localStorage.removeItem("loginUser");

        window.location.replace("index.html");
    });

    showQuestion();
    startTimer();
}
