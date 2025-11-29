export const getSelectedText = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }
  const selection = window.getSelection();
  return selection ? selection.toString() : '';
};
