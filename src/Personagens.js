import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MyContext from './MyContext';

function Personagens() {
  const { characters, makeCards, cloneCards, gameLevel } = useContext(MyContext);
  let gameCharacters = [];

  useEffect(() => {
    console.log('Montei');
  }, []);

  switch (gameLevel) {
    case 'Fácil':
      gameCharacters = characters.filter((character, index) => index < 5);
      
      break;
  
    default:
      gameCharacters = characters;
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