import { render, screen } from '@testing-library/react';
import App from './App';

describe('Renders homepage', () => {
  it('Show welcome text', () => {
    render(<App />);
    const welcomeText = 'Bem vindo ao Rick And Memory Game!'
    const welcomeMessage = screen.getByText(welcomeText);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('Show guide text on homepage', () => {
    render(<App />);
    const text = 'Escolha a dificuldade e memorize a posição das cartas para vencer!';
    const guideText = screen.getByText(text);
    expect(guideText).toBeInTheDocument(); 
  });

  it('Show start button', () => {
    render(<App />);
    const text = 'Jogar!';
    const startButton = screen.getByText(text); // capturar este botão com outro método
    expect(startButton).toBeInTheDocument(); 
  });

});

