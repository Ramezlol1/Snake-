//board
var blocksize = 25
var rows = 20
var cols =20
var board
var context


//snake
var snakeX= blocksize * 5
var snakeY = blocksize * 5
var snakeBody=[]

var velocityX = 0
var velocityY = 0

//food 
var foodx= blocksize * 10
var foody = blocksize * 10
var score= 0;
var tempo=  1000



var gameover= false

window.onload=function(){
    board = document.getElementById('board') 
    board.height = rows * blocksize
    board.width = cols * blocksize
    context = board.getContext('2d')
    placeFood()
    document.addEventListener("keyup", changeDirection)//keydown kan ook
    setInterval(update,300)
}

function update(){
    if (gameover===true){
        return
    }
    document.getElementById("score").innerHTML="Score:" + score
    context.fillStyle="black"
    context.fillRect(0,0,board.width,board.height)

    context.fillStyle="red"
    context.fillRect(foodx,foody,blocksize,blocksize)
    
    //als de snake het eten kan opeten, dan moet het food element op een nieuwe positie komen
    if(snakeX == foodx && snakeY ==foody){

        score += 10
        tempo+= 100
        snakeBody.push([foodx,foody])
        placeFood()

    }
    for (let i =snakeBody.length-1;i>0;i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    if (snakeBody.length){
            snakeBody[0] = [snakeX,snakeY]
        }
    
    context.fillStyle="lime"
    snakeX+=velocityX * blocksize
    snakeY+=velocityY * blocksize
    context.fillRect(snakeX,snakeY,blocksize,blocksize)

    for (let i=0; i < snakeBody.length;i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize,blocksize)
    }

    if( snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY >rows * blocksize){
        gameover = true
        alert("GAME OVER NOOB") }
    
}


function placeFood(){
    foodx = Math.floor(Math.random() * cols) * blocksize
    foody = Math.floor(Math.random() * rows) * blocksize
}
function changeDirection(e){
    if (e.code==="ArrowUp" && velocityY !=1){
        velocityX = 0
        velocityY = -1
    }
    else if (e.code==="ArrowDown" &&  velocityY !=-1){
        velocityX= 0
        velocityY= 1
    }
    else if  (e.code==="ArrowRight" && velocityX !=-1){
        velocityX= 1
        velocityY= 0
    }
    else if  (e.code==="ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0

    }
    

}
