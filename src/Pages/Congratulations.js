import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import MyContext from '../MyContext';
import Swal from 'sweetalert2';

export default function Congratulations() {
  const { setLevel, fetchAPI, characters } = useContext(MyContext);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const showGameLevels = async (e) => {  
    e.preventDefault();
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          'Fácil': 'Fácil',
          'Médio': 'Médio',
          'Difícil': 'Difícil'
        })
      }, 1000)
    })
    
    const { value: level } = await Swal.fire({
      title: 'Selecione o nível de dificuldade',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'Você precisa escolher um nível'
        }
      }
    })
    if (level) {
      if (!characters.length) {
        fetchAPI();
      }
      console.log('level: ', level)
      setLevel(level);
      setShouldRedirect(true);
    }
  };

  if (shouldRedirect) return <Redirect to='/play' />

    return (
      <div className="congratulations-div">
          <p>Uau, fiquei impressionado com a sua memória...</p>
          <Link to='/play' className='restart-button' onClick={(e) => showGameLevels(e)}>Recomeçar</Link>
          <Link to='/' className="return">Início</Link>
      </div>
    );
};