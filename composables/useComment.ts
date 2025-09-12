import { reactive } from 'vue'
import type { ApiResponse, Comment } from '@/models'
import { toastStore } from "~/store/toasted"
import { useRouter } from 'vue-router'
import { commentStore } from '~/store/comment'

interface State {
  comments: Comment[],
  comment: Comment | null,
  loadedAllComments: boolean
}

export function useComment() {
  const state: State = reactive({
    comments: [] as Comment[],
    comment: {} as Comment,
    loadedAllComments: false
  })

  const toast = toastStore()
  const comment = commentStore()

  /**
   * initial comment
   * @param comment Comment
   */
  function set(comment: Comment) {
    state.comment = comment
  }

  /**
  * create a new comment 
  * @param newComment Comment
  */
  const addComment = async (newComment: any) => {
    return await comment.addComment(newComment).then((data: any) => {
      if (!data.status && data.code == 422) {
        let errors = ''
        Object.values(data.data).forEach((error) => {
          errors += `<p>${error}</p>`
        });
        const info = {
          type: 'error',
          message: errors
        }
        toast.setToasted(info)
        return false;
      }
      if (data.status) {
        state.comments?.unshift(data.data)
        return true
      } else {
        const info = {
          type: 'error',
          message: 'Thêm mới thất bại!'
        }
        toast.setToasted(info)
        return false
      }
    })
  }

  /**
  * update a comment 
  * @param conment Comment
  */
    const updateComment = (conment: Comment) => {
      console.log(conment)
      comment.updateCommentByID(conment.id, conment).then((data: any) => {
        if(!data.status && data.code == 422){
          let errors = ''
          Object.values(data.data).forEach((error) => {
          errors += `<p>${error}</p>`
          });
          const info = {
            type: 'error',
            message: errors
          }
          toast.setToasted(info)
          return false;
        }
        if (data.status) {
          // state.comments?.push(data.data)
        } else {
          const info = {
            type: 'error',
            message: 'Chỉnh sửa thất bại!'
          }
          toast.setToasted(info)
        }
      })
    }

  /**
  * delete a comment 
  * @param conment Comment
  */
    const deleteComment = (conment: Comment) => {
      comment.deleteComment(conment.id).then((data: any) => {
        if(!data.status && data.code == 422){
          let errors = ''
          Object.values(data.data).forEach((error) => {
          errors += `<p>${error}</p>`
          });
          const info = {
            type: 'error',
            message: errors
          }
          toast.setToasted(info)
          return false;
        }
        if (data.status) {
          // state.comments?.push(data.data)
        } else {
          const info = {
            type: 'error',
            message: 'Xóa thất bại!'
          }
          toast.setToasted(info)
        }
      })
    }

  const getListCommentsByLessonSlug = async (searchData: any) => {
    const data: any = await comment.getListCommentByLessonSlug(searchData.lesson_slug, searchData.panigate)
    if (data.status) {
      let start = searchData.panigate.start
      let limit = searchData.panigate.limit
      let newComments: Comment[] = data.data?.data
      if (start == 0) {
        state.comments = newComments
      } else {
        state.comments.push(...newComments)
      }
      if (!newComments || newComments.length == 0 || newComments.length < limit) {
        state.loadedAllComments = true
      } else {
        state.loadedAllComments = false
      }
    } else {
      state.loadedAllComments = true
    }
  }

  const getListCommentsByID = async (searchData: any) => {
    const data: any = await comment.getListCommentByID(searchData.id, searchData.panigate)
    if (data.status) {
      let start = searchData.panigate.start
      let limit = searchData.panigate.limit
      let newComments: Comment[] = data.data?.data
      if (start == 0) {
        state.comments = newComments
      } else {
        state.comments.push(...newComments)
      }
      if (!newComments || newComments.length == 0 || newComments.length < limit) {
        state.loadedAllComments = true
      } else {
        state.loadedAllComments = false
      }
    } else {
      state.loadedAllComments = true
    }
  }

  return {
    state,
    set,
    addComment,
    updateComment,
    deleteComment,
    getListCommentsByID,
    getListCommentsByLessonSlug,
  }
}