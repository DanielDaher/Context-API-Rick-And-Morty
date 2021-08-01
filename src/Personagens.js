import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MyContext from './MyContext';

function Personagens() {
  const { characters, makeCards } = useContext(MyContext);

  if (characters.length > 0) {
    return (<div className='personagens-div'>
      <Link to="/" className="return">Voltar</Link>
      <div className="main-personagens-div">
        {characters.map((character, index) => makeCards(character, index))}
      </div>
    </div>)
  }
  return <Redirect to='/empty' />
}

/* class Personagens extends React.Component {
    cards(character, index) {
        return (
            <Link to={`/details/${character.id}`} className="details-link" key={index}>
                <div className='each-one'>
                    <img src={character.image} alt='imagem do personagem'/>
                    <p>{character.name}</p>
                </div>
            </Link>
        );
    };
    
    render() {
        if (this.context.characters.length > 0) {
            return (
                <div className='personagens-div'>
                    <Link to="/" className="return">Voltar</Link>
                    <div className="main-personagens-div">
                        {this.context.characters.map((character, index) => this.cards(character, index))}
                    </div>
                </div>
            );
        } return <Redirect to='/empty' />
        }
}; */


/* Personagens.contextType = MyContext; */

export default Personagens;