import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('App', () => {
  it('renders the main application', () => {
    render(<App />);
    expect(screen.getByText('Friendly Rotary Phone')).toBeInTheDocument();
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
  });
});
