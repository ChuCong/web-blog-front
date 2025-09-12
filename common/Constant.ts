export const AUTHOR_ADMIN = 'topdethi'
export const FRONT = 'front'

export const QUESTION_ONE_CORRECT_ANSWER = 1
export const QUESTION_MULTIPLE_CORRECT_ANSWER = 2
export const QUESTION_ESSAY = 3
export const QUESTION_MATCH = 4

export const QUESTION_MATCH_SIDE_A = 1
export const QUESTION_MATCH_SIDE_B = 2

export const UNAUTHENTICATE_STATUS = 401
export const CONTENT_ERROR_STATUS = 422

export const EXAM_TYPE_LIST = 1
export const EXAM_TYPE_PART = 2

export const TYPE_ANSWER = {
    ONE_CHOICE: 1,
    MULTIPLE_CHOICE: 2,
    ESSAY: 3,
    QUESTION_PAIRS: 4,
    HAS_CHILD: 5,
    RIGHT_OR_WRONG: 6,
    ARRANGE: 7
}

export const TYPE_DIALOG = {
    DIALOG_CONFIRM: 'dialog_confirm',
    DIALOG_DISPLAY_RESULT: 'dialog_displayResult',
    DIALOG_CONTEST_JOINTED: 'dialog_contestJoined',
    DIALOG_NOT_ACCEPTED_TO_JOIN: 'dialog_not_accept_to_join',
}

export const EXAM = 'exam';
export const REVIEW_EXAM = 'review-exam';
export const TYPE_IN_ANSWER = {
    TYPE_A: 1,
    TYPE_B: 2,
}

export const INPUT_TYPE_TEXT = 'text'
export const INPUT_TYPE_TEXTAREA = 'textarea'
export const INPUT_TYPE_EMAIL = 'email'
export const INPUT_TYPE_CHECKBOX = 'checkbox'
export const INPUT_TYPE_PASSWORD = 'password'
export const INPUT_TYPE_SELECT = 'select'
export const INPUT_TYPE_NUMBER = 'number'
export const INPUT_TYPE_CURRENCY = 'currency'

export const TYPE_ROW = {
    NAME_EXAM: 'name_exam',
    ADD_ANSWERS: 'add_answers',
    ADD_SCORE: 'add_scores',
    NAME_CATEGORY: 'name_category',
    PART: 'part',
    QUESTION: 'question'
}


export const ANSWER_LETTERS = ['A', 'B', 'C', 'D']

// export const CONTEST_NORMAL = 1
// export const CONTEST_BEFORE_START = 2
// export const CONTEST_BEFORE_START_AND_UNPAID = 3
// export const CONTEST_BEFORE_START_AND_PAID = 4
// export const CONTEST_JOIN_TIME = 5
// export const CONTEST_JOIN_TIME_AND_UNPAID = 6
// export const CONTEST_JOIN_TIME_AND_PAID = 7
// export const CONTEST_JOIN_TIME_AND_JOINED = 8
// export const CONTEST_IN_PROGRESS = 9
// export const CONTEST_IN_PROGRESS_AND_JOINED = 10
// export const CONTEST_AFTER_END = 11
// export const CONTEST_AFTER_END_AND_JOINED = 12
export const CONTEST_NORMAL = 1
export const CONTEST_BEFORE_START = 2
export const CONTEST_BEFORE_START_AND_UNPAID = 3
export const CONTEST_BEFORE_START_AND_PAID = 4
export const CONTEST_JOIN_TIME = 5
export const CONTEST_JOIN_TIME_AND_UNPAID = 6
export const CONTEST_JOIN_TIME_AND_PAID = 7
export const CONTEST_JOIN_TIME_AND_JOINED = 8
export const CONTEST_IN_PROGRESS = 9
export const CONTEST_IN_PROGRESS_AND_UNPAID = 10
export const CONTEST_IN_PROGRESS_AND_PAID = 11
export const CONTEST_IN_PROGRESS_AND_JOINED = 12
export const CONTEST_AFTER_END = 13
export const CONTEST_AFTER_END_AND_UNPAID = 14
export const CONTEST_AFTER_END_AND_PAID = 15
export const CONTEST_AFTER_END_AND_JOINED = 16

