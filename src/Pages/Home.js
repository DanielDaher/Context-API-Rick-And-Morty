import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext';
import WelcomePhrase from '../Components/WelcomePhrase';

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
  const { fetchAPI, characters, setLevel } = useContext(MyContext);
  
  useEffect(() => {
    fetchAPI()
  }, [fetchAPI]);

  return (
    <div className="home-main-content">
      <WelcomePhrase />
      <Link to="/characters" className="links">Jogar!</Link>
      <select onChange={(e) => setLevel(e.target.value)}>
        <option>Escolher dificuldade</option>
        <option>Fácil</option>
        <option>Médio</option>
        <option>Difícil</option>
      </select>
      {console.log(characters)}
      {console.log(useContext(MyContext))}
    </div>
  );
}

/* Home.contextType = MyContext; */

export default Home;