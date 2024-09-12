import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface UseQueryClientProps {
  children: ReactNode
}

export default function UseQueryClient({
  children,
}: Readonly<UseQueryClientProps>) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
