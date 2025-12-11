import prisma from "~~/lib/prisma";
import { Product } from '../../../../shared/types/product';
import {z} from 'zod'

const bodySchema = z.object({
    slug: z.string().min(2),
    name: z.string().min(3),
    description: z.string().min(5),
    price : z.number().min(0),
    images:z.array(z.string()).min(0), 
    tags:z.array(z.string()).min(0), 
}); 



export default defineEventHandler(async(event) => {

    const id = getRouterParam(event, 'id') as string;
    const formData = await readMultipartFormData(event);

    if(!formData || formData.length ===0){
        throw createError({
            status: 401,
            statusMessage:'Bad request',
            message: 'No se encontro data en el body'
        });
    }

    let dataString = '';
    for(const part of formData){
        if(part.name==='data' && part.data){
            dataString = part.data.toString('utf-8');
            console.log({dataString});
        }
    }
    const body = bodySchema.safeParse(JSON.parse(dataString));
    if(!body.success){
        throw createError({
            status: 401,
            statusMessage:'Bad request',
            message: 'Revisar la data enviada',
            data:body.error 
        });
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

    const updatedProduct = await prisma.product.update({
        where:{
            id: +id
        },
        data: body.data
    })

    return {
        message : 'Producto actualizado',
        product : product,
        files: []
    }

})



