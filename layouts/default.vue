<template>
  <div class="content">
    <div class="header w-[100%] border-b border-[#C2C2C2] desktop">
      <Header/>
    </div>
    <div class="header w-[100%] border-b border-[#C2C2C2] mobile">
       <HeaderMobile/>
    </div>
    <div class="main-content ">
        <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Header from "@/components/home/Header.vue";
import HeaderMobile from "~/components/home/HeaderMobile.vue";

</script>

<style lang="scss" scoped>
// .content {
//   font-family: SVN-Gilroy;
// }

.main-content {
  // @apply flex;

  &__sidebar {
    transition: width 500ms;
    @apply mb-10 w-[17rem];
  }

  &__content {
    @apply w-full h-full;
  }
}

.main-content__sidebar {
  position: static;
  @apply fixed right-0 h-[100%] left-0 z-50 bg-[#FFFFFF] transition-transform duration-500 ;
}

.main-content__sidebar {
  @apply fixed right-0 h-full top-0 left-0 z-50 bg-white transition-transform duration-500 overflow-y-auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-content__sidebar::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width:1090px) {
  .mobile{
    display: none;
  }
}
@media screen and (max-width:1089px) {
  .desktop{
    display: none;
  }
}

</style>