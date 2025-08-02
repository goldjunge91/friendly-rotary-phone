import PlaygroundView from '@/components/PlaygroundView';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

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

describe('PlaygroundView', () => {
  it('renders the playground view with its main elements', () => {
    const { container } = render(
      <MemoryRouter>
        <PlaygroundView />
      </MemoryRouter>
    );
    expect(screen.getByText('Playground')).toBeInTheDocument();
    // Find the CodeMirror editor by its class name
    const editorContainer = container.querySelector('.cm-editor');
    expect(editorContainer).toBeInTheDocument();
  });
});
