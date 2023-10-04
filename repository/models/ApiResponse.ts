export interface IBusinessInfo {
    id: string;
    name: string;
    slug: string;
    tag: string;
    logo: string;
    banner: string,
    branchId: [string]
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
