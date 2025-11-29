import { getSelectedText } from './textSelection';

describe('getSelectedText', () => {
  test('should return empty string if no text is selected', () => {
    // Mock window.getSelection to return null
    Object.defineProperty(window, 'getSelection', {
      value: () => null,
      writable: true,
    });
    expect(getSelectedText()).toBe('');
  });

  test('should return selected text', () => {
    // Mock window.getSelection to return a selection object
    Object.defineProperty(window, 'getSelection', {
      value: () => ({
        toString: () => 'selected text',
      }),
      writable: true,
    });
    expect(getSelectedText()).toBe('selected text');
  });
});
