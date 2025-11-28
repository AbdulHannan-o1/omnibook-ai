// This is a stub for the API client.
// It will be replaced with actual API calls to the backend.

export const query = async (query: string) => {
    const response = await fetch('http://localhost:8000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };

export const getChapters = async () => {
  return Promise.resolve([
    { id: '1', title: 'Chapter 1: Introduction' },
    { id: '2', title: 'Chapter 2: AI Agents' },
    { id: '3', title: 'Chapter 3: RAG Systems' },
  ]);
};

export const getChapter = async (id: string) => {
  return Promise.resolve({
    id,
    title: `Chapter ${id}`,
    content: `This is the content for chapter ${id}.`,
  });
};
