// import React, { useEffect } from 'react';
// import { QueryClient, useQuery } from '@tanstack/react-query';
// import { fetchTodos } from './api';

// export function ComponentA({ fetchCount, setFetchCount }) {
//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ['todos'],
//     queryFn: async () => {
//       setFetchCount(prev => prev + 1);
//       return fetchTodos();
//     },
//     staleTime: 5000,        // data fresh for 5s
//     refetchOnMount: false,  // do not automatically refetch on mount
//   });

//   const queryClient = new QueryClient();
//   const cachedTodos = queryClient.getQueryData(['todos']);
// console.log('Cached Todos:', cachedTodos);


// const printCache = () => {
//   const cached = queryClient.getQueryData(['todos']); // now prints actual data
//   console.log('Cached Todos:', cached);
// };



//   return (
//     <div style={{ border: '2px solid #4f46e5', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
//       <h2 style={{ color: '#4f46e5' }}>Component A Todos</h2>
//       {isLoading ? <p>Loading...</p> : null}
//       {isFetching && !isLoading ? <p style={{ color: '#facc15' }}>Fetching...</p> : null}
//       <ul>
//         {data && data.map(todo => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//       {data && <p style={{ fontSize: '12px', color: '#6b7280' }}>Fetched at: {data.fetchedAt}</p>}
//       <button onClick={printCache()}>
//   Print Cached Data
// </button>
//     </div>
//   );
// }


import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTodos } from './api';

export function ComponentA({ fetchCount, setFetchCount }) {
  const queryClient = useQueryClient(); // ✅ use existing QueryClient

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      setFetchCount(prev => prev + 1);
      return fetchTodos();
    },
    staleTime: 5000,
    refetchOnMount: false,
  });

  const printCache = () => {
    const cached = queryClient.getQueryData(['todos']); // ✅ get cached data
    console.log('Cached Todos:', cached);
  };

  return (
    <div style={{ border: '2px solid #4f46e5', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
      <h2 style={{ color: '#4f46e5' }}>Component A Todos</h2>
      {isLoading ? <p>Loading...</p> : null}
      {isFetching && !isLoading ? <p style={{ color: '#facc15' }}>Fetching...</p> : null}
      <ul>
        {data && data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      {data && <p style={{ fontSize: '12px', color: '#6b7280' }}>Fetched at: {data.fetchedAt}</p>}
      <button onClick={printCache}>
        📝 Print Cached Data
      </button>
    </div>
  );
}
