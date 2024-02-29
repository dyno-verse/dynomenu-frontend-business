<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <!--    <NuxtSnackbar/>-->
  </div>
</template>

<script lang="ts" setup>
import {initFlowbite} from "flowbite";

onMounted(() => {
  initFlowbite();
})
</script>

<style>
body {
  background-color: #F2F2F2;
  color: rgba(0, 0, 0, 1);
}

.dark body {
  background-color: #12141A;
  color: #ebf4f1;
}

.sepia body {
  background-color: #f1e7d0;
  color: #433422;
}

</style>
