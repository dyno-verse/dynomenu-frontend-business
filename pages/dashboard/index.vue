<template>
  <div>
    <div class="">
      <div class="flex flex-row justify-between h-14 mb-5">
        <Breadcrumb :pages="pages"/>
      </div>

      <div class="grid-cols-4 grid gap-4">
        <div class="h-48 bg-white border border-gray-300 rounded-lg w-full" v-for="i in 4">

        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "~/components/units/Breadcrumb.vue";

definePageMeta({
  layout: "main",
});

const pages = [
  {
    name: 'Dashboard',
    link: '/dashboard/',
    isActive: true
  } as BreadCrumbNav
]
</script>

<style scoped>

</style>
