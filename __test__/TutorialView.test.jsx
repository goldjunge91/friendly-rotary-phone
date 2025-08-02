import TutorialView from '@/pages/TutorialView';
import { render, screen } from '@testing-library/react';

import { vi } from 'vitest';

vi.mock('../../src/hooks/useCollaboration', () => ({
  useCollaboration: () => ({
    role: null,
    roomId: '',
    connected: false,
    teacherCode: '',
    studentCode: '',
    startSession: vi.fn(),
    joinSession: vi.fn(),
    updateTeacherCode: vi.fn(),
    updateStudentCode: vi.fn(),
    breakpoints: [],
    setTeacherBreakpoints: vi.fn(),
  })
}));

describe('TutorialView', () => {
  it('renders the tutorial view with its main elements', () => {
    render(<TutorialView />);
    expect(screen.getByText('Tutorial View')).toBeInTheDocument();
    // Find the code editor container by class name
    const editorContainer = document.querySelector('.code-editor-container');
    expect(editorContainer).toBeInTheDocument();
  });
});