const body = document.querySelector('body')

const header = {
  barToChangeLevel: document.querySelector('.bar--level-select'),
  numberToMultiplie: document.querySelector('.number-to-multiplie'),
  nameOfLevel: document.querySelector('.text--name-of-level')
};

const main ={
  numberToChoose: document.querySelector('.number--to-choose'),
  tipIfWrong: document.querySelector('.text--tip-if-wrong'),
  numberChoosed: document.querySelector('.number-choosed'),
  svg: {
    normalHeart: document.querySelector('.normal-heart'),
    brokenHeart: document.querySelector('.heart-brea')
  },
  numberRestOfLife: document.querySelector('.rest-of-life'),
  btnToTry: document.querySelector('.btn--try')
};

const scores ={
  firstPlace: document.querySelector('.first-place-score'),
  seccondPlace: document.querySelector('.seccond-place-score'),
  thirdPlace: document.querySelector('.third-place-score')
};



let chancesLeft = 10; // its used to count the remaining chances (when users guess wrong it will be decressed by checkIfNumberMatches())
let multipliedNumber = 1 // it is used to multiplier the user score, (it is linked to changingLevel(), function that gives a new secret number and checks the level of the game)
let secretNumber = Math.trunc(Math.random() * header.barToChangeLevel.value) + 1; // used to give the secret number, when changingLevel() or resetGame() its called, they gives it a new value


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// Changes the secret number . gets the value of the bar. change the multiplier, the name of level and the range
function changingLevel(){

  const numberOfTheLevelBar = header.barToChangeLevel.value; // gets value from range bar
  multipliedNumber = Math.trunc(numberOfTheLevelBar / 10) // it gives a new multiplier based on the level of numberOfTheLevelBar
                                                                                                       
  main.numberToChoose.textContent = numberOfTheLevelBar; //it changes the text displayed only on the value (`choose a number between 1 and ${numberOfTheLevelBar}.....`)
  header.numberToMultiplie.textContent = multipliedNumber; // it changes the text that shows by how much the score its been multiplied

  numberOfTheLevelBar < 40 ? header.nameOfLevel.textContent = "Difícil 🙊" : header.nameOfLevel.textContent = "Muito difícil 😎";
  numberOfTheLevelBar < 30 ? header.nameOfLevel.textContent = "Médio 👍" : "";
  numberOfTheLevelBar < 20 ? header.nameOfLevel.textContent = "Fácil 🤡" : "";
  
}

//function that reset the game. Just undo everything that occurs when the player wins or loose the game and gives a new secret number.
function resetGame(){

  secretNumber = Math.trunc(Math.random() * header.barToChangeLevel.value) + 1;
  chancesLeft = 10
  main.numberRestOfLife.textContent = chancesLeft;
  main.btnToTry.textContent = 'Tentar'
  main.tipIfWrong.textContent = 'Digite um número abaixo e clique em TENTAR para iniciar o jogo';
  body.style.backgroundColor = 'white'

}

// function responsable to multiplier how many chances the user has with its score and check if it fits somewhere in top 3 scor
function topScore(){
  const scoreOfTurn = chancesLeft * multipliedNumber

  
  if(scoreOfTurn >= parseInt(scores.firstPlace.innerHTML)){
    
    scores.thirdPlace.textContent = scores.seccondPlace.innerHTML // the actual 2 place goes to third, and old third gets discarted
      
    scores.seccondPlace.textContent = scores.firstPlace.innerHTML // the actual firsplace goes to seccond place
    
    scores.firstPlace.textContent = scoreOfTurn; // the new score gets fixed at first place

  }else if(scoreOfTurn >= parseInt(scores.seccondPlace.innerHTML)){

    scores.thirdPlace.textContent = scores.seccondPlace.innerHTML // the actual 2 place goes to third, and old third gets discarted

    scores.seccondPlace.textContent = scoreOfTurn; // the new score gets fixed at seccond place

  }else if(scoreOfTurn >= parseInt(scores.thirdPlace.innerHTML)){

    scores.thirdPlace.textContent = scoreOfTurn// the new score gets fixed at third place, the old gets discarted.

  }else{
    alert(`Poxa, você não ficou no top 3 dessa vez 😭 você fez ${scoreOfTurn} pontos`)
  }  
}

// checks if the typed number its equal to the secret number. if its not, the chances left will be decreassed and if it is it will display the winner screen.
function checkIfNumberMatches(){

  if(main.numberChoosed.value != secretNumber){
    

    // check if the number tiped was higger or lower than the secret
    main.numberChoosed.value < secretNumber ? main.tipIfWrong.textContent = 'Hum, tenta algum número mais ALTO da próxima vez' : main.tipIfWrong.textContent = 'Escolhe um número mais BAIXO da próxima vez';
    
    chancesLeft--;

    if(chancesLeft > 0){
      main.numberRestOfLife.textContent = chancesLeft;
    }else{
      body.style.backgroundColor = 'red';
      main.numberRestOfLife.textContent = 0;
      main.tipIfWrong.textContent = 'Poxa, suas tentativas acabaram. Clique em reiniciar para tentar novamente';
      main.btnToTry.textContent = 'Reiniciar';
    }
    

  }else{
    main.tipIfWrong.textContent = '🎉 PARABÉEEENS, VOCÊ ACERTOU!! 🎉';
    main.btnToTry.textContent = 'Reiniciar';
    body.style.backgroundColor = 'green';
    topScore();
  };
}

// checks if when enter or the btn its clicked it should trigger resetGame(), CheckIfNumberMatches() or send an alert message
function btnPressed(){

  if(main.btnToTry.textContent === 'Reiniciar'){
     return resetGame() // if it is restart, it will exit this function before cheking if there is a number inside.
  }
   // if typed its NaN it would be false and then checkIfNumberMatches() do not run and an alert its displayed.
   Number(main.numberChoosed.value) ? checkIfNumberMatches() : alert("Digite um número para tentar")
  
 }



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



// to active the ChangingLevel
header.barToChangeLevel.addEventListener('input', e =>{
  changingLevel()
  resetGame()
  
})

main.btnToTry.addEventListener('click', e => {
  btnPressed();
})

body.addEventListener("keyup", e =>{
  e.key === "Enter" ? btnPressed() : ""
})



