<template>
  <div>

    <div v-if="!isPending">
      <div class="flex flex-row justify-between">
        <Breadcrumb :pages="pages"/>

        <div class="flex flex-wrap justify-around space-x-2">
          <Button :type="ButtonTypes.Secondary" :label="'Add New Item'" data-modal-target="categoryModal"
                  data-modal-toggle="categoryModal" @click="itemModal.show()"/>
          <Button :type="ButtonTypes.Primary" :label="'Add Category'" data-modal-target="categoryModal"
                  data-modal-toggle="categoryModal" @click="modal.show()"/>
        </div>

      </div>
      <div class="flex flex-row justify-start space-x-2 items-center">
        <h1 class="font-bold text-4xl my-5">{{ menusDetails.name }}</h1>
        <button class="cursor-pointer" @click="openEditModal()">
          <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"/>
          </svg>
        </button>
      </div>

      <div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center items-center" id="default-tab"
              data-tabs-toggle="#default-tab-content" role="tablist"
              data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500">
            <li>
              <button>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10"/>
                </svg>
              </button>
            </li>
            <li role="presentation" v-if="menusDetails.items.length !== 0">
              <button
                  @click="getDetailedMenu(menuId)"
                  class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts"
                  aria-selected="true">Uncategorized
              </button>
            </li>

            <li class="me-2" role="presentation" v-for="category in menusDetails.categories">
              <button @click="getItemsByCategory(category.id)" class="inline-block p-4 border-b-2 rounded-t-lg"
                      :id="`tab-${category.id}`"
                      :data-tabs-target="`#tab-${category.id}`"
                      :class="[ isSelectedCategoryId(category.id) ? 'text-red-500 border-red-500' : '']"
                      type="button" role="tab" :aria-controls="`tab-${category.id}`" aria-selected="true">
                {{ category.name }}
              </button>
            </li>

          </ul>
        </div>
        <div id="default-tab-content">
          <div class="px-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
               aria-labelledby="profile-tab" v-if="!iscCategoryItemsLoading">

            <div class="flex flex-wrap w-full">
              <div v-if="categoryItems.items.length !== 0"
                   class="bg-white border-gray-700 border-2  p-6 rounded-lg w-1/5 flex flex-col items-center mx-1 my-1 cursor-pointer"
                   v-for="(item,index) in categoryItems.items" @click="viewItem(item, index)">

                <div
                    class="relative  inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-900 rounded-full dark:bg-gray-600">
                  <span class="font-medium text-gray-100 dark:text-gray-300">JL</span>
                </div>
                <p class="text-center text-black text-lg">{{ item.name }}</p>
                <h5 class="text-center text-black text-sm  font-extrabold">GHS {{ item.price }}</h5>
              </div>
              <EmptyState v-else/>
            </div>
          </div>
          <div class="w-full h-full py-48" v-else>
            <Loader/>
          </div>
        </div>
      </div>

    </div>
    <div class="w-full h-full py-48" v-else>
      <Loader/>
    </div>


    <!-- Main modal -->
    <div id="category" ref="categoryModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Category
            </h3>
            <button type="button"
                    @click="modal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="categoryModal">
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
                       v-model="addCategoryData.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>

              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="addCategoryData.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>
            </div>
            <button
                @click="addCategory()"
                class="text-white inline-flex items-center bg-red-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Add new category
            </button>
          </div>
        </div>
      </div>
    </div>


    <!---->
    <!-- Main modal -->
    <div id="item" ref="addItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Create New Item
            </h3>
            <button type="button"
                    @click="itemModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
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
                       v-model="addItem.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>
              <div class="grid grid-cols-2 col-span-6 gap-x-2">
                <div>
                  <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="text" name="price" id="price"
                         v-model="addItem.price"
                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                         placeholder="GHs 2.37" required="">
                </div>
                <div>
                  <label for="countries"
                         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select id="countries"
                          v-model="selectedCategoryId"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option :selected="selectedCategoryId === category.id" selected
                            v-for="category in menusDetails.categories" :value="category.id">{{ category.name }}
                    </option>
                  </select>

                </div>
              </div>
              <div class="col-span-6">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="addItem.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>
            </div>
            <button
                @click="createCategoryItem()"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"></path>
              </svg>
              Add new item
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Item Edit modal -->
    <div id="item" ref="editItemModal" tabindex="-1" aria-hidden="true"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Item
            </h3>
            <button type="button"
                    @click="itemEditModal.hide()"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
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
                       v-model="editItem.name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Type product name" required="">
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="text" name="price" id="price"
                       v-model="editItem.price"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="20.00" required="">
              </div>
              <div class="col-span-2">
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item
                  Description</label>
                <textarea id="description" rows="4"
                          v-model="editItem.description"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write product description here"></textarea>
              </div>
            </div>
            <div class="flex justify-between">
              <button
                  @click="updateItem(editItem.id)"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd"></path>
                </svg>
                Edit item
              </button>

              <button type="button"
                      @click="deleteItem(editItem.id)"
                      class="text-white bg-gray-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                <span class="sr-only">Icon description</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!--Edit menu modal-->
    <div id="popup-modal" tabindex="-1" ref="editMenuModalId"
         class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button type="button"
                  @click="editItemModal.hide()"
                  class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">

            <div class="flex flex-col justify-start text-start">
              <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" v-model="menusDetails.name" id="email"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="name@flowbite.com" required/>
              </div>

              <div class="mb-5">
                <label for="email"
                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea v-model="menusDetails.description" id="email"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder=""></textarea>
              </div>
            </div>
            <button data-modal-hide="popup-modal" type="button"
                    @click="updateMenu()"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Save
            </button>
            <button type="button"
                    @click="editItemModal.hide()"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ButtonTypes} from "~/components/Constants";
