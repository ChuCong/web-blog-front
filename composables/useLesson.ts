import { lessonStore } from "~/store/lesson";
import { messageSuccess, messageError } from '~/common/message.service';
import type { ApiResponse, Lesson, LessonProcess } from '~/models';

interface State {
    lesson: Lesson,
    lessons: Lesson[]
}

export function useLesson() {
    const state: State = reactive({
        lesson: useState<Lesson>('lesson', () => ({} as Lesson)),
        lessons: useState<Lesson[]>('lessons', () => [])
    })

    const lesson_store = lessonStore()

    const fetchLesson = async (slug: string) => {
        const response: ApiResponse<Lesson> = await lesson_store.fetchLessonSlug(slug);
        if (response && response.status) {
            state.lesson = response.data;
        }
    }
    const fetchLessonsByCourseSlug = async (slug: string) => {
        const response: ApiResponse<Lesson[]> = await lesson_store.fetchLessonsByCourseSlug(slug);
        if (response && response.status) {
            state.lessons = response.data;
        }
    }

    const completeLesson = async (payload: any) => {
        const response: ApiResponse<LessonProcess> = await lesson_store.completeLesson(payload);
        return response
    }

    return {
        state,
        fetchLesson,
        fetchLessonsByCourseSlug,
        completeLesson
    }

}