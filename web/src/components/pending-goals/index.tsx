import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Plus } from 'lucide-react'
import { getPendingGoals } from '../../hooks/http/get/get-pending-goals'
import { createGoalCompletion } from '../../hooks/http/post/create-goal-completion'
import { OutlineButton } from '../ui/outline-button'

export function PendingGoals() {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  })

  if (!data) {
    return null
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map(goal => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionsCounts >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            {goal.completionsCounts >= goal.desiredWeeklyFrequency ? (
              <Check className="size-4 text-green-600" />
            ) : (
              <Plus className="size-4 text-zinc-600" />
            )}
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
