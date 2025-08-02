import { render, screen } from '@testing-library/react';
import TutorialView from '../components/TutorialView';

describe('TutorialView', () => {
  it('renders the tutorial view with its main elements', () => {
    render(<TutorialView />);
    expect(screen.getByText('Tutorial View')).toBeInTheDocument();
    // Find the code editor container by class name
    const editorContainer = document.querySelector('.code-editor-container');
    expect(editorContainer).toBeInTheDocument();
  });
});
