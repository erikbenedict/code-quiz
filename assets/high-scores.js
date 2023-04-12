// * Parse high scores from local storage
var highScores = JSON.parse(localStorage.getItem('highScores') || '[]');

// * Sort high scores in descending order
highScores.sort(function(a, b) {
    return b.score - a.score;
});

// * Loop through high scores and display each user's initials and score
var highScoresList = document.querySelector('ol');
for (var i = 0; i < highScores.length; i++) {
    var li = document.createElement('li');
    li.textContent = 'Initials: ' + highScores[i].initials + ', Score: ' + highScores[i].score;
    highScoresList.appendChild(li);
}

// * "Go Back" button redirects users to index.html page
var goBackBtn = document.getElementById('go-back');
goBackBtn.addEventListener('click', function() {
    window.location.href = '../index.html';
});

// * "Clear High Scores" button clears high scores from local storage
var clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', function() {
    localStorage.removeItem('highScores');
    highScoresList.innerHTML = '';
});