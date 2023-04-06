var time = document.getElementById('time-remaining');
var startScreen = document.getElementById('start-screen');
var startBtn = document.getElementById('start-btn');
var quiz = document.getElementById('quiz');
var questionTitle = document.getElementById('question-title');
var choices = document.getElementById('choices');
var endScreen = document.getElementById('end-screen');
var finalScore = document.getElementById('final-score');
var initials = document.getElementById('initials');
var submitBtn = document.getElementById('submit-btn');
var secondsLeft = 60;
var questionIndex = 0;
var timerInterval;

var quizQuestions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
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
        console.log('Correct');
    } else {
        console.log('Wrong');
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
    finalScore.textContent = secondsLeft;

    submitBtn.addEventListener('click', storeHighscore);
  }

  function storeHighscore() {
    // Retrieve user's initials and score
    var initialsValue = initials.value.trim();
    var scoreValue = finalScore.textContent.trim();

    // Validate user's input
    if (initialsValue === '' || scoreValue === '') {
        alert('Please enter your initials!');
        return;
    }

    // Store user's initials and score in local storage
    var highscores = JSON.parse(localStorage.getItem('highscores') || []);
    highscores.push({ initials: initialsValue, score: scoreValue });
    localStorage.setItem('highscores', JSON.stringify(highscores));

    // Redirect user to highscores.html page
    window.location.href = '.highscores.html';
}

  startBtn.onclick = startQuiz;