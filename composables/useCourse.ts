import { courseStore } from "~/store/course";
import type { ApiResponse, Course, CourseManager } from '~/models';

interface State {
    course: Course,
    courses: CourseWithGroupedTags[],
    userCourses: Course[];
}
interface GroupedTags {
    name: string;
    list_tags: string;
}

interface CourseWithGroupedTags extends Course {
    tags: GroupedTags[];
}
export function useCourse() {
    const state: State = reactive({
        course: useState<Course>('category', () => ({} as Course)),
        courses: useState<CourseWithGroupedTags[]>('courses', () => []),
        userCourses: useState<Course[]>('userCourses', () => [])
    })

    const course_store = courseStore()

    const groupTagsForTagsArray = (tags: any[]): GroupedTags[] => {
        const grouped: { [key: string]: string[] } = {};
        tags.forEach((tag) => {
            if (tag.tag_type?.show_in_course !== 1) return;
            const groupName = tag.tag_type?.name || 'Khác';
            if (!grouped[groupName]) grouped[groupName] = [];
            grouped[groupName].push(tag.name);
        });

        return Object.entries(grouped).map(([name, tags]) => ({
            name,
            list_tags: tags.join(', '),
        }));
    };
    const fetchCourseDetail = async (slug: string) => {
        const response: ApiResponse<Course> = await course_store.fetchCourseDetail(slug);
        if (response && response.status) {
            state.course = response.data;
        }
    }
    const fetchCourses = async (params: any) => {
        const response: ApiResponse<Course[]> = await course_store.fetchCourses(params);
        if (response && response.status) {
            const coursesWithFormattedTags = response.data.map((course) => {
                return {
                    ...course,
                    tags: groupTagsForTagsArray(course.tags || [])
                };
            });
            state.courses = coursesWithFormattedTags;
        }
    }

    const addCourseLearn = async (slug: string) => {
        const response: ApiResponse<CourseManager> = await course_store.addCourseLearn(slug);
    }

    return {
        state,
        fetchCourseDetail,
        fetchCourses,
        addCourseLearn
    }
}