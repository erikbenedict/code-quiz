var time = document.getElementById('time-remaining');
var startScreen = document.getElementById('start-screen');
var startBtn = document.getElementById('start-btn');
var quiz = document.getElementById('quiz');
var questionTitle = document.getElementById('question-title');
var choices = document.getElementById('choices');
var result = document.getElementById('result');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var initials = document.getElementById('initials');
var submitBtn = document.getElementById('submit');
var initialsError = document.getElementById('initials-error');
var secondsLeft = 60;
var questionIndex = 0;
var timerInterval;

var quizQuestions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: "Alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
      answer: "Parentheses"
    },
    {
      title: "JavaScript is a ___-side programming language",
      choices: ["Client", "Server", "Both", "None"],
      answer: "Both"
    },
    {
      title: "How would you find the minimum of x and y using JavaScript?",
      choices: ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"],
      answer: "Math.min(x,y)"
    },
    {
      title: "Which of the following function of Array object removes the first element from an array and returns that element?",
      choices: ["reverse()", "shift()", "slice()", "some()"],
      answer: "shift()"
    }
  ]

  function startQuiz() {
    startScreen.setAttribute('class', 'hidden');
    quiz.removeAttribute('class', 'hidden');
    timerInterval = setInterval(function () {
        secondsLeft--;
        time.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            quizEnd();
        }
    },
    1000
    )
    showQuestions();
  }

  function showQuestions() {
    var currentQuestion = quizQuestions[questionIndex];
    questionTitle.textContent = currentQuestion.title
    currentQuestion.choices.forEach(
        function(choice) {
            var choiceBtn = document.createElement('button');
            choiceBtn.textContent = choice;
            choiceBtn.setAttribute('value', choice);
            choiceBtn.onclick = checkAnswer;
            choices.appendChild(choiceBtn);
        }
    )
  }

  function checkAnswer () {
    if (this.value === quizQuestions[questionIndex].answer) {
        result.textContent = 'Correct! 🤠';
    } else {
      result.textContent = 'Wrong 😣';
        secondsLeft -= 10;
        time.textContent = secondsLeft;
    }
    choices.innerHTML = '';
    questionIndex++;
    if (questionIndex === quizQuestions.length) {
        quizEnd()
    } else {
    showQuestions();
    }
  }

  function quizEnd (){
    clearInterval(timerInterval);
    quiz.setAttribute('class', 'hidden');
    endScreen.removeAttribute('class', 'hidden');
    endScreen.setAttribute('style', 'display: flex');
    finalScore.textContent = secondsLeft;

    submitBtn.onclick = storeHighScore;
  }

  function storeHighScore() {
    // Retrieve user's initials and score
    var initialsValue = initials.value.trim();
    var scoreValue = finalScore.textContent.toString().trim();

    // Validate user's input
    if (initialsValue === '') {
        initialsError.textContent = 'Please enter your initials!';
        return;
    }

    // Store user's initials and score in local storage
    var highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ initials: initialsValue, score: scoreValue });
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Redirect user to highScores.html page
    window.location.href = './assets/high-scores.html';
}

  startBtn.onclick = startQuiz;