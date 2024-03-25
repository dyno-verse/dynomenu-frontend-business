<template>
  <div>
    <div class="flex flex-row justify-between h-14">
      <Breadcrumb :pages="pages"/>
      <Button :type="ButtonTypes.Primary" :label="'Save changes'" data-modal-target="categoryModal"
              data-modal-toggle="categoryModal" @click="updateBusinessInfo('72f16ef5-6b78-4504-80bd-16aef1c52b46')"/>

    </div>


    <div v-if="!isPending" class=" w-full my-4">
      <div class="flex-row flex justify-start space-x-4">
        <div class="w-3/5">
          <div class="flex flex-col">
            <div class="w-full flex flex-row justify-start w-3/5 mb-2 items-center text-center relative">
              <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload">

              <object :data="businessInfo.bannerUrl"
                      style="{object-fit: cover; height: 17rem; width: 100%;}"
                      class="object-cover z-10 text-center justify-center rounded-lg">
              </object>

              <div class="absolute top-0 right-0 flex z-30 flex-row space-x-2 m-2">
                <button class="bg-red-100 text-white py-1 px-2 rounded-lg text-sm" @click="openFileInput()">
                  <svg class="w-6 h-6 text-red-400 dark:text-white" aria-hidden="true"
                       xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                  </svg>
                </button>

                <div class="flex flex-row items-center">
                  <button class="border-gray-200 border bg-white text-gray-700 py-1 px-2 rounded-lg text-sm"
                          @click="uploadImage(businessId)">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                    </svg>

                  </button>
                </div>

              </div>


              <div
                  class="drop-shadow-lg absolute bottom-0 left-0 bg-white flex items-center rounded-full h-28 w-28 z-30 p-2 m-5 justify-start self-start mx-10">
                <img :src="businessInfo.logoUrl" class="rounded-full">

                <!--                <div class="flex flex-row items-center absolute t-">-->
                <!--                  <button class="border-gray-200 border bg-white text-gray-700 py-1 px-2 rounded-lg text-sm">-->
                <!--                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"-->
                <!--                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">-->
                <!--                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
                <!--                            d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>-->
                <!--                    </svg>-->

                <!--                  </button>-->
                <!--                </div>-->
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
        <div class="w-2/5 h-full flex flex-col space-y-4">
          <div class="bg-white border-gray-300 border  rounded-lg p-5">
            <div class="flex flex-row justify-between items-center">
              <h3>Get QR Code</h3>

              <button type="button"
                      class="text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5">
                Download
              </button>

            </div>
          </div>
          <div class="w-full bg-white border border-gray-300 rounded-lg p-5">
            <div class="flex flex-wrap flex-col">
              <div class="mb-5 w-2/3">
                <label for="email"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instagram</label>
                <input type="text"
                       v-model="businessInfo.instagramUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twitter</label>
                <input type="text"
                       v-model="businessInfo.twitterUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</label>
                <input type="text"
                       v-model="businessInfo.facebookUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       placeholder="" required/>
              </div>

              <div class="mb-5 w-2/3">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Website</label>
                <input type="text"
                       v-model="businessInfo.websiteUrl"
                       class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
const snackbar = useSnackbar()
const fileInput = ref(null)
const selectedFile = ref(null)
const businessId = '72f16ef5-6b78-4504-80bd-16aef1c52b46'

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

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];

  //Display uploaded image
  const reader = new FileReader();
  reader.onload = (e) => {
    businessInfo.value.bannerUrl = e.target.result;
  };
  reader.readAsDataURL(selectedFile.value);
};


const updateBusinessInfo = (id: string) => {
  const request: IUpdateBusiness = {
    name: businessInfo.value.name,
    tag: businessInfo.value.tag,
    twitterUrl: businessInfo.value.twitterUrl,
    instagramUrl: businessInfo.value.instagramUrl,
    facebookUrl: businessInfo.value.facebookUrl,
    websiteUrl: businessInfo.value.websiteUrl,
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

const openFileInput = () => {
  fileInput.value.click();
};

const uploadImage = async (businessId: string) => {
  if (!selectedFile.value) {
    snackbar.add({
      type: 'error',
      text: 'No file selected'
    })
    return;
  }

  const formData = new FormData();
  // formData.append('')
  formData.append('banner', selectedFile.value);

  $api.business.updateBusinessInfoWithMedia(businessId, formData).then(data => {
    // editItem.value.imageUrl = data.data.imageUrl
    // getDetailedMenu(menuId.value, selectedCategoryId.value);

    snackbar.add({
      type: 'success',
      text: 'Image uploaded'
    })
  }).catch(error => {
    console.log(error.data)
    snackbar.add({
      type: 'error',
      text: error.data.statusMessage
    })
  })

  console.log('File selected:', selectedFile.value);
};

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