export const TYPE_QUESTION_SCORE_SENTENCE = 1
export const TYPE_QUESTION_SCORE_EACH_IDEA = 2

export const TYPE_IDEA_SCORE_BY_EACH_IDEA = 1
export const TYPE_IDEA_SCORE_BY_NUMBER_IDEA = 2

export const CONTEST_INACTIVE_STATUS = 0
export const CONTEST_REQUEST_PUBLISH_STATUS = 1
export const CONTEST_PUBLISH_STATUS = 2
export const CONTEST_CLOSE_STATUS = 3

export const CONTEST_CANCEL_STATUS = 'CANCELLED'

export const ONGOING_CONTEST = 1
export const HAS_NOT_STARTED_CONTEST = 2
export const ENDED_CONTEST = 3


export const SORTFIELD = 'createdAt'
export const SORTORDER = 'descend'

export const HIGH_RISE = 'cao_tang'
export const LOW_RISE = 'thap_tang'

export const WORD = 'word'
export const PDF = 'pdf'
export const EXCEL = 'excel'
export const POWERPOINT = 'powerpoint'
export const LINK = 'link'
export const VIDEO = 'video'
export const IMAGE = 'image'

export const LESSON = {
    VIDEO: 1,
    TEXT_IMAGE: 2,
    EXCERCISE: 3,
    FLASHCARD: 4
};
export const SETTING_BANNER = 'banner'
export const SETTING_WATERMARK = 'watermark'
export const SETTING_STORAGE = 'storage'
export const SETTING_LEARNING_STATISTICS = 'learning-statistics'
export const SETTING_ABOUT_MSD = 'about-msd'
export const SETTING_COURSE_BANNER = 'image-banner-course'


export const TAG_COURSE_PAGE = 'course'
export const TAG_RESOURCE_PAGE = 'resource'

export const SEARCH_TYPE_COURSE = 1
export const SEARCH_TYPE_LESSON = 2
export const SEARCH_TYPE_RESOURCE = 3
export const SEARCH_TYPE_NEWS = 4


export const EDUCATION_PRIMARY = 1;           // Tiểu học
export const EDUCATION_SECONDARY = 2;         // Trung học cơ sở (THCS)
export const EDUCATION_HIGH_SCHOOL = 3;       // Trung học phổ thông (THPT)
export const EDUCATION_INTERMEDIATE = 4;      // Trung cấp
export const EDUCATION_COLLEGE = 5;           // Cao đẳng
export const EDUCATION_UNIVERSITY = 6;        // Đại học (Cử nhân)
export const EDUCATION_MASTER = 7;            // Thạc sĩ
export const EDUCATION_DOCTOR = 8;            // Tiến sĩ
export const EDUCATION_OTHER = 9;             // Khác / Không áp dụng

export const EDUCATIONS = [
    { text: 'Tiểu học', value: EDUCATION_PRIMARY },
    { text: 'Trung học cơ sở (THCS)', value: EDUCATION_SECONDARY },
    { text: 'Trung học phổ thông (THPT)', value: EDUCATION_HIGH_SCHOOL },
    { text: 'Trung cấp', value: EDUCATION_INTERMEDIATE },
    { text: 'Cao đẳng', value: EDUCATION_COLLEGE },
    { text: 'Đại học (Cử nhân)', value: EDUCATION_UNIVERSITY },
    { text: 'Thạc sĩ', value: EDUCATION_MASTER },
    { text: 'Tiến sĩ', value: EDUCATION_DOCTOR },
    { text: 'Khác / Không áp dụng', value: EDUCATION_OTHER }
]

export const SEX_MALE = 1;
export const SEX_FEMALE = 2;
export const SEX_OTHER = 3;
export const SEX_DISCLOSE = 4;

export const SEXES = [
    { text: 'Nam', value: SEX_MALE },
    { text: 'Nữ', value: SEX_FEMALE },
    { text: 'Khác', value: SEX_OTHER },
    { text: 'Tôi không muốn tiết lộ thông tin', value: SEX_DISCLOSE }
]
