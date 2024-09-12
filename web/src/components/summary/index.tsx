import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Plus } from 'lucide-react'
import { getSummary } from '../../hooks/http/get/get-summary'

import dayjs from 'dayjs'
import {
  firstDayOfWeek,
  formattedDate,
  lastDayOfWeek,
  weekDay,
} from '../../utils'
import { CompletedPercentage } from '../../utils/utils-summary'
import { InOrbitIcon } from '../icons/in-orbit-icon'
import { PendingGoals } from '../pending-goals'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 1 minute
  })
  if (!data) {
    return null
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar Meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator style={{ width: `${CompletedPercentage}` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{data.completed}</span> de{' '}
            <span className="text-zinc-100">{data.total}</span> metas nessa
            semana.
          </span>
          <span>{CompletedPercentage()}%</span>
        </div>
      </div>
      <Separator />

      <div className="flex flex-wrap gap-3">
        <PendingGoals />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>
        {data.goalsPerDay &&
          Object.entries(data.goalsPerDay).map(([date, goals]) => {
            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium ">
                  <span className="capitalize">{weekDay(date)}</span>{' '}
                  <span className="text-zinc-400 text-xs">
                    ({formattedDate(date)})
                  </span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.completedAt).format('HH:mm')
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou "<span className="text-zinc-100">{goal.title}</span>"
                            às <span className="text-zinc-100">{time}h</span>
                          </span>{' '}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  )
}
