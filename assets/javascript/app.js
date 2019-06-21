var correct = 0;
var wrong = 0;

//current question to store from loop
var currentQ = 0;
//holds input from user
var nAnswered = 0;
var answered = 0;
var userSelect = 0;

//timer variables
var sec = 0;
var time = 0;

//messages for new screen after answer result 
var messages = {
    correct: "Correct!",
    incorrect: "Sorry, that's incorrect!",
    endTime: "TIME OVER",
    finished: "Game Over"
}

var Questions = [{
    //Question One:
    question: "What's the average temperature of lightning?",
    answerList: ["36,000 °F", "100 °F", "Same as a car", "Not as much as my laptop"],
    answer: 0
}, {
    //Question Two:
    question: "In 1995, Texas had hailstones as big as Softballs.",
    answerList: ["True", "False"],
    answer: 0
}, {
    //Question Three:
    question: "What is hail and how do they form?",
    answerList: ["Small droplets that are caught in the updraft", "Small baseballs thrown at us by the sky", "Free ice", "I thought they were rocks"],
    answer: 0
}, {
    //Question Four:
    question: "How do tornadoes form?",
    answerList: ["Warm, moist air + Cool, dry air", "When the sky is angry", "Strong winds", "When I Sneeze"],
    answer: 0
}, {
    //Question Five:
    question: "The lowest natural temperature ever at ground level on Earth is -128.6 °F at the Soviet Vostok Station in Antarctica.",
    answerList: ["True", "False"],
    answer: 0
}, {
    //Question Six:
    question: "Can you tell the temperature by listening to a cricket's chirp?",
    answerList: ["True", "False"],
    answer: 0
}]




$(document).ready(function () {
    $("#resetButton").hide()
    $("#answerImage").hide()
    $("#timer").hide()
    function Game() {
        //clear html
        $("#message").empty();
        $("#correct").empty();
        $("#wrong").empty();
        $("#noanswered").empty();
        $("#timer").show();
        //clear counter
        currentQ = 0;
        correct = 0;
        wrong = 0;
        nAnswered = 0;
        //call to generate first question 
        newQuestion()
    }

    function newQuestion() {
        $("#status").empty();
        $("#intropage").empty()
        $("#correctAnswer").empty();
        $("#answerImage").hide()
        answered = true;

        //sets up new question
        $("#currentQ").text("Question #" + (currentQ + 1) + " of " + Questions.length);
        $("#question").text(Questions[currentQ].question);
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(Questions[currentQ].answerList[i]);
            choices.attr({ "data-index": i });
            choices.addClass("choiceList");
            $(".answerChoices").append(choices);
        }
        //timer
        countDown();

        //clicking an answer will pause the time and setup answerPage
        $(".choiceList").on("click", function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    function answerPage() {
        //Clears question page
        $("#currentQ").empty();
        $(".choiceList").empty();
        $(".question").empty();
        $("#answerImage").show()
        //holds the place for answer
        var correctAnswerText = Questions[currentQ].answerList[Questions[currentQ].answer];
        //correct answer place in array
        var correctAnswerIndex = Questions[currentQ].answer;

        //checks to see correct, wrong, or unanswered
        //if player chooses the right answer 
        if ((userSelect == correctAnswerIndex) && (answered == true)) {
            //then wins increase by one
            correct++;
            //and the correct message displays on new screen
            $("#status").html(messages.correct);
            //if player chooses wrong answer
            console.log("Question: " + Questions[currentQ].question)
            checkImg()
        } else if ((userSelect != correctAnswerIndex) && (answered == true)) {
            //wrong answer count goes up by one
            wrong++;
            $("#status").html(messages.incorrect);
            //correct answer displays
            $("#correctAnswer").html("The correct answer was: " + correctAnswerText);
            console.log("Question: " + Questions[currentQ].question)
            checkImg()
        } else {
            //if player does not choose one before the timer runs out
            nAnswered++;
            $("#status").html(messages.endTime);
            $("#correctAnswer").html("The correct answer was: " + correctAnswerText);
            console.log("Question(timeout): " + Questions[currentQ].question)
            answered = true;
            checkImg()
        }
        //once the last question is complete display scoreboard
        if (currentQ == (Questions.length - 1)) {
            setTimeout(finalScreen, 1000)
        } else {
            //otherwise, display next question 
            currentQ++;
            setTimeout(newQuestion, 4000);
            
        }
    }

    function checkImg () {
        $("#answerImage").show()
        if (Questions[0].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/lightning.gif")
        } else if (Questions[1].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/bighail.gif")
        } else if (Questions[2].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/hail.gif")
        } else if (Questions[3].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/tornado.gif")
        } else if (Questions[4].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/freeze.gif")
        } else if (Questions[5].question === Questions[currentQ].question) {
            $("#answerImage").attr("src","./assets/images/cricket.gif")
        } 
    }

    function finalScreen() {
        //clear the timer, and correctedAnswer 
        $("#timer").empty();
        $("#status").empty();
        $("#correctAnswer").empty();
        $("#answerImage").hide()
        //display message 
        $("#message").html(messages.finished);
        //final counter results
        $("#correct").html("You got " + correct + " correct!");
        $("#wrong").html("You got " + wrong + " wrong!");
        $("#nAnswered").html("Unanswered questions: " + nAnswered);
        //reset game 
        $("#resetButton").show();
    }


    //PROCESS
    //___________________________________________

    //start button 
    $("#button").on("click", function () {
        $(this).hide();
        Game();
    });
    //reset button
    $("#resetButton").on("click", function () {
        $(this).hide();
        Game();
    });

    function countDown() {
        //seconds per question
        sec = 10;
        $("#timer").text("Time Left: " + sec);
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        //seconds countdown
        sec--;
        $("#timer").text("Time Left: " + sec);
        //if seconds left is less than 1, then clear timer as player ran out of time 
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            //also displays answerPage function, to let player know they ran out of time for the question
            answerPage()
        }
    }








})

