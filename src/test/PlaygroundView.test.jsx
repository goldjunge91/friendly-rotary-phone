import { render, screen } from '@testing-library/react';
import PlaygroundView from '../components/PlaygroundView';

describe('PlaygroundView', () => {
  it('renders the playground view with its main elements', () => {
    render(<PlaygroundView />);
    expect(screen.getByText('Playground View')).toBeInTheDocument();
    expect(screen.getByTestId('playground-editor-container')).toBeInTheDocument();
  });
});
