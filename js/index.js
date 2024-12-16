document.addEventListener("DOMContentLoaded", function () {
    const quizData = {
      html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lasagna"], correct: 0 },
        { question: "Choose the correct HTML element for the largest heading:", options: ["heading", "h1", "h6"], correct: 1 }
      ],
      css: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], correct: 0 },
        { question: "Which property is used to change the background color?", options: ["background-color", "bg-color", "color"], correct: 0 }
      ],
      javascript: [
        { question: "What is used to declare a variable in JavaScript?", options: ["var", "let", "const"], correct: 0 },
        { question: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<javascript>", "<script>"], correct: 2 }
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
      const userName = JSON.parse(localStorage.getItem("users"))[0]?.fullName || "Guest";
  
      // Update user's score in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = users.find((user) => user.fullName === userName);
      if (currentUser) {
        currentUser.scores = currentUser.scores || [];
        currentUser.scores.push({ quiz: currentQuiz.name, score });
        localStorage.setItem("users", JSON.stringify(users));
      }
  
      // Show toast with score
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
  