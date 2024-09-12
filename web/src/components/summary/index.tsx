import { Plus } from 'lucide-react'
import {
  buttonItems,
  completedGoalsMonday,
  completedGoalsSunday,
} from '../../utils/utils'
import { InOrbitIcon } from '../icons/in-orbit-icon'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { OutlineButton } from '../ui/outline-button'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'

export function Summary() {
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">5 a 10 de Agosto</span>
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
          <ProgressIndicator style={{ width: 200 }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou <span className="text-zinc-100">8</span> de{' '}
            <span className="text-zinc-100">15</span> metas nessa semana.
          </span>
          <span>58%</span>
        </div>
      </div>
      <Separator />

      <div className="flex flex-wrap gap-3">
        {buttonItems.map(item => (
          <OutlineButton key={item.id}>
            {item.icon}
            {item.label}
          </OutlineButton>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua Semana</h2>
        <div className="flex flex-col gap-4">
          <h3 className="font-medium">
            Domingo{' '}
            <span className="text-zinc-400 text-xs">(10 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            {completedGoalsSunday.map(goal => (
              <li key={goal.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {goal.icon}
                  {goal.text}
                </div>
              </li>
            ))}
          </ul>
          <h3 className="font-medium">
            Segunda{' '}
            <span className="text-zinc-400 text-xs">(11 de agosto)</span>
          </h3>
          <ul className="flex flex-col gap-3">
            {completedGoalsMonday.map(goal => (
              <li key={goal.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {goal.icon}
                  {goal.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
