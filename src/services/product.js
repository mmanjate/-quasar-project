import useApi from 'src/composables/UseApi'
export default function useProductService () {
  const { list, post, getById, update, remove, uploadImg, listPublic } = useApi('product')
  return {
    list,
    post,
    getById,
    update,
    remove,
    uploadImg,
    listPublic
  }
}
