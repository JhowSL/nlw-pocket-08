import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreateUpToWeek = db.$with('goals_create_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        debuggerWeeklyFrequency: goals.desiredWeeklyFrequency,
        createAt: goals.createAt,
      })
      .from(goals)
      .where(lte(goals.createAt, lastDayOfWeek))
  )

  const goalsCompletionsCounts = db.$with('goals_completions_up_to_week').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.completedAt, firstDayOfWeek),
          lte(goalCompletions.completedAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const pendingGoals = await db
    .with(goalsCreateUpToWeek, goalsCompletionsCounts)
    .select({
      id: goalsCreateUpToWeek.id,
      title: goalsCreateUpToWeek.title,
      dayjsWeeklyFrequency: goalsCreateUpToWeek.debuggerWeeklyFrequency,
      completionsCounts:
        sql /*sql*/`COALESCE(${goalsCompletionsCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goalsCreateUpToWeek)
    .leftJoin(
      goalsCompletionsCounts,
      eq(goalsCompletionsCounts.goalId, goalsCreateUpToWeek.id)
    )

  return {
    pendingGoals,
  }
}
