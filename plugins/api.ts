import {defineNuxtPlugin} from '#app';
import {$fetch, FetchOptions} from "ofetch";
import BusinessModule from "../repository/modules/business";
import MenuModule from "~/repository/modules/menu";
import MenuCategoryModule from "~/repository/modules/category";
import ItemModule from "~/repository/modules/item";



/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    business: BusinessModule,
    menuCategory: MenuCategoryModule,
    menu: MenuModule,
    item: ItemModule
}

export default defineNuxtPlugin(nuxtApp => {


    const fetchOptions: { headers: { Authorization: string; Accept: string }; baseURL: string } = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic Y3ZiZGZqeWU1dHdmZHM6NTY3ODY3MzZ0d2VoZGdkZmdzZGY='
        },
        baseURL: "https://api.dynomenu.com",
    }

    /** create a new instance of $fetcher with custom option */
    const apiFetcher = $fetch.create(fetchOptions);

    /** an object containing all repositories we need to expose */
    const modules: IApiInstance = {
        business: new BusinessModule(apiFetcher),
        menuCategory: new MenuCategoryModule(apiFetcher),
        menu: new MenuModule(apiFetcher),
        item: new ItemModule(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});
