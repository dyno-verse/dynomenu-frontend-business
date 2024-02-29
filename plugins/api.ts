import {defineNuxtPlugin} from '#app';
import {$fetch, FetchOptions} from "ofetch";
import BusinessModule from "../repository/modules/business";
// import BusinessModule from "~/repository/modules/business";
// import MenuCategoryModule from "~/repository/modules/category";
// import MenuModule from "~/repository/modules/menu";
// import RequestADemoModule from "~/repository/modules/demo";


/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    business: BusinessModule,
    // menuCategory: MenuCategoryModule,
    // menu: MenuModule,
    // demo: RequestADemoModule
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
        // menuCategory: new MenuCategoryModule(apiFetcher),
        // menu: new MenuModule(apiFetcher),
        // demo: new RequestADemoModule(apiFetcher)
    };

    return {
        provide: {
            api: modules,
        },
    };
});
