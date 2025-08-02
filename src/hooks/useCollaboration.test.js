import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useCollaboration } from '../hooks/useCollaboration';

// Mock socket.io-client
vi.mock('socket.io-client', () => {
  const emit = vi.fn();
  const on = vi.fn();
  const disconnect = vi.fn();
  return {
    default: vi.fn(() => ({ emit, on, disconnect }))
  };
});

describe('useCollaboration', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCollaboration());
    expect(result.current.role).toBe(null);
    expect(result.current.roomId).toBe('');
    expect(result.current.connected).toBe(false);
    expect(result.current.teacherCode).toBe('');
    expect(result.current.studentCode).toBe('');
    expect(result.current.breakpoints).toEqual([]);
  });

  it('should set teacher role and emit create-room', () => {
    const { result } = renderHook(() => useCollaboration());
    act(() => {
      result.current.startSession();
    });
    expect(result.current.role).toBe('teacher');
    expect(result.current.roomId).not.toBe('');
  });

  it('should set student role and emit join-room', () => {
    const { result } = renderHook(() => useCollaboration());
    act(() => {
      result.current.joinSession('testRoom');
    });
    expect(result.current.role).toBe('student');
    expect(result.current.roomId).toBe('testRoom');
  });

  it('should update teacher code and emit code-change', () => {
    const { result } = renderHook(() => useCollaboration());
    act(() => {
      result.current.updateTeacherCode('console.log(1);');
    });
    expect(result.current.teacherCode).toBe('console.log(1);');
  });

  it('should update breakpoints and emit breakpoint-set', () => {
    const { result } = renderHook(() => useCollaboration());
    act(() => {
      result.current.setTeacherBreakpoints([1, 2, 3]);
    });
    expect(result.current.breakpoints).toEqual([1, 2, 3]);
  });

  it('should update student code', () => {
    const { result } = renderHook(() => useCollaboration());
    act(() => {
      result.current.updateStudentCode('console.log(2);');
    });
    expect(result.current.studentCode).toBe('console.log(2);');
  });
});