import Button from "../components/units/Button.vue";
import Breadcrumb from "../components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "#build/components/units/Breadcrumb.vue";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {ICategoryItems} from "~/repository/models/ApiResponse";
import {ICreateCategory} from "~/repository/models/inputModels";
import {initModals, Modal, ModalOptions} from "flowbite";
import {ICreateCategoryItem} from "~/repository/models/inputModels";
import EmptyState from "~/components/EmptyState.vue";
import Loader from "~/components/units/Loader.vue";
import {ICreateMenu} from "~/repository/models/inputModels";
import {Iitem} from "~/repository/models/ApiResponse";
import item from "~/repository/modules/item";

const route = useRoute();
const {$api} = useNuxtApp();
const modal = ref({});
const itemModal = ref({});
const itemEditModal = ref({})
const editMenuModal = ref({})
const snackbar = useSnackbar();


const brandId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'

const menuId = ref("");
const selectedCategoryId = ref("");
const addCategoryData = ref({} as ICreateCategory)
const addItem = ref({} as ICreateCategoryItem)
const editItem = ref({} as ICreateCategoryItem)

const isPending = ref(true);
const iscCategoryItemsLoading = ref(true);
const categoryModal = ref(null);
const editItemModal = ref(null);
const addItemModal = ref(null);
const editMenuModalId = ref(null)
const menusDetails = ref({} as IMenuDetail);
const categoryItems = ref({} as ICategoryItems);


definePageMeta({
  layout: "main",
});


onMounted(() => {
  initModals();

  menuId.value = route.params.id.toString();

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  modal.value = new Modal(categoryModal.value, options);
  itemModal.value = new Modal(addItemModal.value, options)
  getDetailedMenu(menuId.value);
})

const openEditModal = () => {
  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };

  editMenuModal.value = new Modal(editMenuModalId.value, options)
  editMenuModal.value.show()
}

