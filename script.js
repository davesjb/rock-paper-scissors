/* Rock paper scissors game */

// Grab page data elements
const start = document.querySelector("[data-start]")
const playAgain = document.querySelector("[data-play-again]")
const hand = document.querySelector("[data-hand]")
const handOpponent = document.querySelector("[data-hand-2]")
const main = document.querySelector("[data-main]")
const roundNumber = document.querySelector("[data-round]")
const points = document.querySelector("[data-points]")
const pointsOpponent = document.querySelector("[data-points-opp]")
const buttons = document.querySelectorAll("[data-selection]")

// Set Variables for a game
const choice = ["rock", "paper", "scissors"]

let playerOneChoice = 0
let playerTwoChoice = 0
let playerOneScore = 0
let playerTwoScore = 0
let round = 0
let totalRounds = 5
let timeOut = 2000

// Add Animation and wait text
function handChange(handChoice, handPlayer) {
  if (round <= totalRounds) {
    handPlayer.style.animation = "shakePlayer 2s ease"
    main.innerText = "Please wait"
    handUpdate(handChoice, handPlayer)
    handPlayer.addEventListener("animationend", function () {
      this.style.animation = null
    })
  }
}

// Add icon
function handUpdate(handChoice, handPlayer) {
  handPlayer.classList.remove("scissors", "rock", "paper", "end")
  setTimeout(function () {
    handPlayer.classList.add(handChoice)
  }, timeOut)
}

// Toggle Show multiple buttons
function toggleShow(elements) {
  elements.forEach((elements) => {
    if (elements.classList.contains("hide")) {
      elements.classList.remove("hide")
      elements.classList.add("show")
    } else if (elements.classList.contains("show")) {
      elements.classList.remove("show")
      elements.classList.add("hide")
    } else {
      return
    }
  })
}

// Compare choices
function playRound(oneChoice, keysActived) {
  start.classList.add("hide")
  start.classList.remove("show")

  if ((keysActived = true)) {
    console.log("yes")
  }

  // Randomly pick player 2 choice
  const playerTwoChoose = choice[Math.floor(Math.random() * choice.length)]
  playerTwoChoice = playerTwoChoose
  round = round + 1

  // Change Icon
  handChange(oneChoice, hand)
  handChange(playerTwoChoice, handOpponent)

  // Run for total Rounds
  if (round == totalRounds) {
    playerProcess(oneChoice, playerTwoChoice)
    finalScore(playerOneScore, playerTwoScore)
    return
  } else {
    playerProcess(oneChoice, playerTwoChoice)
  }
}

// Decide Winner
function playerProcess(pOneChoice, pTwoChoice) {
  if (
    // Player 1 Wins
    (pOneChoice == "scissors" && pTwoChoice == "paper") ||
    (pOneChoice == "paper" && pTwoChoice == "rock") ||
    (pOneChoice == "rock" && pTwoChoice == "scissors")
  ) {
    let playerMessage =
      pOneChoice + " " + "beats" + " " + pTwoChoice + " " + "..You Win"
    let playerID = 1

    playerOneScore = playerOneScore + 1
    updateMessageScore(playerOneScore, playerID, playerMessage, round)
  } else if (
    // Player 2 Wins
    (pTwoChoice == "scissors" && pOneChoice == "paper") ||
    (pTwoChoice == "paper" && pOneChoice == "rock") ||
    (pTwoChoice == "rock" && pOneChoice == "scissors")
  ) {
    let playerMessage =
      pTwoChoice + " " + "beats" + " " + pOneChoice + " " + "..Opponent Wins"
    let playerID = 2

    playerTwoScore = playerTwoScore + 1
    updateMessageScore(playerTwoScore, playerID, playerMessage, round)
  } else {
    // Draw
    let playerMessage =
      pTwoChoice + " " + "and" + " " + pOneChoice + " " + "..Its a draw!!"
    let playerID = 3
    updateMessageScore(playerTwoScore, playerID, playerMessage, round)
  }
}

// Update Message Score and round
function updateMessageScore(score, id, message, roundPass) {
  const update = message
  setTimeout(function () {
    if (id == 1) {
      main.innerText = update
      points.innerText = score
      roundNumber.innerText = roundPass
    } else if (id == 2) {
      main.innerText = update
      pointsOpponent.innerText = score
      roundNumber.innerText = roundPass
    } else {
      main.innerText = update
      pointsOpponent.innerText = score
      roundNumber.innerText = roundPass
    }
  }, timeOut)
}

// Final score
function finalScore(scoreOne, scoreTwo) {
  roundNumber.innerText = "5, Game Ends!!!"
  const end = "end"
  setTimeout(function () {
    if (scoreOne < scoreTwo) {
      main.innerText = "You lose"
    } else if (scoreTwo < scoreOne) {
      main.innerText = "You Win"
    } else {
      main.innerText = "Its a draw"
    }
    handUpdate(end, hand)
    handUpdate(end, handOpponent)
  }, 4000)
  playAgain.classList.add("show")

  buttons.forEach((buttons) => {
    buttons.classList.remove("show")
    buttons.classList.add("hide")
  })
}

// Start Game
function startGame() {
  toggleShow(buttons)
  main.innerText = "Fight!"
  start.classList.add("hide")
  start.classList.remove("show")
}

// Start button
start.addEventListener("click", () => {
  startGame()
})

// Play again button
playAgain.addEventListener("click", () => {
  playerOneChoice = 0
  playerTwoChoice = 0
  playerOneScore = 0
  playerTwoScore = 0
  round = 0
  points.innerText = 0
  pointsOpponent.innerText = 0
  roundNumber.innerText = 0
  start.classList.remove("hide")
  playAgain.classList.remove("show")
  startGame()
})

// Listen for keyboard letters pressed
document.addEventListener("keydown", (e) => {
  const keyboardKey = e.code
  if (keyboardKey == "KeyS") {
    let keysActive = true
    playerOneChoice = "scissors"
    playRound(playerOneChoice, keysActive)
  } else if (keyboardKey == "KeyR") {
    let keysActive = true
    playerOneChoice = "rock"
    playRound(playerOneChoice, keysActive)
  } else if (keyboardKey == "KeyP") {
    let keysActive = true
    playerOneChoice = "paper"
    playRound(playerOneChoice, keysActive)
  }
})

// Button
buttons.forEach((buttons) => {
  buttons.addEventListener("click", (e) => {
    const selectName = buttons.dataset.selection
    let keysActive = false
    playRound(selectName, keysActive)
  })
})
