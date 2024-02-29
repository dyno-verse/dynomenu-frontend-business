export interface IBusinessInfo {
    id: string;
    name: string;
    slug: string;
    tag: string;
    primaryColor: string;
    phoneNumber: string;
    address: string;
    city: string;
    country: string;
    logo: string;
    banner: string,
    createdAt: string;
    updatedAt: string;
    branches: Branch[];
}

interface Branch {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    businessId: string;
    createdAt: string;
    updatedAt: string;
    menu: Menu[];
}

interface Menu {
    id: string;
}

export interface IMenuCategory {
    id: string
    name: string
    description: string
}

export interface IMenu {
    name: string
    description: string
    price: number
    ingredients: string[]
    imageUrl: string
}

export interface IMenuDetail {
    id: string;
    name: string;
    description: string;
    branchId: string;
    createdAt: string;
    updatedAt: string;
    items: Item[];
    categories: Category[];
}
interface Category {
    id: string;
    name: string;
    description: string;
    parentId?: any;
    createdAt: string;
    updatedAt: string;
    items: Item2[];
    children: any[];
}
interface Item2 {
    id: string;
    name: string;
    description: string;
    price: Price;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}
interface Item {
    id: string;
    name: string;
    description: string;
    price: Price;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
}
interface Price {
    s: number;
    e: number;
    d: number[];
}
