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




let multipliedNumber = 1
let secretNumber = Math.trunc(Math.random() * header.barToChangeLevel.value) + 1;


// Changes the secret number . gets the value of the bar. change the multiplier, the name of level and the range
function changingLevel(){

  const numberOfTheLevelBar = header.barToChangeLevel.value;
  multipliedNumber = Math.trunc(numberOfTheLevelBar / 10)
                                                                                                       
  main.numberToChoose.textContent = numberOfTheLevelBar;
  header.numberToMultiplie.textContent = multipliedNumber;

  numberOfTheLevelBar < 40 ? header.nameOfLevel.textContent = "Difícil 🙊" : header.nameOfLevel.textContent = "Muito difícil 😎";
  numberOfTheLevelBar < 30 ? header.nameOfLevel.textContent = "Médio 👍" : "";
  numberOfTheLevelBar < 20 ? header.nameOfLevel.textContent = "Fácil 🤡" : "";

}

// to active the ChangingLevel
header.barToChangeLevel.addEventListener('input', e =>{
  changingLevel()
  resetGame()
  
})


let chancesLeft = 10;

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

function resetGame(){

  secretNumber = Math.trunc(Math.random() * header.barToChangeLevel.value) + 1;
  chancesLeft = 10
  main.numberRestOfLife.textContent = chancesLeft;
  main.btnToTry.textContent = 'Tentar'
  main.tipIfWrong.textContent = 'Digite um número abaixo e clique em TENTAR para iniciar o jogo';
  body.style.backgroundColor = 'white'

}

function topScore(){
  const scoreOfTurn = chancesLeft * multipliedNumber

  
  if(scoreOfTurn >= parseInt(scores.firstPlace.innerHTML)){
    scores.firstPlace.textContent = scoreOfTurn;
  }else if(scoreOfTurn >= parseInt(scores.seccondPlace.innerHTML)){
    scores.seccondPlace.textContent = scoreOfTurn;
  }else if(scoreOfTurn >= parseInt(scores.thirdPlace.innerHTML)){
    scores.thirdPlace.textContent = scoreOfTurn
  }else{
    alert(`Poxa, você não ficou no top 3 dessa vez 😭 você fez ${scoreOfTurn} pontos`)
  }  
}



function btnPressed(){

  main.btnToTry.textContent === 'Reiniciar' ? resetGame() : checkIfNumberMatches();
  
}



main.btnToTry.addEventListener('click', e => {
  btnPressed();
})



