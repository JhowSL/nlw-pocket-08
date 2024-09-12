import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

dayjs.locale(ptBR)

export const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
export const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

export const weekDay = (date: string): string => dayjs(date).format('dddd')
export const formattedDate = (date: string): string =>
  dayjs(date).format('D [de] MMM')
