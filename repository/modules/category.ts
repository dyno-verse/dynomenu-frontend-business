import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu, IMenuCategory} from "~/repository/models/ApiResponse";

class MenuCategoryModule extends HttpFactory {
    private RESOURCE = '/business/';

    async getMenuCategoriesByBusinessId(id: string) {
        return await this.call<IMenuCategory>('GET', `${this.RESOURCE}/${id}`)
    }
}

export default MenuCategoryModule;
