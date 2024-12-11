
let board = {
    width: 400,
    height: 600,
    birdX: 80,
    birdY: 170
}
const birdWidth = 50;
const birdheight = 50;



let bird = {
    height: birdheight,
    width: birdWidth,
    xPos: board.birdX,
    YPos: board.birdY
};
let context;
let gameCanvas;
let sound;
let gameOverSound;

document.addEventListener('keydown', () => {
    sound.play()
    velocityY = -4
})
const manImage = "pic.jpg"
const birdImg = document.createElement('img')
birdImg.src = manImage;


let buildArrayTop = [];
let buildArrayBottom = [];
let buildWidth = 80;
let buildHeight = 400;
let buildX = board.width;
let buildTopY = 0;
let buildBottomY = (600 - buildHeight);
const TopBuilding = './top.jpg';
const bottomBuilding = './bottom.jpg';
let topBuildingImg;
let bottomBuildImg;
//

let velocityX = -1.2;
let velocityY = 0;
let gravity = 0.1;
//
let gameOver = false;

window.onload = function () {
    sound = new Audio('./tone.mp4')
    sound.loop = true;
    sound.muted=false

    gameOverSound=new Audio('./gameOver.mp3')
    gameOverSound.loop=true;
    gameOverSound.muted=false;

    // sound.play()
    const gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.height = board.height;
    gameCanvas.width = board.width;
    context = gameCanvas.getContext("2d");

    context.fillStyle = 'green';
    context.fillRect(bird.xPos, bird.YPos, bird.width, bird.height);
    context.drawImage(birdImg, bird.xPos, bird.YPos, bird.width, bird.height);

    // if(bird.YPos==0||bird.YPos==590){
    //     console.log('hey')
    // }

    bottomBuildImg = new Image()
    bottomBuildImg.src = bottomBuilding;

    topBuildingImg = new Image();
    topBuildingImg.src = TopBuilding;



    requestAnimationFrame(update);
    setInterval(placePipes, 3000);

}

function placePipes() {
    if (gameOver) {
        // sound.pause()
        return;
    }
    let tolerance = Math.floor(Math.random() * 300) / 2;
    let sign = Math.floor(Math.random() * 3);
    sign = 1 - sign;
    tolerance = (sign) * (tolerance);
    // const bottomHeight=300-(Math.floor(Math.random()*320)/2);
    let TopBuild = {
        image: topBuildingImg,
        X: buildX,
        Y: 0,
        height: 200 - tolerance,
        width: buildWidth,
        passed: false
    }
    let BottomBuild = {
        image: bottomBuildImg,
        X: buildX,
        Y: window.innerHeight - (230 + tolerance),
        height: 200 + tolerance,
        width: buildWidth,
        passed: false
    }

    // setInterval(()=>{
    //    velocityY+=0.2   
    // },50)
    buildArrayTop.push(TopBuild);
    buildArrayTop.push(BottomBuild);
}
function update() {
    if (gameOver) {
        // sound.pause()
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(birdImg, bird.xPos, bird.YPos, bird.width, bird.height)
    // if(bird.YPos==-10){
    //     alert('game over')
    //     location.reload();
    // }
    // if(bird.YPos==590){
    //     alert('game over')
    //     location.reload();
    // }
    velocityY += gravity;
    bird.YPos += velocityY


    for (let i = 0; i < buildArrayTop.length; i++) {
        let newBuild = buildArrayTop[i];
        newBuild.X += velocityX;
        if (detectCollision(bird, newBuild)) {
            gameOver = true
            gameOverSound.currentTime=17;
            sound.pause()
            gameOverSound.play()
        }
        lostGame()

        context.drawImage(newBuild.image, newBuild.X, newBuild.Y, newBuild.width, newBuild.height);
    }
}
function detectCollision(a, b) {
    return a.xPos < b.X + b.width &&
        a.xPos + a.width > b.X &&
        a.YPos < b.Y + b.height &&
        a.YPos + a.height > b.Y
}
function lostGame() {
    if (bird.YPos <= 0 || bird.YPos >= window.innerHeight - bird.height) {
        gameOver = true;
        gameOverSound.currentTime=12;
        sound.pause()
        gameOverSound.play()
    }
}