import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()
async function main() {
    // delete all data
    console.log('Cleaning up database...');
    await prisma.answer.deleteMany()
    await prisma.question.deleteMany()
    await prisma.category.deleteMany()
    await prisma.tag.deleteMany()

    const categories = [];

    // create 5 categories
    for (let i = 0; i < 5; i++) {
        console.log(`Creating category ${i}`);
        const category = await prisma.category.create({
            data: {
                name: `Category ${i}`,
            },
        });

        categories.push(category);
    }

    const tags = [];

    // create 5 categories
    for (let i = 0; i < 5; i++) {
        console.log(`Creating category ${i}`);
        const tag = await prisma.tag.create({
            data: {
                name: `Tag ${i}`,
            },
        });

        tags.push(tag);
    }

    // create 10 questions for each category
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            console.log(`Creating question ${j} for category ${i}`);
            const choices = [
                { text: faker.lorem.sentence(), isCorrect: true, index: 0 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 1 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 2 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 3 },
            ];

            // references array containing from 1 to 6 strings
            const references = [];
            const numReferences = Math.floor(Math.random() * 6) + 1;

            for (let k = 0; k < numReferences; k++) {
                references.push(faker.internet.url());
            }

            // shuffle choices
            for (let k = choices.length - 1; k > 0; k--) {
                const l = Math.floor(Math.random() * (k + 1));
                const temp = choices[k];
                choices[k] = choices[l];
                choices[l] = temp;
            }

            await prisma.question.create({
                data: {
                    question: `Question ${j}`,
                    choices: choices,
                    references: references,
                    categories: {
                        connect: [
                            { id: categories[i].id },
                        ],
                    },
                },
            });
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            console.log(`Creating question ${j} for tag ${i}`);
            const choices = [
                { text: faker.lorem.sentence(), isCorrect: true, index: 0 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 1 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 2 },
                { text: faker.lorem.sentence(), isCorrect: false, index: 3 },
            ];

            // references array containing from 1 to 6 strings
            const references = [];
            const numReferences = Math.floor(Math.random() * 6) + 1;

            for (let k = 0; k < numReferences; k++) {
                references.push(faker.internet.url());
            }

            // shuffle choices
            for (let k = choices.length - 1; k > 0; k--) {
                const l = Math.floor(Math.random() * (k + 1));
                const temp = choices[k];
                choices[k] = choices[l];
                choices[l] = temp;
            }

            await prisma.question.create({
                data: {
                    question: `Question ${j}`,
                    choices: choices,
                    references: references,
                    tags: {
                        connect: [
                            { id: tags[i].id },
                        ],
                    },
                },
            });
        }
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })