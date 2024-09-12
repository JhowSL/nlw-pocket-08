import { useQuery } from '@tanstack/react-query'
import { getSummary } from '../hooks/http/get/get-summary'

export function CompletedPercentage() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  })

  if (!data) {
    return null
  }
  const completedPercentage = Math.round((data.completed * 100) / data?.total)

  return <>{completedPercentage}</>
}
