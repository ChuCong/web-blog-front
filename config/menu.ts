import {
  MANAGE_EXAM,
  CIRCLE,
  MANAGE_SCHEDULE,
  MANAGE_COMPANY,
  ADMIN,
  MANAGE_USER,
  API_KEY,
  MANAGE_ROSES,
  STATISTICS,
  COMMENT
} from "./constant";
export const MENU = [
  {
    title: "menu.exam.title",
    path: "/",
    icon: MANAGE_EXAM,
    key: "manage_exam",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.exam.child.category",
        path: "/category/list",
        key: "category",
        active: false,
        icon: CIRCLE,
        role: "category",
      },
      {
        title: "menu.exam.child.score_sheet",
        path: "/score_sheets/list",
        key: "score_sheets",
        active: false,
        icon: CIRCLE,
        role: "score_sheets",
      },
      {
        title: "menu.exam.child.exam",
        path: "/exam/list_exam",
        key: "exam",
        active: false,
        icon: CIRCLE,
        role: "exam",
      },
      {
        title: "menu.exam.child.exam_ecommerce",
        path: "/exam/list_exam_ecommerce",
        key: "exam_ecommerce",
        active: false,
        icon: CIRCLE,
        role: "exam_ecommerce"
      },
      {
        title: "menu.exam.child.exam_vip",
        path: "/exam/list_exam_vip",
        key: "exam_vip",
        active: false,
        icon: CIRCLE,
        role: "exam_vip"
      }
    ],
    role: "exam",
  },
  {
    title: "menu.exam_user.title",
    path: "/",
    icon: MANAGE_EXAM,
    key: "manage_exam_user",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.exam_user.child.exam",
        path: "/exam-user/list_exam",
        key: "exam_user",
        active: false,
        icon: CIRCLE,
        role: "exam_user",
      },
      {
        title: "menu.exam_user.child.exam_ecommerce",
        path: "/exam-user/list_exam_ecommerce",
        key: "exam_user_ecommerce",
        active: false,
        icon: CIRCLE,
        role: "exam_user_ecommerce",
      }
    ],
    role: "exam_user",
  },
  {
    title: "menu.learning_path.title",
    path: "/",
    icon: STATISTICS,
    key: "learning_path",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.learning_path.child.list",
        path: "/learning-paths/list",
        key: "learning_paths_list",
        active: false,
        icon: CIRCLE,
        role: "learning_path"
      },
      {
        title: "menu.learning_path.roadmap_content.title",
        path: "/roadmap-content/list",
        key: "roadmap_content",
        active: false,
        icon: CIRCLE,
        role: "roadmap_content"
      }
    ],
    role: "learning_path"
  },
  {
    title: "menu.group.title",
    path: "/",
    icon: STATISTICS,
    key: "group",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.group.child.list",
        path: "/groups/list",
        key: "groups_list",
        active: false,
        icon: CIRCLE,
        role: "group"
      }
    ],
    role: "group"
  },
  {
    title: "menu.order.title",
    path: "/",
    icon: STATISTICS,
    key: "order",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.order.child.list",
        path: "/orders/list",
        key: "orders_list",
        active: false,
        icon: CIRCLE,
        role: "order"
      }
    ],
    role: "order"
  },
  {
    title: "menu.road.title",
    path: "/",
    icon: STATISTICS,
    key: "road",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.road.child.list",
        path: "/roads/list",
        key: "roads_list",
        active: false,
        icon: CIRCLE,
        role: "road",
      },
      {
        title: "menu.road.child.road_sent",
        path: "/road-sent/list",
        key: "roads_sent_list",
        active: false,
        icon: CIRCLE,
        role: "road",
      }
    ],
    role: "road",
  },
  {
    title: "menu.statistics.title",
    path: "/",
    icon: STATISTICS,
    key: "statistics",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.statistics.child.list",
        path: "/statistics/list",
        key: "statistics_list",
        active: false,
        icon: CIRCLE,
        role: "statistics_list",
      },
      {
        title: "menu.statistics.child.user",
        path: "/statistics/user",
        key: "statistics_user",
        active: false,
        icon: CIRCLE,
        role: "statistics_user",
      },
      {
        title: "menu.statistics.child.exam",
        path: "/statistics/exam",
        key: "statistics_exam",
        active: false,
        icon: CIRCLE,
        role: "statistics_exam",
      },
      {
        title: "menu.statistics.child.question",
        path: "/statistics/question",
        key: "statistics_question",
        active: false,
        icon: CIRCLE,
        role: "statistics_question",
      }
    ],
    role: "statistics",
  },
  {
    title: "menu.keyword.title",
    path: "/",
    icon: STATISTICS,
    key: "keywords",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.keyword.child.search_query",
        path: "/keywords/search_query",
        key: "search_query_list",
        active: false,
        icon: CIRCLE,
        role: "search_query",
      },
      {
        title: "menu.keyword.child.keyword",
        path: "/keywords/keyword",
        key: "keyword_list",
        active: false,
        icon: CIRCLE,
        role: "keyword",
      }
    ],
    role: "keyword",
  },
  {
    title: "menu.blog.title",
    path: "/",
    icon: MANAGE_EXAM,
    key: "manage_exam",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.blog.child.category_newese",
        path: "/list-category-newses",
        key: "category_newses",
        active: false,
        icon: CIRCLE,
        role: "category_newses",
      },
      {
        title: "menu.blog.child.newses",
        path: "/list-newses",
        key: "newses",
        active: false,
        icon: CIRCLE,
        role: "newses",
      },

    ],
    role: "blog",
  },
  {
    title: "menu.footer.title",
    path: "/",
    icon: MANAGE_EXAM,
    key: "manage_exam",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.footer.child.menu_footer",
        path: "/list-menu-footer",
        key: "menu_footer",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
      {
        title: "menu.footer.child.adviser",
        path: "/list-adviser",
        key: "adviser",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
      {
        title: "menu.footer.child.media_press",
        path: "/list-media-press",
        key: "media_press",
        icon: CIRCLE,
        active: false,
        role: "user",
      },

    ],
    role: "footer",
  },
  //ads
  {
    title: "menu.ads.title",
    path: "/",
    icon: MANAGE_EXAM,
    key: "manage_exam",
    active: false,
    showChild: false,
    child: [
      {
        title: "menu.ads.child.tab_ads",
        path: "/list-tab-ads",
        key: "tab-ads",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
      {
        title: "menu.ads.child.display_ads",
        path: "/list-display-ads",
        key: "display-ads",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
      {
        title: "menu.ads.child.content_ads",
        path: "/list-content-ads",
        key: "content-ads",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
      {
        title: "menu.ads.child.ads",
        path: "/list-ads",
        key: "ads",
        icon: CIRCLE,
        active: false,
        role: "user",
      },
    ],
    role: "ads",
  },
  {
    title: "menu.company",
    path: "/companies/list",
    key: "company",
    icon: MANAGE_COMPANY,
    active: false,
    role: "company",
  },
  {
    title: "menu.user",
    path: "/list_users",
    key: "users",
    icon: MANAGE_USER,
    active: false,
    role: "user_company",
  },
  {
    title: "menu.comment",
    path: "/list_comments",
    key: "comments",
    icon: COMMENT,
    active: false,
    role: "user_company",
  },
  {
    title: "menu.roles",
    path: "/roles/list",
    key: "roles",
    icon: MANAGE_ROSES,
    active: false,
    role: "roles",
  },
  {
    title: "menu.api_key",
    path: "/personal_access_keys/list",
    key: "personal_access_keys",
    icon: API_KEY,
    active: false,
    role: "personal_access_keys",
  },
  {
    title: "menu.admin",
    path: "/list_admins",
    key: "admin",
    icon: ADMIN,
    active: false,
    role: "user"
  }
];
