import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main application', () => {
    render(<App />);
    expect(screen.getByText('CodeCraft')).toBeInTheDocument();
    expect(screen.getByText('Tutorial')).toBeInTheDocument();
    expect(screen.getByText('Playground')).toBeInTheDocument();
  });
});
