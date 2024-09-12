import { useQuery } from '@tanstack/react-query'
import { EmptyGoalsDialog } from './components/empty-goals'
import { Summary } from './components/summary'
import { Dialog } from './components/ui/dialog'
import { getSummary } from './hooks/http/get/get-summary'
import { CreateGoalDialog } from './components/create-goal'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  })

  return (
    <Dialog>
      {data && data?.total > 0 ? <Summary /> : <EmptyGoalsDialog />}
      <CreateGoalDialog />
    </Dialog>
  )
}
