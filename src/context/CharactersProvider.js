import React from 'react';
import MyContext from '../MyContext';
import ReactCardFlip from 'react-card-flip';


class Provider extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        characters: [],
      };
      this.toFetch = this.toFetch.bind(this);
      this.flipCard = this.flipCard.bind(this);
      this.cards = this.cards.bind(this);
  }

  async toFetch() {
    const requisition = await fetch('https://rickandmortyapi.com/api/character');
    const characters = await requisition.json();
    const charactersKeys = {};
    [...characters.results].map((character) => charactersKeys[`${character.id}`] = false);
    this.setState({
      characters: [...characters.results],
      ...charactersKeys,
    });
}

flipCard({ target }) {
  const { id } = target;
  this.setState((prevState) => ({
      [id]: !prevState[id],
  }));
  console.log(target.id);
  console.log(this.state);
}

cards(character, index) {
  const { id } = character;
  return (
    <ReactCardFlip key={index} isFlipped={this.state[id]} flipDirection="horizontal">
      <div id={character.id} key={index} className="front" onClick={(e) => this.flipCard(e)}>
        <h4 id={character.id}>Find my twin!</h4>
      </div>

      <div id={character.id} className='back' onClick={(e) => this.flipCard(e)}>
        <img id={character.id} src={character.image} alt='imagem do personagem'/>
        <p id={character.id}>{character.name}</p>
      </div>
    </ReactCardFlip>
);
}

  render() {
      const { children } = this.props;
      const contextValue = {
        characters: this.state.characters,
        fetchAPI: this.toFetch,
        makeCards: this.cards,
      }
      return (
        <MyContext.Provider value={contextValue}>
          {children}
        </MyContext.Provider>
  );
}
}

export default Provider;