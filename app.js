/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlay, sixRoll, winScore;

init();


document.querySelector('.confirm-hold').addEventListener('click',function(){
    winScore = document.getElementById('winnerScore').value;
});


document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlay){
        // random number
        sameActivePlayer = activePlayer;
        var dice = Math.floor(Math.random() * 6) + 1; 
        var dice2 = Math.floor(Math.random() * 6) + 1;
        
        // display the result
        var diceDOM =  document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOM2 =  document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        console.log(roundScore); 
        console.log(dice, dice2); 


        //update the round score IF the rolled number was not a 1
        if(dice !== 1 && dice2 !== 1) {
            roundScore += dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
            if(dice === 6 || dice2 === 6){
                sixRoll++;
                console.log(roundScore, sixRoll); 
                if(sixRoll === 2){
                    document.getElementById('score-' + activePlayer).textContent = '0';
                    scores[activePlayer] = 0;
                    nextPlayer();
                     
                }             
            }
        }else {   
            nextPlayer();
        }



    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlay){
        //add the score to the scores arry
        scores[activePlayer] += roundScore;
        //add the score to the GUI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if there is a wiiner
    
        if(scores[activePlayer] >= winScore){
            document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!'; 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlay = false;
        
        } else{
            nextPlayer();
        }
    }
});

function nextPlayer(){
    if(activePlayer === 0){
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        activePlayer = 1;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        
    }else {
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
    roundScore = 0;
    sixRoll = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
}

function init(){
    
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;
    sixRoll = 0;


    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);



