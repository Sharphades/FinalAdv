document.addEventListener("DOMContentLoaded", function () {
    const quizData = {
        java: [
            { question: "What is the correct way to declare a variable in Java?", options: ["var x = 10;", "int x = 10;", "let x = 10;"], correct: 1 },
            { question: "Which keyword is used to create a class in Java?", options: ["class", "create", "function"], correct: 0 },
            { question: "Which of these data types is not primitive in Java?", options: ["int", "float", "String"], correct: 2 },
            { question: "What is the default value of an integer variable in Java?", options: ["0", "null", "undefined"], correct: 0 }
        ],
        python: [
            { question: "Which of the following is used to define a function in Python?", options: ["def", "function", "func"], correct: 0 },
            { question: "Which of these is a Python data structure?", options: ["array", "list", "vector"], correct: 1 },
            { question: "What does the 'len()' function do in Python?", options: ["Returns length of an object", "Converts object to list", "Returns boolean value"], correct: 0 },
            { question: "Which keyword is used for exception handling in Python?", options: ["try", "catch", "throw"], correct: 0 }
        ],
        lua: [
            { question: "How do you declare a variable in Lua?", options: ["var", "let", "local"], correct: 2 },
            { question: "Which function is used to print output in Lua?", options: ["print", "echo", "output"], correct: 0 },
            { question: "Which of these is not a Lua data type?", options: ["number", "string", "boolean", "array"], correct: 3 },
            { question: "What operator is used for concatenating strings in Lua?", options: ["+", "&", ".."], correct: 2 }
        ]
    };

    const quizModal = new bootstrap.Modal(document.getElementById("quizModal"));
    const quizContent = document.getElementById("quizContent");
    const quizProgress = document.getElementById("quizProgress");
    const nextQuestionBtn = document.getElementById("nextQuestion");
    const toastElement = document.getElementById("quizToast");
    const toast = new bootstrap.Toast(toastElement);

    let currentQuiz = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Start Quiz
    document.querySelectorAll(".start-quiz").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const quizType = e.target.dataset.quiz;
            currentQuiz = quizData[quizType];
            currentQuestionIndex = 0;
            score = 0;

            // Reset progress bar
            quizProgress.style.width = "0%";
            quizProgress.setAttribute("aria-valuenow", "0");

            // Load first question
            loadQuestion();

            // Show modal
            quizModal.show();
        });
    });

    // Load Question
    function loadQuestion() {
        if (currentQuestionIndex < currentQuiz.length) {
            const question = currentQuiz[currentQuestionIndex];
            quizContent.innerHTML = `
                <h5>${question.question}</h5>
                <ul class="list-group">
                    ${question.options
                        .map((option, index) => `<li class="list-group-item"><input type="radio" name="quizOption" value="${index}"> ${option}</li>`)
                        .join("")}
                </ul>
            `;
            // Update progress bar
            const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
            quizProgress.style.width = `${progress}%`;
            quizProgress.setAttribute("aria-valuenow", progress);
        } else {
            submitQuiz();
        }
    }

    // Submit Quiz
    function submitQuiz() {
        // Show score on toast
        document.getElementById("userScore").textContent = score;
        toast.show();

        // Hide modal
        quizModal.hide();
    }

    // Next Question
    nextQuestionBtn.addEventListener("click", () => {
        const selectedOption = document.querySelector("input[name='quizOption']:checked");
        if (selectedOption && parseInt(selectedOption.value) === currentQuiz[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    });
});
