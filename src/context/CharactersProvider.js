import React, { Component } from 'react';
import MyContext from '../MyContext';
import ReactCardFlip from 'react-card-flip';


class Provider extends Component {
  constructor(props) {
      super(props);
      this.state = {
        characters: [],
        charactersEasy: [],
        charactersMedium: [],
        charactersKeys: {},
        numberOfCardsFlipped: 0,
        levelOfTheGame: 'Fácil',
      };
      this.toFetch = this.toFetch.bind(this);
      this.setLevel = this.setLevel.bind(this);
      this.flipCard = this.flipCard.bind(this);
      this.flipCloneCard = this.flipCloneCard.bind(this);
      this.cards = this.cards.bind(this);
      this.cloneCards = this.cloneCards.bind(this);
      this.checkHitOrError = this.checkHitOrError.bind(this);
      this.eraseCard = this.eraseCard.bind(this);
  }

  async toFetch() {
    const requisition = await fetch('https://rickandmortyapi.com/api/character');
    const characters = await requisition.json();
    const charactersEasy = characters.results.slice(0, 5);
    const charactersMedium = characters.results.slice(0, 10);
    const charactersKeys = {};
    const cloneCharactersKeys = {};
    [...characters.results].map((character) => charactersKeys[`${character.id}`] = false);
    [...characters.results].map((character) => cloneCharactersKeys[`${character.id}`] = false);

    this.setState({
      characters: [...characters.results],
      charactersEasy,
      charactersMedium,
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
      numberOfCardsFlipped: prevState.numberOfCardsFlipped + 1,
      charactersKeys: {
        ...prevState.charactersKeys,
        [id]: !prevState.charactersKeys[id],
      },
  }), () => this.checkHitOrError(id));
  console.log(target.id);
  console.log(this.state);
}

flipCloneCard({ target }) {
  const { id } = target;
  this.setState((prevState) => ({
      numberOfCardsFlipped: prevState.numberOfCardsFlipped + 1,
      cloneCharactersKeys: {
        ...prevState.cloneCharactersKeys,
        [id]: !prevState.cloneCharactersKeys[id],
      },
  }), () => this.checkHitOrError(id));
}

checkHitOrError(id) {
  const { characters, charactersKeys, cloneCharactersKeys, numberOfCardsFlipped } = this.state;
  const newKeys = {};
  const newCloneKeys = {};

  [...characters].map((character) => newKeys[`${character.id}`] = false);
  [...characters].map((character) => newCloneKeys[`${character.id}`] = false);

  if (numberOfCardsFlipped > 2){
    return this.setState((prevState) => ({
      numberOfCardsFlipped: 0,
      charactersKeys: newKeys,
      cloneCharactersKeys: newCloneKeys,
    }));
  }

  if (numberOfCardsFlipped > 1) {
    if (charactersKeys[id] && cloneCharactersKeys[id]) {
      setTimeout(() => this.setState({
        numberOfCardsFlipped: 0,
        charactersKeys: newKeys,
        cloneCharactersKeys: newCloneKeys,
      }, () => this.eraseCard(id)), 1000);
    } else {
      setTimeout(() => this.setState((prevState) => ({
        numberOfCardsFlipped: 0,
        charactersKeys: newKeys,
        cloneCharactersKeys: newCloneKeys, 
      })), 1000);
    }
    }
}

eraseCard(id) {
  alert('Acertou!');
  setTimeout(() => this.setState({
    characters: this.state.characters.filter((character) => character.id !== Number(id)),
    charactersEasy: this.state.charactersEasy.filter((character) => character.id !== Number(id)),
    charactersMedium: this.state.charactersMedium.filter((character) => character.id !== Number(id)),
  }), 1000);
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
        charactersEasy: this.state.charactersEasy,
        charactersMedium: this.state.charactersMedium,
        charactersKeys: this.state.charactersKeys,
        cloneCharactersKeys: this.state.cloneCharactersKeys,
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