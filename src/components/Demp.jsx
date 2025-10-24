// import React, { useState, useEffect } from 'react';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// // Step 1: Create a QueryClient instance
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true, // Refetch when window regains focus
//       refetchOnReconnect: true, // Refetch when internet reconnects
//       retry: 1,
//       staleTime: 1000, // Data is fresh for 5 seconds (1000ms)
//        refetchInterval: 10000,
//       gcTime: 10000, // Keep unused data in cache for 10 seconds
//     },
//   },
// });

// // Step 2: Fetch function with timestamp to see when it's called
// async function fetchTestData() {
//   console.log('🔄 Fetching data at:', new Date().toLocaleTimeString());
//   const response = await fetch('https://dummyjson.com/test');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   const data = await response.json();
//   // Add timestamp to see when data was fetched
//   return { ...data, fetchedAt: new Date().toISOString() };
// }

// // Component to show network status
// function NetworkStatus() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   return (
//     <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//       <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
//       <span className="font-semibold">{isOnline ? 'Online' : 'Offline'}</span>
//     </div>
//   );
// }

// // Step 3: Component that uses the query
// function DataDisplay() {
//   const [fetchCount, setFetchCount] = useState(0);
//   const [lastFetchTime, setLastFetchTime] = useState(null);

//   const { data, isLoading, isError, error, refetch, isFetching, isStale, dataUpdatedAt } = useQuery({
//     queryKey: ['testData'],
//     queryFn: async () => {
//       setFetchCount(prev => prev + 1);
//       setLastFetchTime(new Date().toLocaleTimeString());
//       return fetchTestData();
//     },
//     staleTime: 1000, // Data becomes stale after 5 seconds
//      refetchInterval: 10000,
//   });

//   // Calculate time since last update
//   const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);

//   useEffect(() => {
//     if (dataUpdatedAt) {
//       const interval = setInterval(() => {
//         setTimeSinceUpdate(Date.now() - dataUpdatedAt);
//       }, 100);
//       return () => clearInterval(interval);
//     }
//   }, [dataUpdatedAt]);

//   const secondsSinceUpdate = Math.floor(timeSinceUpdate / 1000);
//   const isFresh = secondsSinceUpdate < 5;

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center p-8 bg-white rounded-lg shadow-lg">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Initial Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
//         <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
//           <p className="text-gray-600 mb-4">{error.message}</p>
//           <button
//             onClick={() => refetch()}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Status Bar */}
//         <div className="bg-white rounded-lg shadow-xl p-4 mb-6">
//           <div className="flex flex-wrap gap-4 items-center justify-between">
//             <NetworkStatus />
            
//             <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isFetching ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//               {isFetching && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>}
//               <span className="font-semibold">{isFetching ? 'Fetching...' : 'Idle'}</span>
//             </div>

//             <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isFresh ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
//               <span className="font-semibold">{isFresh ? '✨ Fresh' : '⏰ Stale'}</span>
//               <span className="text-sm">({secondsSinceUpdate}s ago)</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">✅ TanStack Query Demo</h1>
          
//           {/* Fetch Statistics */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-indigo-50 p-4 rounded-lg">
//               <div className="text-3xl font-bold text-indigo-600">{fetchCount}</div>
//               <div className="text-sm text-gray-600">Total Fetches</div>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg">
//               <div className="text-lg font-bold text-purple-600">{lastFetchTime || 'N/A'}</div>
//               <div className="text-sm text-gray-600">Last Fetch Time</div>
//             </div>
//             <div className="bg-pink-50 p-4 rounded-lg">
//               <div className="text-lg font-bold text-pink-600">5 seconds</div>
//               <div className="text-sm text-gray-600">Stale Time</div>
//             </div>
//           </div>

