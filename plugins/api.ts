import {defineNuxtPlugin} from '#app';
import {$fetch, FetchOptions} from "ofetch";
import BusinessModule from "../repository/modules/business";
import MenuModule from "~/repository/modules/menu";
import MenuCategoryModule from "~/repository/modules/category";
import ItemModule from "~/repository/modules/item";
import StaffModule from "~/repository/modules/staff";
import AuthModule from "~/repository/modules/auth";


/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    business: BusinessModule,
    menuCategory: MenuCategoryModule,
    menu: MenuModule,
    item: ItemModule,
    staff: StaffModule,
    auth: AuthModule
}

export default defineNuxtPlugin(nuxtApp => {


    const fetchOptions: { headers: { Authorization: string; Accept: string }; baseURL: string } = {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMWE0NTAzZC02Mjc1LTRjMzAtYWIxMC0yZGE4MTQ4OGRmMjgiLCJlbWFpbCI6Im1heGNvZmllQGdtYWlsLmNvbSIsImlhdCI6MTcxMTMyMTc1NCwiZXhwIjoxNzQyODc5MzU0fQ.khm_Z25VGAtfQfW0vJQxiVWqNvQEWNAHgADLO9mjS_U'
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
        item: new ItemModule(apiFetcher),
        staff: new StaffModule(apiFetcher),
        auth: new AuthModule(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});
