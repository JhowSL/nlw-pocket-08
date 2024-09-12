import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './app'
import UseQueryClient from './context/query-client'

createRoot(document.getElementById('root')!).render(
  <UseQueryClient>
    <App />
  </UseQueryClient>
)
