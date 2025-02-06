import useApi from 'src/composables/UseApi'
export default function useCategoryService () {
  const { list, post, getById, update, remove } = useApi('category')
  return {
    list,
    post,
    getById,
    update,
    remove
  }
}
