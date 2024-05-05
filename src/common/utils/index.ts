export const parserDate = (inputDateString: string) => {
  const inputDate = new Date(inputDateString)

  const formattedDate = inputDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  return formattedDate
}

export const getDateKey = (date: Date) => {
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}h`
}

export const convertToVietnamTime = (utcTimestamp: Date) => {
  // Create a new Date object adjusted to Vietnam's time zone
  const vietnamTime = new Date(utcTimestamp)
  vietnamTime.setHours(utcTimestamp.getHours() + 7) // Vietnam Standard Time is UTC+7

  return vietnamTime
}
