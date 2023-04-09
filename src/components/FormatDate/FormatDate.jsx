import { format } from 'date-fns'

const FormatDate = (date) => {
  return format(new Date(date), "dd MMM yyyy")
}

export default FormatDate
