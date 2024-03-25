<template>
  <div>
    <div class="flex flex-row justify-between h-14">
      <Breadcrumb :pages="pages"/>
      <Button :type="ButtonTypes.Primary" :label="'Add staff'" data-modal-target="categoryModal"
              data-modal-toggle="categoryModal" @click="modal.show()"/>
    </div>

    <div class="w-full my-10">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-if="!isPending">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3">
              Full Name
            </th>
            <th scope="col" class="px-6 py-3">
              Phone number
            </th>
            <th scope="col" class="px-6 py-3">
              Receipt name
            </th>
            <th>

            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="user in staff">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ user.fullName }}
            </th>
            <td class="px-6 py-4">
              {{ user.phoneNumber }}
            </td>
            <td class="px-6 py-4">
              {{ user.receiptName }}
            </td>
            <td>
              <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 4 15">
                  <path
                      d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
              </button>
            </td>
          </tr>
          </tbody>

        </table>
      </div>
      <div v-else>
        <Loader class="w-full h-full py-48"/>
      </div>
    </div>


    <!-- Main modal -->
    <div ref="modalId" id="authentication-modal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add Staff
            </h3>
            <button type="button"
                    @click="modal.hide()"
                    class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <div class="space-y-4">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full
                  name</label>
                <input type="text" name="email" id="email"
                       v-model="createstaff.fullName"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       placeholder=""/>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                  number</label>
                <input type="text" name="email" id="email"
                       v-model="createstaff.phoneNumber"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       placeholder="" required/>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receipt
                  name</label>
                <input type="text" name="password" id="password" placeholder=""
                       v-model="createstaff.receiptName"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                       required/>
              </div>

              <button
                  @click="createStaff()"
                  class="w-full text-white bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "~/components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "~/components/units/Breadcrumb.vue";
import Button from "~/components/units/Button.vue";
import {ButtonTypes} from "~/components/Constants";
import {Modal, ModalOptions} from "flowbite";
import {ICreateStaff} from "~/repository/models/inputModels";
import {IStaff} from "~/repository/models/inputModels";
import Loader from "~/components/units/Loader.vue";

const branchId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'

const isPending = ref(true)
const modal = ref({});
const modalId = ref(null)
const {$api} = useNuxtApp();
const snackbar = useSnackbar();
const createstaff = ref({} as ICreateStaff)
const staff = ref([])


definePageMeta({
  layout: "main",
});

onMounted(() => {
  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  modal.value = new Modal(modalId.value, options);
  getAllStaff()
})

const createStaff = () => {
  const data: ICreateStaff = {
    fullName: createstaff.value.fullName,
    phoneNumber: createstaff.value.phoneNumber,
    receiptName: createstaff.value.receiptName,
    code: generateRandomNumbers(4)
  }

  $api.staff.create(branchId, data).then(data => {
    staff.value.push(data.data)
    modal.hide()
    snackbar.add({
      type: 'success',
      text: 'Staff added'
    })
  }).catch(error => {
    console.log(error)
  })
}

const getAllStaff = () => {
  isPending.value = true
  $api.staff.getAllStaff(branchId).then(data => {
    isPending.value = false
    staff.value = data.data
  }).catch(error => {
    isPending.value = false
  })
}


function generateRandomNumbers(size: number) {
  let numb = ""
  for (let i = 0; i < size; i++) {
    numb = numb + getRandomInt(9)
  }
  return numb;
}


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}


const pages = [
  {
    name: 'Staff',
    link: '/staff/',
    isActive: true
  } as BreadCrumbNav
]

</script>

<style scoped>

</style>
