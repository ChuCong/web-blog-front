import { reactive } from 'vue'
import { userStore } from '@/store/user'
import type { User, ApiResponse, CourseManager } from '@/models'
import { messageSuccess } from '~/common/message.service'
import JwtService from "~/services/jwt.service"

interface State {
  userDetail: User | null
  avatarUrl: string
  userCourses: CourseManager[]
}

export function useUser() {
  const state: State = reactive({
    // userDetail: null,
    userDetail: useState<User>('userDetail', () => ({} as User)),
    avatarUrl: useState<string>('avatarUrl', () => ''),
    userCourses: []
  })

  const store = userStore()

  const getUserDetail = async () => {
    state.avatarUrl ="";
    const res = await store.fetchUserDetail()
    if (res?.data) {
      state.userDetail = res.data
      state.avatarUrl = res.data.avatar ? res.data.avatar : '';
    }
    return res
  }

  const updateUser = async (payload: any): Promise<ApiResponse<any>> => {
    return await store.updateUser(payload)
  }

  const fetchUserCourses = async () => {
    const response: ApiResponse<CourseManager[]> = await store.fetchUserCourses()
    if (response && response.status) {
      state.userCourses = response.data
    }
    return response
  }

  const uploadAvatar = async (formData: FormData): Promise<ApiResponse<{ url: string }>> => {
    JwtService.destroyUserAvatar()
    const res = await store.uploadAvatar(formData)
    if (res?.data) {
      state.avatarUrl = res.data.url;
      JwtService.saveUserAvatar(res.data.avatar)
      messageSuccess(res?.message)
    }
    return res
  }

  const logout = async (): Promise<ApiResponse<any>> => {
    const res = await store.logout()
    state.userDetail = null
    state.avatarUrl = ''
    state.userCourses = []
    return res
    }
    
    const generateCertificate = async (courseId: number): Promise<string | null> => {
      const res = await store.generateCertificate({ course_id: courseId })
        if (res?.data?.certificate_url) {
            return res.data.certificate_url
        }
        return null
    }

  return {
    state,
    getUserDetail,
    updateUser,
    fetchUserCourses,
    uploadAvatar,
    logout,
    generateCertificate
  }
}