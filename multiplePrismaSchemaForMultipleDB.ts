// Start using Prisma Client in Node.js (See: https://pris.ly/d/client)

// Procedure to import a new Prisma Client in Node.js

import { PrismaClient } from "./prisma/folder/for/schemaClient";
const prisma = new PrismaClient();
// Before runing a new migration, delete migrations folder to avoid problems saving new schema in db
// Command to run migration for specified schema --->  npx prisma migrate dev --schema prisma/schema2.prisma

// Procedure to import a new Prisma Client in Node.js
import { PrismaClient } from "./prisma/folder/for/schemaClientt";
const prisma = new PrismaClient();

// Command to run migration for specified schema ---> npx prisma migrate dev --schema prisma/schema1.prisma

// Create as many Prisma client according to database quantity
// Recommend to  create a client by file to avoid conflicts


// Prisma Schema 
// Note: Diferent schema by each database


// Schema 1
generator client {
    provider = "prisma-client-js"
    output   = "./clients/dbNo1-client"
  }
  
  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL")
  }

model Table {
    // data for each model according to requierments
}

 // Schema 2

generator client {
    provider = "prisma-client-js"
    output   = "./clients/dbNo2-client" // --> output for schema prisma client for the specified database related in the .env, from this folder you call the new prisma client to create the new prisma instance
  }
  
  datasource db {
    provider = "mysql"
    url      = env("DATABASE_URL_2")
  }

  model Table {
    // data for each model according to requierments
}

// Add the next script in package.json

"scripts": {
    "prisma1": "prisma studio --schema prisma/schema1.prisma --port 5555",
    "prisma2": "prisma studio --schema prisma/schema2.prisma --port 5556"
  }

  // To run in console type npm run prisma1 or prisma2

// try catch to use in connect and disconnect to database, to avoid multiple connections at the same time

try {
  prismaRafflesOneClient.$connect();
} catch (error) {
  console.error(error);
} finally {
  prismaRafflesOneClient.$disconnect();
}
 try {
    prismaRafflesTwoClient.$connect();
  } catch (error) {
    console.error(error);
  } finally {
    prismaRafflesTwoClient.$disconnect();
  }

