// https://www.youtube.com/watch?v=sUu_5tcrp44&list=PLBjvYfV_TvwIfgvouZCaLtgjYdrWQL02d&index=28
// https://www.youtube.com/watch?v=K5wxwnNnHIc&list=PLBjvYfV_TvwIfgvouZCaLtgjYdrWQL02d&index=1
import { useQuasar } from 'quasar'
export default function useNotify () {
  const $q = useQuasar()
  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'All right!'
    })
  }
  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Failed'
    })
  }
  return {
    notifySuccess,
    notifyError
  }
}
