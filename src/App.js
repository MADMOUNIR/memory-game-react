import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard';
import { useEffect } from 'react';

const cardImages = [
 {"src" : "/img/helmet-1.png" , matched : false},
 {"src" : "/img/potion-1.png" , matched : false},
 {"src" : "/img/ring-1.png"   , matched : false},
 {"src" : "/img/scroll-1.png" , matched : false},
 {"src" : "/img/shield-1.png" , matched : false},
 {"src" : "/img/sword-1.png"  , matched : false},
]

function App() {

//states 
const [cards , setCards] = useState([]) ;
const [turns , setTurns] = useState(0) ;
const [firstChoice , setFirstChoice] = useState(null) ;
const [secondChoice , setSecondChoice] = useState(null) ;



  //Shuffle Cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages , ...cardImages] 
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card , id : Math.random()})) ;

    setCards(shuffledCards);
    setTurns(0);
    
  }

  const handleChoice = (card) => {
    //console.log(card);
    firstChoice ? setSecondChoice(card) : setFirstChoice(card) ;
  }

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(prevTurns => prevTurns  + 1) ;
  
  }

  //Conpare 2 selected card
useEffect( () => {
  if(firstChoice && secondChoice ) 
  {    
    if( firstChoice.src === secondChoice.src) 
    {
      //---2 cards matched !!
      setCards (prevCard => {
        return prevCard.map(card => {
          if(card.src === firstChoice.src) {
            return {...card , matched : true }
          }
          else 
          {
            return card;
          }
        })
      } );
      
      resetTurn();
    }
    else
    {
      console.log("wrong");
      setTimeout(() => resetTurn() , 1000) ; 
    }
   
  }
} 
, [firstChoice , secondChoice]);



 
//------------------HTML-------------------//
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <h5>Total Turns : {turns}</h5>
      
    <div className="card-grid">
     {
        cards.map(card => (
          <SingleCard  
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === firstChoice || card === secondChoice || card.matched}
          >

          </SingleCard>
        ))
     }
    </div>
    
    
    
    </div>
  );
}

export default App