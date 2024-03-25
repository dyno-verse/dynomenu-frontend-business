import HttpFactory from "~/repository/factory";
import {IApiResponse} from "~/repository/models/appData";
import {ICreateStaff} from "~/repository/models/inputModels";
import {IStaff} from "~/repository/models/inputModels";

class StaffModule extends HttpFactory {
    private RESOURCE = '/staff';


    async getAllStaff(branchId: string): Promise<IApiResponse<[IStaff]>> {
        return await this.call<IApiResponse<[IStaff]>>('GET', `${this.RESOURCE}/branch/${branchId}`);
    }


    async create(branchId: string, data: ICreateStaff): Promise<IApiResponse<ICreateStaff>> {
        return await this.call('POST', `${this.RESOURCE}/branch/${branchId}`, data);
    }


}

export default StaffModule;
