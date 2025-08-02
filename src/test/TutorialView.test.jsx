import { render, screen } from '@testing-library/react';
import TutorialView from '../components/TutorialView';

describe('TutorialView', () => {
  it('renders the tutorial view with its main elements', () => {
    render(<TutorialView />);
    expect(screen.getByText('Tutorial View')).toBeInTheDocument();
    expect(screen.getByTestId('code-editor-container')).toBeInTheDocument();
  });
});
