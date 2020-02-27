//Hidden buttons and on click events
window.onload = function() {
    $('#choice-btns').hide();
    $('#time-remaining').hide();
    $('#display-text').hide();
    $("#start-btn").on("click", reset);
    $('#btn-1').html(questionArray[questionNumber]).on("click", function(){displayAnswer(questionNumber,0)});
    $('#btn-2').html(questionArray[questionNumber]).on("click", function(){displayAnswer(questionNumber,1)});
    $('#btn-3').html(questionArray[questionNumber]).on("click", function(){displayAnswer(questionNumber,2)});
    $('#btn-4').html(questionArray[questionNumber]).on("click", function(){displayAnswer(questionNumber,3)});
  };




//Trivia Questions: add questions here and in the question array to expand the game
var question0={questionText:"A manatee is born weighing about ___ pounds.:", btnArray:["100", "45", "65","35"], correctNum:2}
var question1={questionText:"The Indian Ocean formed about ___ million years ago.", btnArray:["65", "45", "25","5"], correctNum:0}
var question2={questionText:"There are more than ___ species of sponge.", btnArray:["30", "800", "2000","5000"], correctNum:3}
var question3={questionText:"The most venomous fish is the ___ .", btnArray:["lionfish", "reef stonefish", "stargazer","fang-tooth blenny"], correctNum:1}
var question4={questionText:"The longest living mammal on earth is the ___ whale.", btnArray:["bowhead", "humpback", "blue","beluga"], correctNum:0}
var question5={questionText:"The Pacific Ocean covers about ___% of the world's surface.", btnArray:["10", "20", "30","40"], correctNum:2}
var question6={questionText:"Octopuses have ___ hearts.", btnArray:["1", "2", "3","4"], correctNum:2}
//Question array
var questionArray=[question0,question1, question2, question3, question4, question5, question6];
//Globals  
var intervalId;
var time=30;
var questionNumber=0;
var clockRunning = false;
var numCorrect=0;
var numWrong=0;
var unanswered=0;



//Resets game for beginning or restart
  function reset() {
    $("#early-instructions").hide();
    questionNumber=0;
    numCorrect=0;
    numWrong=0;
    unanswered=0;
    shuffle(questionArray)
    $("#start-btn").show();
    $('#time-remaining').hide();
    $('#display-text').empty().hide();
    $('#choice-btns').hide();
    miniReset();
    advance();
  }


//Resets timer
  function miniReset()
  {
    stop();
    time = 30;
  }

//Randomizes question order
  function shuffle(array) 
  {
    array.sort(() => Math.random() - 0.5);
  }
  
  //Handles the game's results display
  function displayEnd()
  {
    miniReset();
    $("#start-btn").show();
    $("#early-instructions").html("Game Finished!").show();
    var finale='<div> You got ' + numCorrect + ' correct!</div>' +
    '<div> You got ' + numWrong + ' wrong!</div>' +
    '<div> You left ' + unanswered + ' unanswered!</div>' + 
    '<div>Press the start button to try again!</div>';
    $('#display-text').html(finale).show();
    $('#time-remaining').hide();
    $('#choice-btns').hide();
  }

  //Handles the game's question displays
  function displayQuestion(i,j)
  {
    var theQuestion=questionArray[i];
    $('#btn-1').html(theQuestion.btnArray[0]);
    $('#btn-2').html(theQuestion.btnArray[1]);
    $('#btn-3').html(theQuestion.btnArray[2]);
    $('#btn-4').html(theQuestion.btnArray[3]);
    $("#start-btn").hide();
    $('#display-text').html(theQuestion.questionText).show();
    $('#time-remaining').html("Time remaining: " + time + " seconds").show();
    $('#choice-btns').show();
    $('#btn-1');
    start();
  }

  //Handles the game's answer displays
  function displayAnswer(i,j)
  {
    stop();
    var theQuestion=questionArray[i];
    var theAnswer=theQuestion.btnArray[theQuestion.correctNum];
    var outcome;
    if(j>4)
    {
        outcome="Out of time! The correct answer was: " + theAnswer;
    }
    else if(j===theQuestion.correctNum)
    {
        outcome="Correct! The correct answer was: " + theAnswer;
        numCorrect++;
    }
    else
    {
        outcome="Nope! The correct answer was: " + theAnswer;
        numWrong++;
    }
    $("#start-btn").hide();
    $('#display-text').html(outcome).show();
    $('#time-remaining').hide();
    $('#choice-btns').hide();
    questionNumber++;
    setTimeout(function()
    { 
        advance(); 
    }, 5000);
  }

  //Advances from question to answer or results display on button press
  function advance() 
  {
    if (questionNumber>(questionArray.length-1)) 
    {
        miniReset();
        displayEnd();
    }
    else
    {
        miniReset();
        displayQuestion(questionNumber);
    }
  
  }

  //Starts the countdown timer
  function start() {
    if (!clockRunning) {
      clockRunning=true;
      intervalId=setInterval(count, 1000);
    }
 
  }

  //Stops the countdown timer
  function stop() 
  {
    clockRunning=false;
    clearInterval(intervalId);
  }
  
  //Handles the game's countdown and out-of-time advancement
  function count() {
    time--;
    if(time>-1)
    {
        $('#time-remaining').html("Time remaining: " + time + " seconds");
    }
    else
    {
        if (questionNumber>(questionArray.length-1)) 
        {
            miniReset();
            displayEnd();
        }
        else
        {
            unanswered++;
            miniReset();
            displayAnswer(questionNumber,5);
        }
    }
  }