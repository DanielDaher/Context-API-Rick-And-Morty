import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ReactCardFlip from 'react-card-flip';
import MyContext from '../MyContext';
// import Swal from 'sweetalert2';

function Play() {
  const { characters, gameLevel } = useContext(MyContext);
  const [cards, setCards] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const getRandomNumber = (cardIds) => cardIds[Math.floor(Math.random() * cardIds.length)];

    const shuffleCards = (deck) => {
      return deck.sort(function (a, b) {
        if (a.cardId > b.cardId) {
          return -1;
        }
        if (a.cardId < b.cardId) {
          return 1;
        }
        return 0;
      });
    };
    
    const createGameCards = (characters) => {
      const deckOfCards = [];
      const cardIds = Array.from({ length: characters.length * 2 }, (_, i) => i + 1);
      const maxCards = gameLevel;

      characters.forEach((character, index) => {
        if (index >= maxCards) return;
        const randomNumber = getRandomNumber(cardIds);
        const currentNumber = cardIds.indexOf(randomNumber);
        cardIds.splice(currentNumber, 1);
        const secondRandomNumber = getRandomNumber(cardIds);
        const currentNumber2 = cardIds.indexOf(secondRandomNumber);
        cardIds.splice(currentNumber2, 1);


        const firstCard = { ...character, cardId: randomNumber, hit: false, flipped: false };
        const secondCard = { ...firstCard, cardId: secondRandomNumber };
        deckOfCards.push(firstCard, secondCard);
      });

      return shuffleCards(deckOfCards); 
    };
  
    const gameCards = createGameCards(characters);
    setCards(gameCards);

  }, [characters, gameLevel]);

  useEffect(() => {
    const markCards = (firstCard, secondCard) => {
      // Swal.fire({
      //   text: 'Acertou!',
      //   icon: 'success',
      //   timer: 1500,
      //   timerProgressBar: true,
      //   showConfirmButton: true
      // });
      const newCards = [...cards];
      newCards.forEach((card) => { 
        if (card.id === firstCard.id || card.id === secondCard.id) {
          card.hit = true;
        }
      });
      
      return setCards(newCards);
    };

    const checkHitOrError = (flippedCards) => {
      if (flippedCards.length > 2) {
        const newCardsProps = cards.map((card) => ({ ...card, flipped: false, }));
        return setCards(newCardsProps);
      };
      if (flippedCards.length > 1) {
        setTimeout(() => {
          const [firstCard, secondCard] = flippedCards;
          if (firstCard.id === secondCard.id) {
            return markCards(firstCard, secondCard);
          };
          const newCardsProps = cards.map((card) => ({ ...card, flipped: false, }));
          setCards(newCardsProps);
          
        }, 900);
      };
    };
  
    const flippedCards = [ ...cards.filter((card) => card.flipped === true && !card.hit) ];
    if (flippedCards.length > 0) {
      checkHitOrError(flippedCards);
    }
  }, [cards]);

  const flipCard = ({ target }) => {
    const { id } = target;
    const newCards = [...cards];
    const currentCard = newCards.find((card) => card.cardId === Number(id));
    currentCard['flipped'] = !currentCard.flipped;
    setCards(newCards);
  }

  const renderCards = (character) => {
    const { cardId, image, name, flipped, hit } = character;
    if (hit) return (
      <div key={cardId} id={cardId} className='back hit'>
        <img id={cardId} src={image} alt='imagem do personagem'/>
        <p id={cardId}>{name}</p>
      </div>
    );

    return (
      <ReactCardFlip key={cardId} isFlipped={flipped} flipDirection="horizontal">
        <div id={cardId} key={cardId} className="front" onClick={(e) => flipCard(e)}>
          <h4 id={cardId}>Find my twin!</h4>
        </div>
  
        <div id={cardId} className='back' onClick={(e) => flipCard(e)}>
          <img id={cardId} src={image} alt='imagem do personagem'/>
          <p id={cardId}>{name}</p>
        </div>
      </ReactCardFlip>
    );
  }
  
    if (shouldRedirect) return <Redirect to='/congratulations' />

    return (<div className='personagens-div'>
      <Link to="/" className="return">Voltar</Link>
      <div>
        <h3>Acertos para ganhar: { cards.filter((card) => !card.hit).length / 2 }</h3>
      </div>
      <div className="main-personagens-div">
        {cards.map((character, index) => renderCards(character, index))}
      </div>
    </div>)
}

export default Play;