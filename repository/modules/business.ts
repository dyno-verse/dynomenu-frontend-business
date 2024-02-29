import HttpFactory from "~/repository/factory";
import {IBusinessInfo} from "~/repository/models/ApiResponse";

class BusinessModule extends HttpFactory {
    private RESOURCE = 'business';

    async getBusinessInfoById(slug: string): Promise<IBusinessInfo> {
        return await this.call<IBusinessInfo>('GET', `${this.RESOURCE}/slug/${slug}`)
    }
}

export default BusinessModule;
