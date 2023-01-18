//Materialize
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});    
  });


const showMessage=(title='Game message', message='Thanks for playing')=>{
    const modalInstance= M.Modal.getInstance(
        document.querySelector('#game-modal')
    );
    document.querySelector('#game-modal-title').innerText=title;
    document.querySelector('#game-modal-message ').innerText=message;
    modalInstance.open();
};

/*
* 2C = Two of Clubs 
* 2D = Two of Diamones
* 2H = Two of Hearts
* 2S = Two of Spades
* 
*¨
*/


let deck = [];
const tipos= ['C', 'D', 'H', 'S'];
const especiales= ['A', 'J', 'Q', 'K'];

let playerPoints= 0,   computerPoints =0;

const btnNew  = document.querySelector('#btnNew')
const btnDraw = document.querySelector('#btnDraw')
const btnStop = document.querySelector('#btnStop')

const smPoints= document.querySelectorAll('small');

const playerCards= document.querySelector('#player-cards');
const computerCards= document.querySelector('#computer-cards');
// this function creates a new Deck with the cards shuffled '
const createDeck = () => {
    for (let i = 2; i <=10; i ++){
        for (let tipo of tipos){
            deck.push (i+tipo)
        }

    }
    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push (esp + tipo)
        }
    }
    deck = _.shuffle(deck);

}

createDeck();


//This function takes a card from the deck
const  takeCard = () =>{

    const card = deck.pop();
    // checks if there are cards in the deck
    if (deck.length === 0){
        throw 'There is no cards left in the deck';
    }
    return card;
    
}


const calcCardValue=( card)=>{
    const cardValue = card.substring(0, card.length-1);
    /*
    let points = 0;
    if (isNaN(cardValue)) {
        
        points = (cardValue === 'A') ? 11: 10;
    }else{

        points = cardValue * 1;
    }
    */

    return  (isNaN(cardValue)) ? (
        (cardValue === 'A') ? 11 : 10
    ) : cardValue *1;
}


const showImage= (elPosition, cardDrawed)=>{
    const cardElement= document.createElement('img');
    cardElement.src = `assets/cartas/${cardDrawed }.png`;
    cardElement.classList.add('bj-card');
    elPosition.append(cardElement);
    };

const computerTurn = ()=>{
        if (playerPoints>21 || playerPoints<=0){
            computerDraws();
            showMessage( undefined,'Computer wins')
            return console.log('computer wins');
        }
    
        do{
            computerDraws();
        }while(computerPoints<21 && computerPoints!==21);
        
        let roundResult;
         if (computerPoints === playerPoints){
            roundResult = 'tied';
        }
         else if (computerPoints > playerPoints && computerPoints<=21) {
            roundResult = 'Computer wins'
         }
         else {
            roundResult = "You win"
         }
         showMessage( undefined, roundResult)
         console.log(roundResult);
}

btnDraw.addEventListener('click', ()=>{
    const cardDrawed = takeCard();
    showImage(playerCards, cardDrawed);
    playerPoints += calcCardValue(
        cardDrawed
        );

    smPoints[0].innerText=playerPoints;
    if (playerPoints>21){
     console.log('You lose. Computer Turn');
     blockActions();
     computerTurn();
    }

}
);

const computerDraws=()=>{
    
    const cardDrawed = takeCard();
    showImage(computerCards, cardDrawed)
    computerPoints += calcCardValue(cardDrawed);
    smPoints[1].innerText=computerPoints;
};

btnStop.addEventListener('click', ()=>{ blockActions();computerTurn();});

const blockActions = ()=>{btnStop.disabled= true;
    btnDraw.disabled= true;}


btnNew.addEventListener('click', ()=>{
    btnDraw.disabled=false;
    btnStop.disabled= false;

   smPoints[0].innerText=0;
   smPoints[1].innerText=0;

   playerCards.innerText="";
   playerPoints=0;

   computerCards.innerText="";
   computerPoints=0;
   deck=[]
   createDeck();
});
showMessage();

