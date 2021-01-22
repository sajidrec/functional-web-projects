// initialization
var targetColorTxt = document.getElementById("targetedColor");
var btnNewColor = document.getElementById("btnNewColor");
var btnEasyMode = document.getElementById("btnEasyMode");
var btnHardMode = document.getElementById("btnHardMode");
var squarboxes = document.querySelectorAll(".squareBoxHeight");
var mainHeaderSec = document.querySelector("#mainHeader");
var numOfBoxes = 6;
var indexOfRandomBox = Math.floor(Math.random() * numOfBoxes);
var targetColor = squarboxes[indexOfRandomBox];
var gameOver = false;

squareRandomBGGenerator(numOfBoxes);
targetColorTxt.textContent = targetColor.style.background;

// game logic creator

for(var i = 0; i < numOfBoxes; i++){

    squarboxes[i].addEventListener("click",gameLogic);

}

// event creator

btnNewColor.addEventListener("click",function(){
    squareRandomBGGenerator(numOfBoxes);
    indexOfRandomBox = Math.floor(Math.random() * (numOfBoxes));
    targetColor = squarboxes[indexOfRandomBox];
    targetColorTxt.textContent = targetColor.style.background;
    ansHint.textContent = "";
    mainHeaderSec.style.setProperty("background-color","#17a2b8","important");
    gameOver = false;
});

btnEasyMode.addEventListener("click",function(){

    btnEasyMode.classList.add("btnSelected");
    btnHardMode.classList.remove("btnSelected");

    numOfBoxes = 3;
    
    squareRandomBGGenerator(numOfBoxes);

    for(var i = 3; i < 6; i++){
        squarboxes[i].style.background = "#232323";
    }
    
    indexOfRandomBox = Math.floor(Math.random() * (numOfBoxes));
    targetColor = squarboxes[indexOfRandomBox];
    targetColorTxt.textContent = targetColor.style.background;
    
    ansHint.textContent = "";
    mainHeaderSec.style.setProperty("background-color","#17a2b8","important");

    gameOver = false;
});

btnHardMode.addEventListener("click",function(){

    btnHardMode.classList.add("btnSelected");
    btnEasyMode.classList.remove("btnSelected");
    numOfBoxes = 6;
    
    squareRandomBGGenerator(numOfBoxes);
    
    indexOfRandomBox = Math.floor(Math.random() * (numOfBoxes));
    targetColor = squarboxes[indexOfRandomBox];
    targetColorTxt.textContent = targetColor.style.background;
    
    ansHint.textContent = "";
    mainHeaderSec.style.setProperty("background-color","#17a2b8","important");

    gameOver = false;
});

// function creator

function gameLogic(){

    if(this == targetColor){
        // Right guess
        
        ansHint.textContent = "Success!!!";

        mainHeaderSec.style.setProperty("background-color",targetColor.style.background,"important");

        for(var j = 0; j < numOfBoxes; j++){
            squarboxes[j].style.background = targetColor.style.background;
        }
        gameOver = true;
    }

    else{

        // Wrong guess
        if(!(gameOver)){
            this.style.background = "#232323";
            ansHint.textContent = "Wrong";
        }

    }
    
}

function randomColorGenerator(num){

    var r; 
    var g; 
    var b; 

    var rgb = [];

    for(var i = 0; i < num; i++){
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        rgb[i] = "rgb("+r+", "+g+", "+b+")";
    }  

    return rgb;

}

function squareRandomBGGenerator(num){

    var rgbColor = randomColorGenerator(num);

    for(var i = 0; i < num; i++){
        squarboxes[i].style.background = rgbColor[i];
    }

}