//           {/* API Response */}
//           <div className="bg-gray-50 rounded-lg p-6 mb-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-3">API Response:</h3>
//             <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
//               {JSON.stringify(data, null, 2)}
//             </pre>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-4">
//             <button
//               onClick={() => refetch()}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition shadow-md flex-1 md:flex-none"
//             >
//               🔄 Manual Refetch
//             </button>
//             <button
//               onClick={() => {
//                 queryClient.invalidateQueries({ queryKey: ['testData'] });
//               }}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition shadow-md flex-1 md:flex-none"
//             >
//               ♻️ Invalidate Query
//             </button>
//           </div>
//         </div>

//         {/* Instructions Card */}
//         <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">🧪 Test These Scenarios:</h2>
//           <div className="space-y-4 text-gray-700">
//             <div className="border-l-4 border-blue-500 pl-4 py-2">
//               <strong className="text-blue-700">Stale Time Test:</strong>
//               <p className="text-sm mt-1">Watch the "Fresh/Stale" indicator. After 5 seconds, data becomes stale. Click "Manual Refetch" when stale - it will fetch. Click when fresh (within 5s) - it won't fetch!</p>
//             </div>
            
//             <div className="border-l-4 border-green-500 pl-4 py-2">
//               <strong className="text-green-700">Window Focus Test:</strong>
//               <p className="text-sm mt-1">Wait for data to become stale (5+ seconds), then switch to another tab/window and come back. It should automatically refetch!</p>
//             </div>
            
//             <div className="border-l-4 border-red-500 pl-4 py-2">
//               <strong className="text-red-700">Network Reconnect Test:</strong>
//               <p className="text-sm mt-1">Open DevTools (F12) → Network tab → Set to "Offline". Wait 5+ seconds. Set back to "Online". It should automatically refetch when stale!</p>
//             </div>
            
//             <div className="border-l-4 border-purple-500 pl-4 py-2">
//               <strong className="text-purple-700">Invalidate Query:</strong>
//               <p className="text-sm mt-1">Click "Invalidate Query" to mark data as stale immediately, triggering a refetch regardless of stale time!</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <DataDisplay />
//     </QueryClientProvider>
//   );
// }

// import React, { useState } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ComponentA } from './ComponentA';
// import { ComponentB } from './ComponentB';

// const queryClient = new QueryClient();

// export default function App() {
//   const [showB, setShowB] = useState(false);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//         <h1 style={{ marginBottom: '20px' }}>🔹 React Query Duplicate Fetch Demo</h1>

//         <ComponentA />

//         <button
//           onClick={() => setShowB(prev => !prev)}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: '#2563eb',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '6px',
//             cursor: 'pointer',
//             marginBottom: '20px'
//           }}
//         >
//           {showB ? 'Hide Component B' : 'Show Component B'}
//         </button>

//         {showB && <ComponentB />}
//       </div>
//     </QueryClientProvider>
//   );
// }



import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComponentA } from './ComponentA';
import { ComponentB } from './ComponentB';

const queryClient = new QueryClient();

export default function App() {
  const [showB, setShowB] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1 style={{ marginBottom: '20px' }}>🔹 React Query Caching Demo</h1>

        {/* Display fetch count */}
        <div style={{ marginBottom: '20px', padding: '10px', background: '#f3f4f6', borderRadius: '8px' }}>
          <strong>Total API Calls:</strong> {fetchCount}
        </div>

        {/* Component A */}
        <ComponentA fetchCount={fetchCount} setFetchCount={setFetchCount} />

        {/* Toggle Component B */}
        <button
          onClick={() => setShowB(prev => !prev)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showB ? 'Hide Component B' : 'Show Component B'}
        </button>

        {/* Component B */}
        {showB && <ComponentB fetchCount={fetchCount} setFetchCount={setFetchCount} />}

        {/* Manual refetch button */}
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['todos'] })}
          style={{
            padding: '10px 20px',
            backgroundColor: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          ♻️ Invalidate Cache & Refetch
        </button>
      </div>
    </QueryClientProvider>
  );
}
