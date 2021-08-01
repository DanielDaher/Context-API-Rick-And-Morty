import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from './MyContext';

/* class Home extends React.Component { 
    render() {
        return (
            <div>
                <Link to='/characters' className="links">Personagens</Link>
                <button onClick={this.context.fetchAPI}>Fazer requisição</button>
                {console.log(this.context)}
            </div>
        );
    };
}; */

function Home() {
  const { fetchAPI, characters } = useContext(MyContext);

  return (
    <div>
      <Link to="/characters" className="links">Personagens</Link>
      <button onClick={ fetchAPI }>Fazer requisição</button>
      {console.log(characters)}
      {console.log(useContext(MyContext))}
    </div>
  );
}

/* Home.contextType = MyContext; */

export default Home;