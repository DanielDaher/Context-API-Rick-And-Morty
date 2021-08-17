import React from 'react';
import MyContext from '../MyContext';
import ReactCardFlip from 'react-card-flip';


class Provider extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        characters: [],
        charactersKeys: {},
        levelOfTheGame: 'Fácil',
      };
      this.toFetch = this.toFetch.bind(this);
      this.setLevel = this.setLevel.bind(this);
      this.flipCard = this.flipCard.bind(this);
      this.flipCloneCard = this.flipCloneCard.bind(this);
      this.cards = this.cards.bind(this);
      this.cloneCards = this.cloneCards.bind(this);
      this.checkHitOrError = this.checkHitOrError.bind(this);
  }

  async toFetch() {
    alert('Fetch');
    const requisition = await fetch('https://rickandmortyapi.com/api/character');
    const characters = await requisition.json();
    const charactersKeys = {};
    const cloneCharactersKeys = {};
    [...characters.results].map((character) => charactersKeys[`${character.id}`] = false);
    [...characters.results].map((character) => cloneCharactersKeys[`${character.id}`] = false);

    this.setState({
      characters: [...characters.results],
      charactersKeys: charactersKeys,
      cloneCharactersKeys: cloneCharactersKeys,
    });
}

setLevel(level) {
  this.setState({
    levelOfTheGame: level,
  });
}

flipCard({ target }) {
  const { id } = target;
  this.setState((prevState) => ({
      charactersKeys: {
        ...prevState.charactersKeys,
        [id]: !prevState.charactersKeys[id],
      },
  }));
  console.log(target.id);
  console.log(this.state);
}

flipCloneCard({ target }) {
  const { id } = target;
  this.setState((prevState) => ({
      cloneCharactersKeys: {
        ...prevState.cloneCharactersKeys,
        [id]: !prevState.cloneCharactersKeys[id],
      },
  }));
  this.checkHitOrError(id);
}

checkHitOrError(id) {
  const { charactersKeys, cloneCharactersKeys } = this.state;
  if (charactersKeys[id] && cloneCharactersKeys[id]) {
    console.log('igual');
  }
}

cards(character, index) {
  const { id } = character;
  return (
    <ReactCardFlip key={index} isFlipped={this.state.charactersKeys[id]} flipDirection="horizontal">
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

cloneCards(character, index) {
  const { id } = character;
  return (
    <ReactCardFlip key={index} isFlipped={this.state.cloneCharactersKeys[id]} flipDirection="horizontal">
      <div id={character.id} key={index} className="front" onClick={(e) => this.flipCloneCard(e)}>
        <h4 id={character.id}>Find my twin!</h4>
      </div>

      <div id={character.id} className='back' onClick={(e) => this.flipCloneCard(e)}>
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
        gameLevel: this.state.levelOfTheGame,
        setLevel: this.setLevel,
        makeCards: this.cards,
        cloneCards: this.cloneCards,
      }
      return (
        <MyContext.Provider value={contextValue}>
          {children}
        </MyContext.Provider>
  );
}
}

export default Provider;