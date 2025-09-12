<template>
  <div class="mx-auto  bg-[#23265E]">
    <div ref="statsSection"
      class="grid grid-cols-3 md:gap-[30px] gap-[15px]  md:py-[60px] md:px-10 2xl:w-[85%] md:w-[98%] px-[10px] mx-auto title_font">
      <div class="box_count_data text-[#F56624]">
        <div class="circle"></div> <!-- Circle for category -->
        <div class="icon " >
          <img src="@/assets/images/icons/icon_backgront_countdata.svg" alt="Background color">
        </div>
        <div class="number_count">{{ animatedCategory }}<div>+</div>
        </div>
        <div class="title_data">{{ t('category.title') }}</div>
      </div>
      <div class="box_count_data text-[#FFBC16]">
        <div class="circle"></div> <!-- Circle for course -->
        <div class="icon">
          <img src="@/assets/images/icons/icon_backgront_countdata.svg" alt="Background color">
        </div>
        <div class="number_count">{{ animatedCourse }}<div>+</div>
        </div>
        <div class="title_data">{{ t('course.title') }}</div>
      </div>
      <div class="box_count_data text-[#ffffff]">
        <div class="circle"></div> <!-- Circle for user -->
        <div class="icon">
          <img src="@/assets/images/icons/icon_backgront_countdata.svg" alt="Background color">
        </div>
        <div class="number_count">{{ animatedUser }}<div>+</div>
        </div>
        <div class="title_data">{{ t('user.student') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const settingComp = useSetting();

const statsSection = ref<HTMLElement | null>(null);

const animatedCategory = ref(0);
const animatedCourse = ref(0);
const animatedUser = ref(0);

let hasAnimated = false;

function animateNumber(target: number, refValue: any, duration = 1000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    refValue.value = Math.floor(start + (target - start) * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

function startCounting() {
  if (hasAnimated) return;
  const stats = settingComp.state.learningStatisticsDetail;
  if (stats?.category) animateNumber(Number(stats.category), animatedCategory, 1200);
  if (stats?.course) animateNumber(Number(stats.course), animatedCourse, 1200);
  if (stats?.user) animateNumber(Number(stats.user), animatedUser, 1200);
  hasAnimated = true;
}

onMounted(() => {
  if (!statsSection.value) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startCounting();
    }
  }, {
    threshold: 0.8
  });

  observer.observe(statsSection.value);

  onBeforeUnmount(() => {
    observer.disconnect();
  });
});
</script>
<style scoped lang="scss">
.box_count_data {
  @apply relative py-8 rounded-[10px] text-center overflow-hidden;
  transition: transform 0.3s;
}

.icon {
  @apply absolute inset-0 translate-x-[10px] sm:translate-x-[50px] md:translate-x-0 xl:translate-x-[20px] 2xl:translate-x-[40px] 2xl:top-5 xl:top-0 top-5 w-[60px]  md:w-[170px] xl:w-full;
  z-index: 1;
  transition: transform 0.3s;
  // transform: translateX(20px); 
}

.number_count {
  @apply 2xl:text-[190px] md:text-[160px] text-[50px] flex gap-2 justify-center font-semibold leading-none relative z-10;
  position: relative;
}

.circle {
  @apply absolute inset-0 rounded-full transition-transform duration-300;
  transform: scale(0);
}

.box_count_data:hover .circle {
  transform: scale(1);
}

.box_count_data:hover .icon {
  @apply xl:translate-x-[60px] xl:-translate-y-[1px] 2xl:translate-x-[90px];
}

.title_data {
  @apply 2xl:text-[40px] xl:text-[30px] md:text-[25px] uppercase;
}

</style>
