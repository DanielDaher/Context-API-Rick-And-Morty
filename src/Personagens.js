import React, { useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MyContext from './MyContext';

function Personagens() {
  const { characters, charactersEasy, charactersMedium, makeCards, cloneCards, gameLevel } = useContext(MyContext);
  let gameCharacters = [];
  let cloneGameCharacters = [];

  useEffect(() => {
    console.log('Montei');
  }, []);

  switch (gameLevel) {
    case 'Difícil':
      gameCharacters = characters.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      cloneGameCharacters = characters;

      break;
    
      case 'Médio':
        gameCharacters = charactersMedium.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        
        cloneGameCharacters = charactersMedium;
  
        break;
  
    default:
      gameCharacters = [...charactersEasy].sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });

      cloneGameCharacters = [...charactersEasy];

      break;
  }
  
  if (characters.length > 0) {
    return (<div className='personagens-div'>
      <Link to="/" className="return">Voltar</Link>
      <div className="main-personagens-div">
        {gameCharacters.map((character, index) => makeCards(character, index))}
      </div>
      <div className="main-personagens-div">
      {cloneGameCharacters.map((character, index) => cloneCards(character, index))}
      </div>
    </div>)
  }
  return <Redirect to='/empty' />
}

export default Personagens;