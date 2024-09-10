import dayjs from "dayjs"
import { client, db } from "."
import { goalCompletions, goals } from "./schema"

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
    { title: 'Estudar inglês', desiredWeeklyFrequency: 3 },
    { title: 'Fazer exercícios', desiredWeeklyFrequency: 4 },
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, completedAt: startOfWeek.toDate() },
    { goalId: result[1].id, completedAt: startOfWeek.add(1, 'day').toDate() }
  ])
}

seed().finally(() => {
  client.end()
})