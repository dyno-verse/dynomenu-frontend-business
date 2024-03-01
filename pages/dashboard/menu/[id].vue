<template>
  <div>
    <div v-if="!isPending">
      <div class="flex flex-row justify-between">
        <Breadcrumb :pages="pages"/>
        <Button :type="ButtonTypes.Primary" :label="'Add Category'" data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"/>
      </div>
      <h1 class="font-bold text-4xl my-5">{{ menusDetails.name }}</h1>

      <div>


        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab"
              data-tabs-toggle="#default-tab-content" role="tablist">
            <li role="presentation" v-if="menusDetails.items.length !== 0">
              <button
                  class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab" aria-controls="contacts"
                  aria-selected="false">Uncategorized
              </button>
            </li>

            <li class="me-2" role="presentation" v-for="category in menusDetails.categories">
              <button class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile"
                      type="button" role="tab" aria-controls="profile" aria-selected="false">{{ category.name }}
              </button>
            </li>

          </ul>
        </div>
        <div id="default-tab-content">
          <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel"
               aria-labelledby="profile-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                class="font-medium text-gray-800 dark:text-white">Profile tab's associated content</strong>. Clicking
              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control
              the content visibility and styling.</p>
          </div>
          <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel"
               aria-labelledby="dashboard-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                class="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</strong>. Clicking
              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control
              the content visibility and styling.</p>
          </div>
          <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel"
               aria-labelledby="settings-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                class="font-medium text-gray-800 dark:text-white">Settings tab's associated content</strong>. Clicking
              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control
              the content visibility and styling.</p>
          </div>
          <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="contacts" role="tabpanel"
               aria-labelledby="contacts-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content the <strong
                class="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</strong>. Clicking
              another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control
              the content visibility and styling.</p>
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

const route = useRoute();
const {$api} = useNuxtApp();
const menuId = ref("");
const isPending = ref(true);
const menusDetails = ref({} as IMenuDetail);


definePageMeta({
  layout: "main",
});


onMounted(() => {
  menuId.value = route.params.id.toString();
  getDetailedMenu(menuId.value);
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
