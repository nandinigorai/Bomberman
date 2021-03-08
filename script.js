let gameActive = true;
// Creating 9 x 9 grid using CSS-grid
let container = document.querySelector(".grid-container");
let id = 1;
for (let i = 1; i <= 81; i++) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.id = `cell_{${id}}`;
    id++;
    container.appendChild(gridItem);
}

// Generating 10 random numbers to place the bombs
let bombsArr = [];
function resetBombs() {
    while (bombsArr.length < 10) {
        let randomNum = Math.floor(Math.random() * 81) + 1;
        if (bombsArr.indexOf(randomNum) === -1) {
            bombsArr.push(randomNum);
        }
    }
}

resetBombs(); // Initial placement 

let safeArray = [];

let points = 0;
let messageDisplay = document.getElementById("resultDisplay");
let score = document.getElementById("gameScore");

// function for displaying points, result
function displayResult(result) {
    if (result == 0) {
        messageDisplay.innerHTML = "Game Over!";
        messageDisplay.style.color = "red";
        gameActive = false;
    } else if (result == 71) {
        score.innerHTML = result;
        messageDisplay.innerHTML = "Bravo!!! You are a champion";
        gameActive = false;
    } else {
        score.innerHTML = result;
    }
}

// after every click do this
function handleCellEvent(clickedCellEvent) {

    if (!gameActive) {
        return;
    }

    const clickedCell = clickedCellEvent.target;
    const id = parseInt(clickedCell.getAttribute("id").substring(6, 8));

    if (bombsArr.includes(id)) {
        for (let i = 0; i < bombsArr.length; i++) {
            let bombElem = document.getElementById(`cell_{${bombsArr[i]}}`);
            bombElem.style.backgroundImage = "url('https://img.icons8.com/emoji/48/000000/bomb-emoji.png')"
            bombElem.style.backgroundColor = "red";
            displayResult(0);
        }

    } else {
        // condition to check if the cell is already clicked or not
        if (!safeArray.includes(id)) {
            safeArray.push(id);
            clickedCell.style.backgroundColor = "#67eb34";
            points++;
            displayResult(points);
        }
    }

}

let cellArray = document.querySelectorAll(".grid-item");

// function to restart the game
function reset() {
    gameActive = true;
    safeArray = [];
    points = 0;
    score.innerHTML = 0;
    messageDisplay.innerHTML = "Let's have some fun!";
    messageDisplay.style.color = "#3462eb";
    cellArray.forEach((cell) => cell.style.backgroundColor = "#7b7d8f");

    for (let i = 0; i < bombsArr.length; i++) {
        let bombElem = document.getElementById(`cell_{${bombsArr[i]}}`);
        bombElem.style.backgroundImage = "none"
    }

    bombsArr = [];
    resetBombs();
}

document.querySelectorAll(".grid-item")
    .forEach((cell) => cell.addEventListener("click", handleCellEvent));