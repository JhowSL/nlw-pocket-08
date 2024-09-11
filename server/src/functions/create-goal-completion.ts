import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'

interface CreateGoalCompletionRequest {
  goalId: string
}
export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

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
          lte(goalCompletions.completedAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalsCompletionsCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionsCounts:
        sql /*sql*/`COALESCE(${goalsCompletionsCounts.completionCount}, 0)`.mapWith(
          Number
        ),
    })
    .from(goals)
    .leftJoin(
      goalsCompletionsCounts,
      eq(goalsCompletionsCounts.goalId, goals.id)
    )
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionsCounts, desiredWeeklyFrequency } = result[0]

  if (completionsCounts >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed this week!')
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning()
  const goalCompletion = insertResult[0]

  return {
    goalCompletion,
  }
}
