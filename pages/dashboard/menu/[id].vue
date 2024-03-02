<template>
  <div>
    <div v-if="!isPending">
      <div class="flex flex-row justify-between">
        <Breadcrumb :pages="pages"/>
        <Button :type="ButtonTypes.Primary" :label="'Add Category'"/>
      </div>
      <h1 class="font-bold text-4xl my-5">{{ menusDetails.name }}</h1>

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
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
               aria-labelledby="profile-tab" v-if="!iscCategoryItemsLoading">
            <!--            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong-->
            <!--                class="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking-->
            <!--              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to-->
            <!--              control-->
            <!--              the content visibility and styling.</p>-->

            <div class="flex flex-row space-x-2">
              <div class="bg-gray-100 p-6 rounded-lg w-1/5 flex flex-col items-center "
                   v-for="item in categoryItems.items">

                <div
                    class="relative  inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-900 rounded-full dark:bg-gray-600">
                  <span class="font-medium text-gray-100 dark:text-gray-300">JL</span>
                </div>
                <p class="text-center text-black text-lg">{{ item.name}}</p>
                <h5 class="text-center text-black text-sm  font-extrabold">GHS {{ item.price}}</h5>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <div v-else>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ButtonTypes} from "../components/Constants";
import Button from "../components/units/Button.vue";
import Breadcrumb from "../components/units/Breadcrumb.vue";
import {BreadCrumbNav} from "#build/components/units/Breadcrumb.vue";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {initTabs} from "flowbite";
import {ICategoryItems} from "~/repository/models/ApiResponse";

const route = useRoute();
const {$api} = useNuxtApp();
const menuId = ref("");
const isPending = ref(true);
const iscCategoryItemsLoading = ref(true);
const menusDetails = ref({} as IMenuDetail);
const categoryItems = ref({} as ICategoryItems);


definePageMeta({
  layout: "main",
});


onMounted(() => {
  menuId.value = route.params.id.toString();
  getDetailedMenu(menuId.value);

  initTabs();
})

const getDetailedMenu = (menuId: string) => {
  $api.menu.getMenusDetailsById(menuId).then(data => {
    menusDetails.value = data.data;
    isPending.value = false;

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

const getItemsByCategory = (categoryId: string) => {
  $api.menuCategory.getItemsUnderCategories(categoryId).then(data => {
    categoryItems.value = data.data;
    console.log(categoryItems.value);
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
