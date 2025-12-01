export const getSelectedText = () => {
  const selection = window.getSelection();
  if (selection) {
    return selection.toString();
  }
  return '';
};