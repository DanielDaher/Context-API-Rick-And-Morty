import React from 'react';
import { Link } from 'react-router-dom';

export default class Empty extends React.Component {
    render() {
        return (<div className="empty-div">
            <p>Não deu certo! Volte para a página inicial, clique no botão e volte para "Personagens"!</p>
            <Link to='/' className="return">Voltar</Link>
        </div>);
    };
};