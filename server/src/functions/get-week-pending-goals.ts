import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { firstDayOfWeek, lastDayOfWeek } from '../utils/utls'

export async function getWeekPendingGoals() {
  const goalsCreateUpToWeek = db.$with('goals_create_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
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
      desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
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
