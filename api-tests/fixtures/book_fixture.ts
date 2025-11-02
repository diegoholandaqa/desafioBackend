export function generateBookData() {
  return {
    id: Math.floor(Math.random() * 10000),
    title: 'Test Automation Advanced',
    description: 'Book created via automated test',
    pageCount: 450,
    excerpt: "string",
    publishDate: new Date().toISOString()
  };
}