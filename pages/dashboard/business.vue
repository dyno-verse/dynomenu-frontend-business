<template>
  <div>
    <div class="flex flex-row justify-between h-14">
      <Breadcrumb :pages="pages"/>
      <Button :type="ButtonTypes.Primary" :label="'Save changes'" data-modal-target="categoryModal"
              data-modal-toggle="categoryModal" @click="updateBusinessInfo('72f16ef5-6b78-4504-80bd-16aef1c52b46')"/>

    </div>


    <div v-if="!isPending" class=" w-full my-4">
      <div class="flex-row flex justify-start">
        <div class="">
          <div class="flex flex-col">
            <div class="w-full flex flex-row justify-start w-3/5 mb-2 items-center text-center relative">

              <object :data="businessInfo.bannerUrl"
                      style="{object-fit: cover; height: 17rem; width: 100%;}"
                      class="object-cover z-10 text-center justify-center rounded-lg">
              </object>

              <div class="absolute top-0 right-0 m-5 z-30">
                <button type="button"
                        class="text-white bg-red-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  <svg class="w-6 h-6 text-red-400 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                  </svg>

                </button>
              </div>


              <div
                  class="absolute bottom-0 left-0 rounded-full h-36 w-36 z-30 p-2 m-5 justify-start self-start mx-10">
                <img :src="businessInfo.logoUrl" class="rounded-full">
              </div>

            </div>
          </div>


          <div class="flex flex-col  justify-start bg-white p-5 rounded-lg border-gray-300 border">
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input type="text" id="email"
                     v-model="businessInfo.name"
                     class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     placeholder="" required/>
            </div>
            <div class="flex flex-wrap space-x-2">
              <div class="mb-5 w-1/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input type="text" id="email"
                       v-model="businessInfo.city"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
              <div class="mb-5 w-1/2">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact
                  number</label>
                <input type="text" id="email"
                       v-model="businessInfo.phoneNumber"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
            </div>
            <div class="mb-5 w-2/3">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
              <input type="text" id="email"
                     v-model="businessInfo.address"
                     class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                     placeholder="" required/>
            </div>
            <div class="flex flex-wrap space-x-2">
              <div class="mb-5 w-1/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                <input type="text" id="email"
                       v-model="businessInfo.country"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
              <div class="mb-5 w-1/9">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Theme
                  Color</label>
                <input type="color" id="email"
                       v-model="businessInfo.primaryColor"
                       class="shadow-sm h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Loader class="w-full h-full py-48"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "~/components/units/Breadcrumb.vue";
import {ButtonTypes} from "~/components/Constants";
import Button from "~/components/units/Button.vue";
import {IBusinessInfo} from "~/repository/models/ApiResponse";
import Loader from "~/components/units/Loader.vue";
import {IUpdateBusiness} from "~/repository/models/inputModels";


const {$api} = useNuxtApp();
const businessInfo = ref({} as IBusinessInfo)
const isPending = ref(true)
const snackbar = useSnackbar();


definePageMeta({
  layout: "main",
});

onMounted(() => {
  getBusinessById('72f16ef5-6b78-4504-80bd-16aef1c52b46');
})


const getBusinessById = (id: string) => {
  isPending.value = true;
  $api.business.getBusinessInfoById(id).then(data => {
    businessInfo.value = data.data
    isPending.value = false;

  }).catch(error => {
    isPending.value = false;

  })
}


const updateBusinessInfo = (id: string) => {
  const request: IUpdateBusiness = {
    name: businessInfo.value.name,
    tag: businessInfo.value.tag,
    primaryColor: businessInfo.value.primaryColor
  }

  $api.business.updateBusinessInfoById(id, request).then(data => {
    businessInfo.value = data.data
    snackbar.add({
      type: 'success',
      text: 'Business info updated'
    })
  }).catch(error => {
  })
}

const pages = [
  {
    name: 'Business',
    link: '/dashboard/menu/',
    isActive: true
  } as BreadCrumbNav
]
</script>

<style scoped>

</style>
