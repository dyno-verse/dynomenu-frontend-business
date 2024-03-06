<template>
  <div>

    <div v-if="!isPending">
      <div class="flex flex-row justify-between">
        <Breadcrumb :pages="pages"/>
        <Button :type="ButtonTypes.Primary" :label="'Add Category'" data-modal-target="categoryModal"
                data-modal-toggle="categoryModal" @click="modal.show()"/>
      </div>
      <div class="flex flex-row justify-start space-x-2 items-center">
        <h1 class="font-bold text-4xl my-5">{{ menusDetails.name }}</h1>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2"/>
        </svg>
      </div>

      <div>
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab"
              data-tabs-toggle="#default-tab-content" role="tablist"
              data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500">
            <li role="presentation" v-if="menusDetails.items.length !== 0">
              <button
                  class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts"
                  aria-selected="false">Uncategorized
              </button>
            </li>

            <li class="me-2" role="presentation" v-for="category in menusDetails.categories">
              <button @click="getItemsByCategory(category.id)" class="inline-block p-4 border-b-2 rounded-t-lg"
                      :id="`tab-${category.id}`"
                      :data-tabs-target="`#tab-${category.id}`"
                      type="button" role="tab" :aria-controls="`tab-${category.id}`" aria-selected="false">
                {{ category.name }}
              </button>
            </li>

          </ul>
        </div>
        <div id="default-tab-content">
          <div class="px-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
               aria-labelledby="profile-tab" v-if="!iscCategoryItemsLoading">
            <!--            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong-->
            <!--                class="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking-->
            <!--              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to-->
            <!--              control-->
            <!--              the content visibility and styling.</p>-->
            <div class="w-full flex flex justify-end my-4">
              <Button :type="ButtonTypes.Primary" :label="'Add New Item'" data-modal-target="categoryModal"
                      data-modal-toggle="categoryModal" @click="itemModal.show()"/>
            </div>

            <div class="flex flex-wrap w-full">
              <div class="bg-gray-100 p-6 rounded-lg w-1/4 flex flex-col items-center mx-1 my-1"
                   v-for="item in categoryItems.items" @click="viewItem(item.id)">

                <div
                    class="relative  inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-900 rounded-full dark:bg-gray-600">
                  <span class="font-medium text-gray-100 dark:text-gray-300">JL</span>
                </div>
                <p class="text-center text-black text-lg">{{ item.name }}</p>
                <h5 class="text-center text-black text-sm  font-extrabold">GHS {{ item.price }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-else>

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
              <div class="col-span-2 sm:col-span-1">
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price" id="price"
                       v-model="addItem.price"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="$2999" required="">
              </div>
              <div class="col-span-2">
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
              Add new product
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
                  <div class="col-span-2 sm:col-span-1">
                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="price" id="price"
                           v-model="addItem.price"
                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                           placeholder="$2999" required="">
                  </div>
                  <div class="col-span-2">
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
                  Add new product
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

const route = useRoute();
const {$api} = useNuxtApp();
const modal = ref({});
const itemModal = ref({});
const itemEditModal = ref({})

const brandId = '340328b2-cec0-4c5c-ba57-37a0f33dcf66'

const menuId = ref("");
const selectedCategoryId = ref("");
const addCategoryData = ref({} as ICreateCategory)
const addItem = ref({} as ICreateCategoryItem)
const isPending = ref(true);
const iscCategoryItemsLoading = ref(true);
const categoryModal = ref(null);
const editItemModal = ref(null);
const addItemModal = ref(null);
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

  // if (menusDetails.value.categories.length !== 0) {
  //   selectedCategoryId.value = menusDetails.value.categories[0].id
  getDetailedMenu(menuId.value, selectedCategoryId.value);
  // }
})

const getDetailedMenu = (menuId: string, categoryId: string) => {
  $api.menu.getMenusDetailsById(menuId).then(data => {
    menusDetails.value = data.data;
    isPending.value = false;

    getItemsByCategory(categoryId)
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

const viewItem = (itemId: string) => {
  console.log(itemId)
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

const createCategoryItem = () => {
  itemModal.value.hide()
  const request: ICreateCategoryItem = {
    name: addItem.value.name,
    description: addItem.value.description,
    price: addItem.value.price,
    ingredients: [],
    branchId: brandId
  }
  $api.menuCategory.addItem(selectedCategoryId.value, request).then(data => {
    console.log(data)
    getDetailedMenu(menuId.value, selectedCategoryId.value);
  }).catch(error => {

  })
}

const getItemsByCategory = (categoryId: string) => {
  selectedCategoryId.value = categoryId
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
