// Logic implemented by Me (MD. Sajid Hossain).
// But html and css part is completely written by other
"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let guessNumber,
  highScore = 0,
  score = 20,
  msg;

document.querySelector(".check").addEventListener("click", function () {
  if (score > 0) {
    score--;
    document.querySelector(".score").textContent = score;
    guessNumber = document.querySelector(".guess").value;
    if (guessNumber == secretNumber) {
      document.querySelector("body").style.backgroundColor = "green";
      document.querySelector(".number").textContent = secretNumber;
      msg = "You guessed it and you're score is " + score + "🎉.";
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
      score = 0;
    } else if (guessNumber > secretNumber) {
      msg = "You guessed higher number⚡.";
      document.querySelector("body").style.backgroundColor = "red";
    } else {
      msg = "You guessed lower number〽.";
      document.querySelector("body").style.backgroundColor = "gray";
    }
    document.querySelector(".message").textContent = msg;
  }
  document.querySelector(".again").addEventListener("click", () => {
    score = 20;
    document.querySelector(".score").textContent = score;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").textContent = "?";
  });
});
