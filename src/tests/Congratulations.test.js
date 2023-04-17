import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersProvider from '../context/CharactersProvider';
import { MemoryRouter, Router, Link } from 'react-router-dom';
import { mockCharacters } from '../utils/helpers';
import { createMemoryHistory } from 'history';
import Congratulations from '../Pages/Congratulations';


describe('Renders homepage', () => {
  const characters = mockCharacters();
  const mockAPI = () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: characters }),
    });
  }

  beforeEach(() => {
    mockAPI();

    render(
      <CharactersProvider>
        <MemoryRouter initialEntries={["/congratulations"]}>
          <Congratulations />
        </MemoryRouter>
      </CharactersProvider>
    );
  });

  afterEach(() => { 
    jest.clearAllMocks();
    cleanup();
  });

  it('Show victory message!', () => {
    const victoryText = 'Uau, fiquei impressionado com a sua memória...'
    const victoryMessage = screen.getByText(victoryText);
    expect(victoryMessage).toBeInTheDocument();
  });

  it('Redirects page after user click on button', () => {
    const text = 'Início';
    const goBackButton = screen.getByText(text);
    expect(goBackButton).toBeInTheDocument();
    console.log(goBackButton.href)
    expect(goBackButton.href).toEqual('http://localhost/');

    cleanup();
    mockAPI();

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Link to="/">Início</Link>
      </Router>
    );

    userEvent.click(screen.getByText('Início'));
    expect(history.location.pathname).toBe('/');
  });
});

