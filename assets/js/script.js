// Questions and choices Variables
var assesment = document.querySelector("#assesment");
var assesmentQuestions = document.querySelector("#Content");
var A1 = document.querySelector("#A1");
var A2 = document.querySelector("#A2");
var A3 = document.querySelector("#A3");
var A4 = document.querySelector("#A4");
var contentMeat = [
    {
        title: "How do you tell Javascript you're declaring a Variable?:",
        choices: ["Var ", "variable ", "functionality ", "string "],
        answer: 'A1'
    },
    
    {
        title: "What does Javascript even do?:",
        choices: ["Nothing at all " , "To make your website seem cooler than it actually is ", "Program the behavior of your page ", "Create viruses "],
        answer: 'A3'
    },

    {
        title: "How do you ensure your statement in your JS file isn't executed?:",
        choices: ["Put a '.' in the beggining ", "Put // before any statement ", "Put in '/dont execute.' before saving it ", "Just put '-' before the line "],
        answer: 'A2'
    },

    {
        title: "What are variables?:",
        choices: ["Unimportant things ", "Containers for storing data ", "Trojan horses ", "A very important thing "],
        answer: 'A2'
    },

    {
        title: "Which variables can't be redeclared?:",
        choices: ["var ", "const ", "function ", "let "],
        answer: 'A4'
    },

    {
        title: "Which one is not a data type?:",
        choices: ["function ", "number ", "string ", "object "],
        answer: 'A1'
    },

    {
        title: "What does a function do?:",
        choices: ["Nothing special ", "Do a particular task ", "Crash your PC ", "Execute order 66 "],
        answer: 'A2'
    },

    {
        title: "What's a string?:",
        choices: ["A line made of rope ", "A new computer Virus ", "A bunch of code ", "A sequence of one of more characters "],
        answer: 'A4'
    },

    {
        title: "What is an array?:",
        choices: ["Random values that mean nothing ", "A type of glitch ", "A special variable that holds more than 1 value ", "Nothing "],
        answer: 'A3'
    },

    {
        title: "What does a boolean represent?:",
        choices: ["Turn off my computer ", "Delete system32 ", "Share my SSN Number ", "1 of 2 values either True of False "],
        answer: 'A4'
    }
]

//Timer and score Variables
var begin = document.querySelector("#beginQuiz");
var timeCounter = document.querySelector("#remainingTime");
var timeBegin = 100;
var right = 0;
var wrong = 0;
var questionIndex = 0;

//Actual Timer function
function establishTime() {
    var timerInterval = setInterval(function() {
        timeBegin--;
        timeCounter.textContent = timeBegin + " seconds left.";
  
        if(timeBegin  === 0 || questionIndex === contentMeat.length) {
            clearInterval(timerInterval);
            timeCounter.textContent = "";
            alert("Quiz has been finished.");
            endgame();
        }

        if (timeBegin <= 0) {
            alert("TRASH!!!!!! You're out of time, guess you're not good enough for this class. Just drop it and give me your tuition money instead.");

            location.reload
            return false;
        }
  
        }, 1000);
    }

//End and results
function endgame(){
    var hiScore = parseInt(right) + parseInt(timeBegin);
    assesmentQuestions.innerHTML = "score: " + hiScore;
    assesment.innerHTML = "right: " + right + " " + "wrong: " + wrong;
    var saveScore = document.createElement("button");
    saveScore.innerHTML = "Get your name here and click to save, duhhhh";
    assesment.append(saveScore);
    var putScore = document.createElement("input");
    assesment.append(putScore);
    saveScore.addEventListener("click", function (event) {
        event.preventDefault();
        var points = JSON.parse(localStorage.getItem('points')) || [];
        var playerScore = {name: putScore.value, score: hiScore };
        points.length <=5 && points.push(playerScore);
        if (points.length >= 5){
            for (let i = 0; i < points.length; i++){
                if (points[i].score < playerScore.score){
                    points.splice(i, 1, playerScore);
                    break;
                }
            }
        }
        
         localStorage.setItem('highscore', JSON.stringify(points));
         points.map(i => {
            if (points.length > 5){
                points.splice(5);
            }
            var li = document.createElement("li");
            li.innerHTML = i.name + " " + i.score;
            return assesment.append(li);
         })
         putScore.style.visibility = "hidden";
         saveScore.style.visibility = "hidden";
         timeCounter.innerHTML = "Score Board";
    });
}

begin.addEventListener("click", function () {
    establishTime();
    showQuestions();
    begin.style.display= "none";
})

//Actual question function
function showQuestions() {
    for (var i = 0; i < contentMeat.length; i++) {
        var questionChoice = contentMeat[questionIndex].choices;
        var questionTitle = contentMeat[questionIndex].title;
        A1.innerHTML = questionChoice[0];
        A2.innerHTML = questionChoice[1];
        A3.innerHTML = questionChoice[2];
        A4.innerHTML = questionChoice[3];
        assesmentQuestions.innerHTML = questionTitle;
    }

}

function rightOrWrong(answer) {
    if (contentMeat[questionIndex].answer === answer) {
        alert("Yay!!!! You got the question right");
        right++;
        moveOn();
    }
    else {
        alert("IDIOT!!!!! this question isn't right");
        wrong++;
        timeBegin= timeBegin - 15;
        moveOn();
    }
}

function moveOn(){
    questionIndex++
    showQuestions();
}

