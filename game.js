let gamesq=[];
let usersq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let high=0;
let h2=document.querySelector("h2");

document.addEventListener("keydown", startGame);
document.addEventListener("click", handleClickStart);

function handleClickStart(e) {
    // Don't start if clicking on a button during the game
    if (!e.target.classList.contains("btn")) {
        startGame();
    }
}


function startGame() {
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
};

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250); 
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250); 
}
function levelUp(){
    usersq=[];
    level++;
    h2.innerText=`level ${level}`;
    if(level>high){
        high=level;
    }
    let randIdx=Math.floor(Math.random()*3);
    let randCol=btns[randIdx];
    let randbtn=document.querySelector(`.${randCol}`);
    // console.log(randIdx);
    // console.log(randCol);
    // console.log(randbtn);
    gamesq.push(randCol);
    console.log(gamesq);
    gameFlash(randbtn);
}

function checkAns(idx){
    //let idx=level-1;
    if(usersq[idx]==gamesq[idx]){
        if(usersq.length==gamesq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level-1}</b> <br> Press any key to start. <br> Highest score ${high-1}`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userCol=btn.getAttribute("id");
    usersq.push(userCol);

    checkAns(usersq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    started=false;
    gamesq=[];
    usersq=[];
    level=0;
}