<template>
  <div>
    <div class="relative mx-auto max-w-md rounded-lg bg-gray-100">
      <div class="overflow-hidden rounded-lg">
        <img class="w-full h-64 object-cover" :src="course_image" :alt="course.title" />
        <div
          class="absolute inset-0 flex items-center justify-center bg-green-800 bg-opacity-75 transition-opacity duration-300"
          v-if="hover">
          <div class="text-white text-center">
            <h2 class="font-bold text-lg">{{ course.title }}</h2>
            <p class="mt-2">{{ course.description ? course.description : '' }}</p>
            <hnr-button :text="courseTxt" :color="courseBtnColor" @hnrClickEvent="showCourse" />
          </div>
        </div>
      </div>
      <div class="p-4">
        <h2 class="font-bold text-xl text-center">{{ course.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: {
    title: string;
    description?: string;
    image?: { src: string };
    img?: string;
    url_lading_page?: string;
    slug: string;
  };
}>();

const courseTxt = 'KHÁM PHÁ NGAY';
const courseBtnColor = 'primary';

const course_image = computed(() => {
  return props.course.image && props.course.image.src ? props.course.image.src : props.course.img;
});

const showCourse = () => {
  if (props.course.url_lading_page) {
    window.location.href = props.course.url_lading_page;
  } else {
    useRouter().push({ path: '/khoa-hoc/' + props.course.slug });
  }
};
</script>

<style scoped>
.course-description {
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>