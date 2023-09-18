document.querySelector(".js-rock-btn").addEventListener("click", () => {
  startPlay("rock");
  
});

document.querySelector(".js-paper-btn").addEventListener("click", () => {
  startPlay("paper");
  
});

document.querySelector(".js-scissors-btn").addEventListener("click", () => {
  startPlay("scissors");
 
});

document.querySelector(".js-reset-btn").addEventListener("click",()=>{
  reset();
 
})

document.querySelector(".js-autoplay-btn").addEventListener("click",()=>{
  autoPlay();
  
})

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    startPlay("rock");
    
  } else if (event.key === "p") {
    startPlay("paper");
    
  } else if (event.key === "s") {
    startPlay("scissors");
    
  }
  else if(event.key==="a"){
    autoPlay()
    
  }
  else if(event.key==="Backspace"){
    reset()
    
  }
});

let scores = JSON.parse(localStorage.getItem("scores")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
gameCount();
function startPlay(playerMove) {
  let result = "";
  computerMove = computerPick();
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "TIE";
    } else if (computerMove === "paper") {
      result = "LOSE";
    } else if (computerMove === "scissors") {
      result = "WIN";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "WIN";
    } else if (computerMove === "paper") {
      result = "TIE";
    } else if (computerMove === "scissors") {
      result = "LOSE";
    }
  }
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "LOSE";
    } else if (computerMove === "paper") {
      result = "WIN";
    } else if (computerMove === "scissors") {
      result = "TIE";
    }
  }
  if (result === "WIN") {
    scores.wins++;
  } else if (result === "LOSE") {
    scores.loses++;
  } else if (result === "TIE") {
    scores.ties++;
  }
  localStorage.setItem("scores", JSON.stringify(scores));
  resultElament = document.querySelector(".js-result");
  resultElament.innerHTML = result;
  compareElament = document.querySelector(".js-compare");
  compareElament.innerHTML = `You Picked <img class="move-icon" src="${playerMove}-emoji.png" alt="" /> Compueter Picked <img class="move-icon" src="${computerMove}-emoji.png" alt="" />`;
  gameCount();
}
function gameCount() {
  document.querySelector(
    ".js-count"
  ).innerHTML = `Wins: ${scores.wins}.Loses: ${scores.loses}.Ties: ${scores.ties}`;
}

let isAutoPlaying = false;
let interValId;
function autoPlay() {
  if (!isAutoPlaying) {
    interValId = setInterval(function () {
      const playerMove = computerPick();
      startPlay(playerMove);
    }, 200);
    isAutoPlaying = true;
  } else {
    clearInterval(interValId);
    isAutoPlaying = false;
  }
}

let computerMove = "";
function computerPick() {
  randomNumber = Math.floor(Math.random() * 3);
  if (randomNumber === 0) {
    computerMove = "rock";
  } else if (randomNumber === 1) {
    computerMove = "paper";
  } else if (randomNumber === 2) {
    computerMove = "scissors";
  }
  return computerMove;
}

function reset(){
  scores.wins=0;
  scores.ties=0;
  scores.loses=0;
  gameCount();
  localStorage.removeItem('scores')
}

