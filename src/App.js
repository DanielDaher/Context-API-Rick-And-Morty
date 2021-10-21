import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Personagens from './Pages/Personagens';
import Congratulations from './Pages/Congratulations';
import Details from './Details';
import CharactersProvider from './context/CharactersProvider';


function App() {
  return (
    <CharactersProvider>
      <div className="App">
        <div className="main-app">
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/characters' component={Personagens} />
          <Route exact path='/congratulations' component={Congratulations} />
          <Route path='/details/:id' component={Details} />
        </Switch>
        </BrowserRouter>
        </div>
      </div>
    </CharactersProvider>
  );
}

export default App;