const getDetailedMenu = (menuId: string, categoryId?: string) => {
  $api.menu.getMenusDetailsById(menuId).then(data => {
    menusDetails.value = data.data;
    isPending.value = false;

    if (categoryId) {
      getItemsByCategory(categoryId)
    } else {
      if (menusDetails.value.items.length !== 0) {
        iscCategoryItemsLoading.value = false;
        categoryItems.value.items = menusDetails.value.items
      } else {
        if (menusDetails.value.categories.length !== 0) {
          selectedCategoryId.value = menusDetails.value.categories[0].id
          getItemsByCategory(selectedCategoryId.value)
        } else {
          iscCategoryItemsLoading.value = false;
          categoryItems.value.items = []
        }

      }
    }

    pages.push(
        {
          name: menusDetails.value.name,
          link: '',
          isActive: false
        } as BreadCrumbNav
    )

  }).catch(error => {
    isPending.value = false;

  })
}

const viewItem = (item: ICreateCategoryItem, position: number) => {
  editItem.value.id = item.id
  editItem.value.name = item.name
  editItem.value.price = item.price
  editItem.value.description = item.description
  editItem.value.position = position

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: true
  };
  itemEditModal.value = new Modal(editItemModal.value, options);

  itemEditModal.value.show();
}

const addCategory = () => {
  createCategory()
}

const createCategory = () => {
  modal.value.hide()
  const request: ICreateCategory = {
    name: addCategoryData.value.name,
    description: addCategoryData.value.description,
    branchId: brandId
  }
  $api.menu.createCategoryUnderMenu(request, menuId.value).then(data => {
    getDetailedMenu(menuId.value, selectedCategoryId.value);
  }).catch(error => {
    console.log(error.data)
  })
}

const isSelectedCategoryId = (cat: string) => {
  return cat === selectedCategoryId.value
}

const createCategoryItem = () => {
  itemModal.value.hide()
  const request: ICreateCategoryItem = {
    id: addItem.value.id,
    name: addItem.value.name,
    description: addItem.value.description,
    position: 0,
    price: addItem.value.price,
    ingredients: [],
    branchId: brandId
  }
  $api.menuCategory.addItem(selectedCategoryId.value, request).then(data => {
    getDetailedMenu(menuId.value, selectedCategoryId.value);
  }).catch(error => {

  })
}

const updateItem = (itemId: string) => {
  const request: Iitem = {
    name: editItem.value.name,
    description: editItem.value.description,
    price: Number(editItem.value.price),
    ingredients: [],
    id: itemId
  }

  $api.item.updateItem(itemId, request).then(data => {
    itemEditModal.value.hide()
    const item = categoryItems.value.items[editItem.value.position]

    item.name = data.data.name
    item.price = data.data.price
    item.color = data.data.color
    item.ingredients = data.data.ingredients
    item.description = data.data.description

    snackbar.add({
      type: 'success',
      text: 'Item updated'
    })
  }).catch(error => {
  })

}

const deleteItem = (itemId: string) => {
  itemEditModal.value.hide()// close dialog
  $api.item.deleteItem(itemId).then(data => {
    snackbar.add({
      type: 'success',
      text: 'Item deleted'
    })
    categoryItems.value.items.splice(editItem.value.position, 1)
  }).catch(error => {

  })
}


const updateMenu = () => {
  const request: ICreateMenu = {
    name: menusDetails.value.name,
    description: menusDetails.value.description,
    branchId: brandId
  }

  $api.menu.updateMenu(menuId.value, request).then(data => {
    editMenuModal.value.hide()
    snackbar.add({
      type: 'success',
      text: 'Menu updated'
    })
  }).catch(error => {

  })
}

const getItemsByCategory = (categoryId: string) => {
  selectedCategoryId.value = categoryId
  iscCategoryItemsLoading.value = true
  // categoryItems.value.items = []

  $api.menuCategory.getItemsUnderCategories(selectedCategoryId.value).then(data => {
    categoryItems.value = data.data;
    iscCategoryItemsLoading.value = false;
  }).catch(error => {
    iscCategoryItemsLoading.value = false;
  });
}

const pages = [
  {
    name: 'Menu',
    link: '/dashboard/menu/',
    isActive: true
  } as BreadCrumbNav
]

</script>

<style scoped>

</style>
