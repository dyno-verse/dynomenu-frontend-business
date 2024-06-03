<template>
  <div
      class="w-4/5 md:w-1/2 lg:w-2/3 2xl:w-2/5 items-center  mx-auto justify-center justify-items-center align-middle mt-20">
    <Card>
      <div class="space-y-6">
        <div class="flex w-full justify-center items-center">
          <img src="../assets/imgs/logo_alt.svg" class="w-20 text-center justify-center flex align-center self-center">
        </div>

        <h1 class="text-2xl">Select Business</h1>
        <small class="text-gray-500">Choose a business you want to log in to</small>
        <div class="">
          <div @click="branchSelected(index)"
               class="bg-gray-50 border border-gray-300 rounded-lg p-3 cursor-pointer"
               v-for="(business,index) in user.businesses">
            <div class="flex flex-row justify-start space-x-4">
              <div class="h-12 w-12 bg-gray-200 rounded-lg">
              </div>

              <div>
                <p class="text-2xl">{{ business.name }}</p>

                <div class=""
                     v-for="branch in business.branches">
                  <p class="text-sm text-gray-500">{{ branch.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import {IUser} from "~/repository/models/ApiResponse";

const {$api} = useNuxtApp();
const user = ref({} as IUser)
const isPending = ref(true)

const getUser = () => {
  isPending.value = true;
  $api.user.getUser().then(data => {
    user.value = data.data
    isPending.value = false
  }).catch(error => {
    isPending.value = false
  })
}

const branchSelected = (position: number) => {
  const branch = user.value.businesses[position].branches[position];
  localStorage.setItem('branchId', branch.id);
  localStorage.setItem('branchName', branch.name);

  return navigateTo('/dashboard')

}

getUser()

</script>

<style scoped>

</style>
