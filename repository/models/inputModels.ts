export interface ICreateRequestDemo {
    fullName: string
    restaurantName: string
    phoneNumber: string
    email: string
}

{

}

export interface ICreateMenu {
    name: string
    description: string
    branchId: string
}


export interface ICreateCategory {
    name: string
    description: string
    branchId: string
}

export interface ICreateCategoryItem {
    name: string;
    description: string;
    price: number;
    ingredients: string[];
    branchId: string;
}
