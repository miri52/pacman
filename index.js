const width = 28;
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score");
let squares = []
let score = 0

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard(){
    for (let i = 0; i < layout.length; i++){
        const square = document.createElement("div");
        grid.append(square);
        squares.push(square)

        switch (layout[i]){
            case 0:
            squares[i].classList.add("pac-dot");
            break;
            case 1:
            squares[i].classList.add("walls");
            break;
            case 2:
            squares[i].classList.add("ghost-lair");
            break;
            case 3:
            squares[i].classList.add("power-pellet");
            break;  
        }
    }
}

createBoard()


// starting position
let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pacman")

function control(e){
    squares[pacmanCurrentIndex].classList.remove("pacman")
    switch (e.key) {
        case "ArrowDown":
            if (!squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') && 
            !squares[pacmanCurrentIndex + width].classList.contains('walls') &&
            pacmanCurrentIndex + width < width * width){
                pacmanCurrentIndex += width 
            }
            break;
        case "ArrowUp":
            if (!squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('walls') &&
            pacmanCurrentIndex - width >= 0){
                pacmanCurrentIndex -= width
            }
            break;
        case "ArrowLeft":
            if (!squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - 1].classList.contains('walls') &&
            pacmanCurrentIndex % width !== 0){
                pacmanCurrentIndex -= 1
                if (pacmanCurrentIndex === 364){
                    pacmanCurrentIndex = 391
                }
            }
            break;
        case "ArrowRight":
            if (!squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + 1].classList.contains('walls') &&
            pacmanCurrentIndex % width < width - 1){
                pacmanCurrentIndex += 1
                if (pacmanCurrentIndex === 391){
                    pacmanCurrentIndex = 364
                }
            }
            break;
    }
    squares[pacmanCurrentIndex].classList.add("pacman")
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score;     
    }
}

function powerPelletEaten(){
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')){
        score += 10;
        squares[pacmanCurrentIndex].classList.remove('power-pellet');
        ghosts.forEach(el => el.isScared = true)
        setTimeout(function(){
            ghosts.forEach(el => el.isScared = false)
            }, 10000)
    }
}

document.addEventListener("keyup", control)

class Ghost {
    constructor(className, startIndex, speed){
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
]

ghosts.forEach(el => {
    squares[el.currentIndex].classList.add(el.className);
    squares[el.currentIndex].classList.add('ghost')
});

ghosts.forEach(el => moveGhost(el))

function moveGhost(ghost){
    const directions = [-1, +1, - width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function(){
        if (
            !squares[ghost.currentIndex + direction].classList.contains('ghost') &&  
            !squares[ghost.currentIndex + direction].classList.contains('walls'))
            {
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className);
                squares[ghost.currentIndex].classList.add('ghost')
        } else {
            direction = directions[Math.floor(Math.random() * directions.length)]
        }

        if (ghost.isScared){
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')){
           squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost', ghost.className);
           ghost.currentIndex = ghost.startIndex;
           score += 100;
           squares[ghost.currentIndex].classList.add(ghost.className, 'ghost'); 
        }
        checkForGameOver()
    }, ghost.speed)
}

function checkForGameOver(){
 if(squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
     ghosts.forEach(el => clearInterval(el.timerId));
     document.removeEventListener('keyup', control);
     scoreDisplay.innerHTML = 'Game Over!'
 }
}

function checkForWin(){
    if (score >= 274) {
        ghosts.forEach(el => clearInterval(el.timerId));
        document.removeEventListener('keyup', control);
        scoreDisplay.innerHTML = 'You have won!' 
    }
}