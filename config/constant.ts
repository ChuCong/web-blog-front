// type icon
export const MANAGE_EXAM = "manage_exam"
export const CIRCLE = "circle"
export const MANAGE_SCHEDULE = "manage_schedule"
export const MANAGE_COMPANY = "manage_company"
export const ARROW_DOWN = "arrow_down"
export const HUMBURER = "hamburger"
export const NEXT_BREADCRUMB = "next_breadcrumb"
export const LOGOUT = "logout"
export const PENCIL = "pencil"
export const DELETE = "delete"
export const ADMIN = "admin"
export const MANAGE_USER = "user"
export const API_KEY = "api_key"
export const MANAGE_ROSES = "roses"
export const STATISTICS = "statistics"
export const COMMENT = "comment"

// constants
export const ACTIVE = true
export const INACTIVE = false

export const EXAM_TYPE_LIST = 1
export const EXAM_TYPE_PART = 2

export const REPEAT_TYPE_DAILY = 1
export const REPEAT_TYPE_DAYS_OF_WEEK = 2
export const REPEAT_TYPE_SPECIFIC_DATE = 3

export const SUNDAY = 0
export const MONDAY = 1
export const TUESDAY = 2
export const WEDNESDAY = 3
export const THURSDAY = 4
export const FRIDAY = 5
export const SATURDAY = 6

export const TYPE_ROW = {
    NAME_EXAM: 'name_exam',
    ADD_ANSWERS: 'add_answers',
    ADD_SCORE: 'add_score',
    NAME_CATEGORY: 'name_category',
    PART: 'part',
    QUESTION: 'question',
    UPDATE_IMG_EXAM: 'update_img_exam'
}

export const TYPE_ANSWER = {
    ONE_CHOICE: 1,
    MULTIPLE_CHOICE: 2,
    ESSAY: 3,
    QUESTION_PAIRS: 4,
    HAS_CHILD: 5,
    RIGHT_OR_WRONG: 6
}

export const UPLOAD_FILE_FOR_USER = 1
export const UPLOAD_FILE_FOR_ADMIN = 2

export const ANSWER_LETTERS = ['A', 'B', 'C', 'D']


export const TYPE_QUESTION_SCORE_SENTENCE = 1
export const TYPE_QUESTION_SCORE_EACH_IDEA = 2

export const TYPE_IDEA_SCORE_BY_EACH_IDEA = 1
export const TYPE_IDEA_SCORE_BY_NUMBER_IDEA = 2

export const CONTEST_INACTIVE_STATUS = 0
export const CONTEST_REQUEST_PUBLISH_STATUS = 1
export const CONTEST_PUBLISH_STATUS = 2
export const CONTEST_CLOSE_STATUS = 3


export const ORDER_CREATED_STATUS = 0
export const ORDER_CANCELED_STATUS = 1
export const ORDER_PAID_STATUS = 2
export const ORDER_PAID_ERROR_STATUS = 3
export const ORDER_UNCREATED = 4

export const CONTEST_ORDER_TYPE = "App\\Models\\Group"
export const EXAM_ORDER_TYPE = "App\\Models\\Exam"