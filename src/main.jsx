import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/Demp'
import DifferentApiCalls from './pages/DifferentApiCalls'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PayLoadDifference from './pages/PayLoadDifference'
import PostOperations from './pages/PostOperations'
import OnlineAndOffline from './pages/OnlineAndOffline'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <QueryClientProvider client={queryClient}>
      {/* <DifferentApiCalls /> */}
      {/* <PayLoadDifference /> */}
      {/* <PostOperations /> */}
      <OnlineAndOffline />
    </QueryClientProvider>
  </StrictMode>,
)
