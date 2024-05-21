var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var start=false;

var level=0;

var userClickedPattern=[];

$(document).on("keydown",function(e){
    var k=e.key;
    console.log(k);
    if(k==='a' || k==='A'){
        if(!start){
            level=0;
            $("h1").text("level "+level);
            start=true;
            nextSequence();
        }
    }
})

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    sound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

    level++;
    $("h1").text("level "+level);
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    console.log(randomNumber);

    var randomChoosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);

   // $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    sound(randomChoosenColor);
    animatePress(randomChoosenColor);

}

function sound(col){
    var audio=new Audio("sounds/"+col+".mp3");
    audio.play();
}


function animatePress(currentColour){
    var a=$("#"+currentColour);
    a.addClass("pressed");
    setTimeout(function(){
        a.removeClass("pressed")
    },100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    }
    else{
        console.log("failure");
        var wrongAudio=new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        var b=$("body");
        b.addClass("game-over");
        setTimeout(function(){
            b.removeClass("game-over")
        },200);

        $("h1").text("Game Over, Press A to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}


