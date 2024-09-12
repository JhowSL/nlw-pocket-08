import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { getPendingGoals } from '../../hooks/http/get-pending-goals'
import { OutlineButton } from '../ui/outline-button'

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (!data) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionsCounts >= goal.desiredWeeklyFrequency}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
