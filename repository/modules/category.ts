import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu, IMenuCategory, ICategoryItems} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";

class MenuCategoryModule extends HttpFactory {
    private RESOURCE = '/category';

    // https://api.dynomenu.com/category/81ea466d-a1e6-4625-bea6-a29bb73c8add/detailed

    async getMenuCategoriesByBusinessId(id: string) {
        return await this.call<IMenuCategory>('GET', `${this.RESOURCE}/${id}`)
    }

    async getItemsUnderCategories(categoryId: string): Promise<IApiResponse<ICategoryItems>> {
        return await this.call<ICategoryItems>('GET', `${this.RESOURCE}/${categoryId}/detailed`)
    }
}

export default MenuCategoryModule;
