// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { fetchTodos } from './api';

// export function ComponentB() {
//   const { data, isLoading, isFetching } = useQuery({
//       queryKey: ['todos'],
//     queryFn: fetchTodos,
//     refetchOnMount: false,     // Do NOT refetch on mount
//   refetchOnWindowFocus: false,
//   refetchOnReconnect: false,
//     });
//   return (
//     <div style={{ border: '2px solid #16a34a', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
//       <h2 style={{ color: '#16a34a' }}>Component B Todos</h2>
//       {isLoading ? <p>Loading...</p> : null}
//       {isFetching && !isLoading ? <p style={{ color: '#facc15' }}>Fetching...</p> : null}
//       <ul>
//         {data && data.map(todo => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from './api';

export function ComponentB({ fetchCount, setFetchCount }) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      setFetchCount(prev => prev + 1);
      return fetchTodos();
    },
    staleTime: 5000,
    refetchOnMount: false,
  });

  return (
    <div style={{ border: '2px solid #16a34a', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      <h2 style={{ color: '#16a34a' }}>Component B Todos</h2>
      {isLoading ? <p>Loading...</p> : null}
      {isFetching && !isLoading ? <p style={{ color: '#facc15' }}>Fetching...</p> : null}
      <ul>
        {data && data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      {data && <p style={{ fontSize: '12px', color: '#6b7280' }}>Fetched at: {data.fetchedAt}</p>}
    </div>
  );
}
