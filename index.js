// . is for class and # is for id 
const cells= document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn= document.querySelector("#restartBtn");
//console.log("Button element:", restartBtn); 
const winConditions= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer='X';
let running=false;
// cells.forEach((cell, index) => {
//     setTimeout(() => {
//         // Use curly braces for multiple lines!
//         cell.style.backgroundColor = "pink";
//         console.log(`hello from cell ${index}`);
//     }, 100 * index); // Multiply by index to see them happen one-by-one
// });

initializeGame();

function initializeGame(){
    cells.forEach((cell,index) =>{
        setTimeout(()=>{
            cell.style.backgroundColor="pink";
            console.log(`${index} colored`);
            cell.addEventListener("click",cellClicked);
        },index*400);
    });
    statusText.textContent=`${currentPlayer}'s turn`
    restartBtn.addEventListener("click", restartGame);
    running = true;

}

function cellClicked(){
    const cellIndex=this.getAttribute("cellIndex");
    console.log(`you are not a sigma for clicking the cell ${cellIndex}`);

    if(options[cellIndex]!="" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
    
}

function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}

function changePlayer(){
    currentPlayer= (currentPlayer =="X")?"O":"X";
    statusText.textContent=`${currentPlayer}'s turn`
}
function checkWinner(){
    winnerFound=false;
    winConditions.forEach(arr =>{
        if(winnerFound) return; 
        //console.log(arr)
        a=arr[0];
        b=arr[1];
        c=arr[2];
        /**
         * a==b==c is equivalent of (a==b)==c
            -> if a==b true: true==c
            not comparing their values
            this is applicable for js,c but gives error in java
            but is completely acceptable in python

            if (options[a]==options[b]==options[c]){
            }
         */
        if(options[a]==options[b] && options[b]==options[c] && options[a]!=""){
            console.log('winner dicided'); 
            console.log(a,b,c);
            statusText.textContent=`${currentPlayer} has won the game`;
            winnerFound=true;
            triggerMeme()
            
        }
        
    });
    if(!options.includes("")){
        running=false;
        statusText.textContent=`Draw`;
    }else if(winnerFound){
        running=false;
    }else{
        changePlayer();;
    }

    
}

// function triggerMeme() {
//   //const overlay = document.getElementById("memeOverlay");
//   const video = document.getElementById("memeVideo");
//   const sound = document.getElementById("memeSound");

//   overlay.style.display = "flex";
//   //overlay.classList.add("flash");

//   video.style.display = "block"; // Make it visible
//   video.play();                  // Start playing
//   //sound.play();
// }

function triggerMeme() {
  const video = document.getElementById("memeVideo");
  const sound = document.getElementById("memeSound");

  if (video) {
    video.style.display = "block"; // Make it visible
    video.play();                  // Start playing
  }

//   if (sound) {
//     sound.play();
//   }
}



function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
    console.clear()

}