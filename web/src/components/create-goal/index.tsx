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

export function CreateGoalDialog() {
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

        <form action="" className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a Atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc.."
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vez na Semana?</Label>
              <RadioGroup>
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
