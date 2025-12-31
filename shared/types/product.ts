export interface Product {
    id: number,
    slug:string,
    name: string,
    description : string,
    price: number,
    images : string[],
    tags: string[]
    createdAt : Date |string | undefined,
    updatedAt: Date | string |undefined
}