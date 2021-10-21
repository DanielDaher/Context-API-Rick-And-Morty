import React from 'react';
import { Link } from 'react-router-dom';

/* export default class Congratulations extends React.Component {
    render() {
        return (<div className="empty-div">
            <p>Não deu certo! Volte para a página inicial, clique no botão "jogar"!</p>
            <Link to='/' className="return">Voltar</Link>
        </div>);
    };
}; */

export default function Congratulations() {
    return (
      <div className="congratulations-div">
          <p>Uau, fiquei impressionado com a sua memória...</p>
          <Link to='/' className="return">Início</Link>
      </div>
    );
};