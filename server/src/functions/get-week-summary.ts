import { and, desc, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { firstDayOfWeek, lastDayOfWeek } from '../utils/utls'

export async function getWeekSummary() {
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

  const goalsCompletedInWeek = db.$with('goals_completions_up_to_week').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.completedAt,
        completedAtDate: sql /*sql*/`DATE(${goalCompletions.completedAt})`.as(
          'completedAtDate'
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .orderBy(desc(goalCompletions.completedAt))
      .where(
        and(
          gte(goalCompletions.completedAt, firstDayOfWeek),
          lte(goalCompletions.completedAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql /*sql*/`JSON_AGG(JSON_BUILD_OBJECT(
      'id', ${goalsCompletedInWeek.id},
      'title', ${goalsCompletedInWeek.title},
      'completedAt', ${goalsCompletedInWeek.completedAt}
    ))`.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(desc(goalsCompletedInWeek.completedAtDate))
  )

  type GoalsPerDay = Record<
    string,
    {
      id: string
      title: string
      goalsPerDay: unknown
    }[]
  >

  const result = await db
    .with(goalsCreateUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql /*sql*/`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
          Number
        ),
      total:
        sql /*sql*/`(SELECT SUM(${goalsCreateUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreateUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql /*sql*/<GoalsPerDay>`JSON_OBJECT_AGG(
        ${goalsCompletedByWeekDay.completedAtDate},
        ${goalsCompletedByWeekDay.completions}
        )
      `,
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result[0],
  }
}
