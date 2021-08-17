import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MyContext from './MyContext';

function Personagens() {
  const { characters, charactersEasy, charactersMedium, makeCards, cloneCards, gameLevel } = useContext(MyContext);
  let gameCharacters = [];

  useEffect(() => {
    console.log('Montei');
  }, []);

  switch (gameLevel) {
    case 'Difícil':
      gameCharacters = characters;

      break;
    
      case 'Médio':
        gameCharacters = charactersMedium;
  
        break;
  
    default:
      gameCharacters = charactersEasy;
      break;
  }
  
  if (characters.length > 0) {
    return (<div className='personagens-div'>
      <Link to="/" className="return">Voltar</Link>
      <div className="main-personagens-div">
        {gameCharacters.map((character, index) => makeCards(character, index))}
      </div>
      <div className="main-personagens-div">
      {gameCharacters.map((character, index) => cloneCards(character, index))}
      </div>
    </div>)
  }
  return <Redirect to='/empty' />
}

export default Personagens;