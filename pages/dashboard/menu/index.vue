<template>
  <div>
    <div class="flex flex-row justify-between">
      <Breadcrumb :pages="pages"/>
      <Button :type="ButtonTypes.Primary" :label="'Add Menu'" data-modal-target="crudModal"
              data-modal-toggle="crudModal" @click="modal.show()"/>
    </div>

    <div class="w-full py-10">
      <div class="flex flex-row flex-wrap space-x-4" v-if="!isPending">
        <NuxtLink :to="`/dashboard/menu/${menu.id}`" v-for="menu in menus">
          <div class="bg-white border-2 border-red-600 shadow-lg rounded-lg p-5">
            <div class="flex flex-row justify-between space-x-2">
              <div>
                <h4 class="font-bold text-2xl">{{ menu.name }}</h4>
                <p>{{ menu.description }}</p>
              </div>

              <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 4 15">
                  <path
                      d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                </svg>
              </button>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!------>
    <!-- Main modal -->
    <div id="crudModal" ref="crudModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Menu
            </h3>
            <button type="button"
                    @click="modal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crudModal">
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
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name"
                       v-model="newMenu.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>

              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="newMenu.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>
            </div>
            <button @click="addMenu()"
                    class="text-white inline-flex items-center bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Add new menu
            </button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import {initFlowbite, initModals, Modal, ModalOptions} from "flowbite";

definePageMeta({
  layout: "main",
});

import Breadcrumb from "../components/units/Breadcrumb.vue";
import Button from "../components/units/Button.vue";
import {ButtonTypes} from "~/components/Constants";
import {BreadCrumbNav} from "#build/components/units/Breadcrumb.vue";
import {ICreateMenu} from "~/repository/models/inputModels";

const {$api} = useNuxtApp();
const newMenu = ref({} as ICreateMenu);
const menus = ref([]);
const modal = ref({});
const isPending = ref(true);
const crudModal = ref(null);

const pages = [
  {
    name: 'Menu',
    link: '/dashboard/menu/',
    isActive: true
  } as BreadCrumbNav,
  {
    name: 'Id',
    link: '',
    isActive: false
  } as BreadCrumbNav
]

const getBusinessBySlug = (slug: string) => {
  isPending.value = false;
  $api.business.getBusinessInfoById(slug).then(data => {
    console.log(data.data);
    menus.value = data.data.branches[0].menu;
    isPending.value = false;

  }).catch(error => {
    console.log(error.data)
    isPending.value = false;

  })
}

const addMenu = () => {
  modal.value.hide()
  const request: ICreateMenu = {
    name: newMenu.value.name,
    description: newMenu.value.description,
    branchId: '6f8a8a7c-c45e-45a6-8a1a-ef6dd03baf28'
  }
  //
  $api.menu.create(request).then(data => {
    console.log(data);
    getBusinessBySlug("silmo-restaurant")
  }).catch(error => {
    console.log(error.data);
  })
}

onMounted(() => {
  // initModals();

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  // if (crudModal.value !== null) {
  modal.value = new Modal(crudModal.value, options);
  // }
  // modal.value.show();


  getBusinessBySlug("silmo-restaurant")
})


// const


</script>

<style scoped>

</style>
