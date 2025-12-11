import prisma from '../lib/prisma.ts';
import { siteReviews } from './site-reviews.seed.ts';
import { products } from './product-seed';
import { users } from './users-seed';
import bcrypt from 'bcryptjs';

async function seedDatabase(){

    await prisma.siteReview.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const usersWithHashedPassword= users.map(user =>({
        ...user,
        password : bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    }))

    await prisma.siteReview.createMany({
        data: siteReviews
    })

    await prisma.product.createMany({
        data: products
    })
    await prisma.user.createMany({
        data: usersWithHashedPassword,
    })

    console.log("Semilla ejecutada correctamente")
    
}

seedDatabase();