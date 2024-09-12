import { CheckCircle2, Plus } from 'lucide-react'

export const radioItems = [
  { value: '1', label: '1x na semana', emoji: '🥱' },
  { value: '2', label: '2x na semana', emoji: '🙂' },
  { value: '3', label: '3x na semana', emoji: '😎' },
  { value: '4', label: '4x na semana', emoji: '😜' },
  { value: '5', label: '5x na semana', emoji: '🤨' },
  { value: '6', label: '6x na semana', emoji: '🤯' },
  { value: '7', label: 'Todos dias da semana', emoji: '🔥' },
]

export const buttonItems = [
  {
    id: '1',
    icon: <Plus className="size-4 text-zinc-600" />,
    label: 'Meditar',
  },
  {
    id: '2',
    icon: <Plus className="size-4 text-zinc-600" />,
    label: 'Praticar exercício',
  },
  {
    id: '3',
    icon: <Plus className="size-4 text-zinc-600" />,
    label: 'Acordar cedo',
  },
  { id: '4', icon: <Plus className="size-4 text-zinc-600" />, label: 'Jogar' },
]

export const completedGoalsSunday = [
  {
    id: '1',
    icon: <CheckCircle2 className="size-4 text-pink-500" />,
    text: (
      <span className="text-sm text-zinc-400">
        Você completou "<span className="text-zinc-100">Acordar cedo</span>" às{' '}
        <span className="text-zinc-100">08:13h</span>
      </span>
    ),
  },
  {
    id: '2',
    icon: <CheckCircle2 className="size-4 text-pink-500" />,
    text: (
      <span className="text-sm text-zinc-400">
        Você completou "<span className="text-zinc-100">Fazer exercício</span>"
        às <span className="text-zinc-100">08:13h</span>
      </span>
    ),
  },
]
export const completedGoalsMonday = [
  {
    id: '1',
    icon: <CheckCircle2 className="size-4 text-pink-500" />,
    text: (
      <span className="text-sm text-zinc-400">
        Você completou "<span className="text-zinc-100">Meditar</span>" às{' '}
        <span className="text-zinc-100">08:13h</span>
      </span>
    ),
  },
]
