import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu} from "~/repository/models/ApiResponse";

class MenuModule extends HttpFactory {
    private RESOURCE = '/menu/branch';

    // async getBusinessInfoBySlug(slug: string): Promise<IBusinessInfo> {
    //     return await this.call<IBusinessInfo>('GET', `${this.RESOURCE}/${slug}`)
    // }

    async getMenusByBusinessId(id: string) {
        return await this.call<IMenu>('GET', `${this.RESOURCE}/${id}`)
    }
}

export default MenuModule;
