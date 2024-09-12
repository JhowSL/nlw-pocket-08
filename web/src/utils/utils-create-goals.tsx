import { Plus } from 'lucide-react'

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
