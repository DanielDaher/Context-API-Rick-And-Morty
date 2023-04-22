import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharactersProvider from '../context/CharactersProvider';
import { MemoryRouter } from 'react-router-dom';
import { mockCharacters } from '../utils/helpers';
import App from '../App';
import Home from '../Pages/Home';


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
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </CharactersProvider>
    );
  });

  afterEach(() => { 
    jest.clearAllMocks();
    cleanup();
  });

  it('Show welcome text', () => {
    const welcomeText = 'Bem vindo ao Rick And Memory Game!'
    const welcomeMessage = screen.getByText(welcomeText);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('Show guide text on homepage', () => {
    const text = 'Escolha a dificuldade e memorize a posição das cartas para vencer!';
    const guideText = screen.getByText(text);
    expect(guideText).toBeInTheDocument(); 
  });

  it('Show start button', () => {
    const text = 'Jogar!';
    const startButton = screen.getByText(text);
    expect(startButton).toBeInTheDocument(); 
  });

  it('Redirects page after user click on button', () => {
    cleanup();
    mockAPI();
    render(<App />);
    const text = 'Jogar!';
    const startButton = screen.getByText(text);
    expect(startButton).toBeInTheDocument();
    expect(window.location.href).toEqual('http://localhost/');

    userEvent.click(startButton);
    expect(startButton).not.toBeInTheDocument();
    expect(window.location.href).not.toEqual('http://localhost/');
  });
});

