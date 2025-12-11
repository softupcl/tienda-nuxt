import prisma from "~~/lib/prisma";
import { Product } from '../../../../shared/types/product';

export default defineEventHandler(async(event) => {

    const id = getRouterParam(event, 'id') as string;

    if(id === 'new'){
        return {
           id: 0,
           slug:'',
           name:'',
           description:'',
           price:0,
           images:[],
           tags:[],
           createdAt : new Date(),
           updatedAt : new Date(),
        } as Product;
    } 

    const product = await prisma.product.findUnique({
        where:{
            id : +id
        }
    });

    if(!product){
        throw createError({
            status: 404,
            message: `Producto no encontrado con id ${id}`
        });
    }

    return  product;

})



