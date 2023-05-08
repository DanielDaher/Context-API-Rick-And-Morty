import React, { Component } from 'react';
import MyContext from '../MyContext';
import Swal from 'sweetalert2';

class Provider extends Component {
  constructor(props) {
      super(props);
      this.state = {
        characters: [],
        levelOfTheGame: 5,
      };
      this.toFetch = this.toFetch.bind(this);
      this.setLevel = this.setLevel.bind(this);
  }

  async toFetch() {
    try {
      const requisition = await fetch('https://rickandmortyapi.com/api/character');
      const characters = await requisition.json();
  
      this.setState({
        characters: [...characters.results],
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: 'Algo deu errado, tente novamente mais tarde =(',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
}

setLevel(level) {
  const maxCards = {
    'Fácil': 5,
    'Médio': 10,
    'Difícil': 100,
  };
  this.setState({
    levelOfTheGame: maxCards[level],
  });
}

  render() {
      const { children } = this.props;
      const contextValue = {
        characters: this.state.characters,
        fetchAPI: this.toFetch,
        gameLevel: this.state.levelOfTheGame,
        setLevel: this.setLevel,
      }
      return (
        <MyContext.Provider value={contextValue}>
          {children}
        </MyContext.Provider>
  );
}
}

export default Provider;