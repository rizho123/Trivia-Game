var correct = 0;
var wrong = 0;

var currentQ = 0;
var nAnswered = 0;
var answered = 0;
var userSelect = 0;

var sec = 0;
var time = 0;

var messages = {
    correct: "Correct!",
    incorrect: "Sorry, that's incorrect!",
    endTime: "TIME OVER",
    finished: "Game Over"
}

var Questions = [{
    question: "What's the average temperature of lightning?",
    answerList: ["36,000 °F", "100 °F", "Same as a car", "Not as much as my laptop"],
    answer: 0
}, {
    question: "In 1995, Texas had hailstones as big as Softballs.",
    answerList: ["True", "False"],
    answer: 0
}, {
    question: "What is hail and how do they form?",
    answerList: ["Small droplets that are caught in the updraft", "Small baseballs thrown at us by the sky", "Free ice", "I thought they were rocks"],
    answer: 0
}, {
    question: "How do tornadoes form?",
    answerList: ["Warm, moist air + Cool, dry air", "When the sky is angry", "Strong winds", "When I Sneeze"],
    answer: 0
}, {
    question: "The lowest natural temperature ever at ground level on Earth is -128.6 °F at the Soviet Vostok Station in Antarctica.",
    answerList: ["True", "False"],
    answer: 0
}, {
    question: "Which of the following is a common cause for floods?",
    answerList: ["Heavy Rain", "When the ground doesn't absorb water fast enough", "When water isn't being used", "When the neighbor's toilet cloggs"],
    answer: 0
}]




$(document).ready(function () {
    $("#resetButton").hide()
    $("#answerImage").hide()
    $("#timer").hide()
    $("#currentQ").hide()
    function Game() {
        $("#message").empty();
        $("#correct").empty();
        $("#wrong").empty();
        $("#nAnswered").empty();
        $("#timer").show();
        currentQ = 0;
        correct = 0;
        wrong = 0;
        nAnswered = 0;
        newQuestion()
    }

    function newQuestion() {
        $("#status").empty();
        $("#intropage").empty()
        $("#correctAnswer").empty();
        $("#answerImage").hide()
        $("#currentQ").show()
        answered = true;

        $("#currentQ").text("Question #" + (currentQ + 1) + " of " + Questions.length);
        $("#question").text(Questions[currentQ].question);
        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(Questions[currentQ].answerList[i]);
            choices.attr({ "data-index": i });
            choices.addClass("choiceList");
            $(".answerChoices").append(choices);
        }
        countDown();

        $(".choiceList").on("click", function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    function answerPage() {
        $("#currentQ").hide();
        $(".choiceList").empty();
        $(".question").empty();
        $("#answerImage").show()
        var correctAnswerText = Questions[currentQ].answerList[Questions[currentQ].answer];
        var correctAnswerIndex = Questions[currentQ].answer;

        if ((userSelect == correctAnswerIndex) && (answered == true)) {
            correct++;
            $("#status").html(messages.correct);
            console.log("Question: " + Questions[currentQ].question)
            checkImg()
        } else if ((userSelect != correctAnswerIndex) && (answered == true)) {
            wrong++;
            $("#status").html(messages.incorrect);
            $("#correctAnswer").html("The correct answer was: " + correctAnswerText);
            console.log("Question: " + Questions[currentQ].question)
            checkImg()
        } else {
            nAnswered++;
            $("#status").html(messages.endTime);
            $("#correctAnswer").html("The correct answer was: " + correctAnswerText);
            console.log("Question(timeout): " + Questions[currentQ].question)
            answered = true;
            checkImg()
        }
        if (currentQ == (Questions.length - 1)) {
            setTimeout(finalScreen, 4000)
        } else { 
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
            $("#answerImage").attr("src","./assets/images/flood.gif")
        } 
    }

    function finalScreen() {
        $("#timer").empty();
        $("#status").empty();
        $("#correctAnswer").empty();
        $("#answerImage").hide()
        $("#question").empty();
        $("#message").html(messages.finished);
        $("#correct").html("You got " + correct + " correct!");
        $("#wrong").html("You got " + wrong + " wrong!");
        $("#nAnswered").html("Unanswered questions: " + nAnswered);
        $("#resetButton").show();
    }


    $("#button").on("click", function () {
        $(this).hide();
        Game();
    });
    $("#resetButton").on("click", function () {
        $(this).hide();
        Game();
    });

    function countDown() {
        sec = 20;
        $("#timer").text("Time Left: " + sec);
        answered = true;
        time = setInterval(showCountdDown, 1000);
    }


    function showCountdDown() {
        sec--;
        $("#timer").text("Time Left: " + sec);
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage()
        }
    }








})

