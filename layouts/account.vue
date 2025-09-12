<template>
  <div class="content min-h-screen bg-[#ffffff]">
    <div class="header w-[100%] border-b border-[#C2C2C2] desktop">
      <Header/>
    </div>
    <div class="header w-[100%] border-b border-[#C2C2C2] mobile">
       <HeaderMobile/>
    </div>
    <div class="main-content flex flex-row w-full max-w-7xl mx-auto py-8 gap-8 px-5">
      <!-- Sidebar Account Menu -->
      <aside class="hidden lg:block w-[320px] shrink-0">
        <AccountMenu />
      </aside>
      <!-- Main Content -->
      <div class="flex-1 min-w-0 md:my-0 my-8 md:px-0 px-[10px]">
        <NuxtPage />
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/home/Header.vue";
import Footer from "@/components/home/Footer.vue";
import AccountMenu from "@/components/account/AccountMenu.vue";
import HeaderMobile from "~/components/home/HeaderMobile.vue";
</script>

<style lang="scss" scoped>
.content {
  // font-family: SVN-Gilroy;
  min-height: 100vh;
  background: #ffffff;
}
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    gap: 0;
    padding: 0;
  }
  .main-content > .hidden {
    display: none !important;
  }
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
