// api.js
export async function fetchTodos() {
  console.log('🔄 Fetching todos from API...');
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}
