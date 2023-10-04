<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <!--    <NuxtSnackbar/>-->
  </div>
</template>

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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
