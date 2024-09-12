import { X } from 'lucide-react'
import { radioItems } from '../../utils/utils-create-goals'
import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoal } from '../../hooks/http/post/create-goal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().int().min(1).max(7),
})
type CreateGoalForm = z.infer<typeof createGoalForm>

export function CreateGoalDialog() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } = useForm<CreateGoalForm>({
    resolver: zodResolver(createGoalForm),
  })
  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }
  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit(handleCreateGoal)} className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a Atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc.."
                {...register("title")}
              />
              {formState.errors.title && (
                <p className='text-red-400 text-sm'>{formState.errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vez na Semana?</Label>
              <Controller control={control}
                defaultValue={1}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                      {radioItems.map(item => (
                        <RadioGroupItem key={item.value} value={item.value}>
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            {item.label}
                          </span>
                          <span className="text-lg leading-none">{item.emoji}</span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )
                }} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
