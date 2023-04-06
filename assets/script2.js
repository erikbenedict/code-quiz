// Parse high scores from local storage or create empty array
var highscores = JSON.parse(localStorage.getItem('highscores') || '[]');

// Sort high scores in descending order
highscores.sort(function(a, b) {
    return b.score - a.score;
});

// Loop through high scores and display each user's initials and score
var highscoresList = document.querySelector('ul');
for (var i = 0; i < highscores.length; i++) {
    var li = document.createElement('li');
    li.textContent = 'Initials: ' + highscores[i].initials + ', Score: ' + highscores[i].score;
    highscoresList.appendChild(li);
}

// Add event listener to "Go Back" button
var goBackBtn = document.getElementById('go-back');
goBackBtn.addEventListener('click', function() {
    window.location.href = 'index.html';
});

// Add event listener to "Clear High Scores" button
var clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
    localStorage.removeItem('highscores');
    highscoresList.innerHTML = '';
});