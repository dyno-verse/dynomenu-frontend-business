import HttpFactory from "~/repository/factory";
import {IBusinessInfo, IMenu} from "~/repository/models/ApiResponse";
import {IMenuDetail} from "~/repository/models/ApiResponse";
import {IApiResponse} from "~/repository/models/appData";

class MenuModule extends HttpFactory {
    private RESOURCE = '/menu';

    // 'https://api.dynomenu.com/menu/ab7c92d5-1a13-4012-a57a-99e9cb465d83/detailed' \


    // async getBusinessInfoBySlug(slug: string): Promise<IBusinessInfo> {
    //     return await this.call<IBusinessInfo>('GET', `${this.RESOURCE}/${slug}`)
    // }

    async getMenusByBusinessId(id: string) {
        return await this.call<IMenu>('GET', `${this.RESOURCE}/${id}`)
    }

    async getMenusDetailsById(id: string): Promise<IApiResponse<IMenuDetail>> {
        return await this.call<IApiResponse<IMenuDetail>>('GET', `${this.RESOURCE}/${id}/detailed`)
    }

}

export default MenuModule;
