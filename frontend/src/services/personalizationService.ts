// This is a dummy service. In a real app, you'd make API calls here.

export const saveHighlight = async (text: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) { // Simulate API success
        resolve({ message: 'Highlight saved' });
      } else {
        reject(new Error('Failed to save highlight. Please check your connection and try again.'));
      }
    }, 1000);
  });
};

export const saveAnnotation = async (text: string, note: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) { // Simulate API success
        resolve({ message: 'Annotation saved' });
      } else {
        reject(new Error('Failed to save annotation. Please check your connection and try again.'));
      }
    }, 1000);
  });
};
