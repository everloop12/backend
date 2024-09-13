// import { PrismaClient } from '@prisma/client';
// import { UserService } from './src/user/user.service'; // Adjust this import based on your actual project structure

// async function testGetUserData() {
//     console.time('getUserData Execution Time');

//     // Initialize PrismaClient
//     const prisma = new PrismaClient();

//     // Initialize the UserService with PrismaClient
//     const userService = new UserService(prisma);

//     try {
//         console.log('Starting getUserData test...');

//         // Replace 'user_id_here' with an actual user ID from your database
//         const result = await userService.getUserData('64c93e44893d937b28f1da01');

//         console.log('Result:', result);
//     } catch (error) {
//         console.error('Error during getUserData:', error);
//     } finally {
//         console.timeEnd('getUserData Execution Time');

//         // Disconnect PrismaClient after the execution
//         await prisma.$disconnect();

//         console.log('PrismaClient disconnected.');
//     }
// }

// testGetUserData();
