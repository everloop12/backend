/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddQuestionDto, SearchQDTO, UpdateQuestionDTO } from './dto/add_question.dto';
import { QuestSevice } from 'src/quests/quest.service';
import { PaginateFunction, PaginatedResult, PaginationQueryDto, paginator } from '../prisma/paginator';
import { Question } from '@prisma/client';

// import * as fs from 'fs';
// import * as path from 'path';
// import glob from 'glob';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class QuestionService {
  constructor(readonly prisma: PrismaService, private questService: QuestSevice) { }


  // getAllTextFilesWithParentInfo(directoryPath) {
  //   const textFilesWithParentInfo = [];

  //   function traverseDirectory(currentPath) {
  //     const contents = fs.readdirSync(currentPath);

  //     contents.forEach((item) => {
  //       const itemPath = path.join(currentPath, item);
  //       const stat = fs.statSync(itemPath);

  //       if (stat.isDirectory()) {
  //         // Recursively traverse subdirectories
  //         traverseDirectory(itemPath);
  //       } else if (stat.isFile() && path.extname(itemPath).toLowerCase() === '.txt') {
  //         // Check if the file has a '.txt' extension
  //         const fileName = path.basename(itemPath);
  //         const parentFolderName = path.basename(path.dirname(itemPath));

  //         textFilesWithParentInfo.push({
  //           itemPath,
  //           fileName,
  //           parentFolderName,
  //         });
  //       }
  //     });
  //   }

  //   traverseDirectory(directoryPath);
  //   return textFilesWithParentInfo;
  // }


  // getAllAnswers = (filePath) => {
  //   const fileContent = fs.readFileSync(filePath, 'utf-8');
  //   const lines = fileContent.split(/\r?\n/);
  //   const p = lines.filter((line) => /^(The correct answer is(\r\n)?|Correct answer:(\r\n)?)/i.test(line)).map((line) => line.replace(/^(The correct answer is|Correct answer:)/i, 'Answer:')).map((x, i) => {
  //     if (x == 'Answer: ' || x == 'Answer:')
  //       console.log(x.concat(lines[i + 1]))
  //     return x == 'Answer: ' || x == 'Answer:' ? 'Answer: '.concat(lines[i + 1]) : x
  //   });
  //   const unifiedLines = lines.map((line) => line.replace(/^(The correct answer is(\r\n)?|Correct answer:(\r\n)?)/i, 'Answer:'));

  //   const allAnswers = unifiedLines
  //     .map((x, i) => {
  //       return x == 'Answer: ' || x == 'Answer:' ? 'Answer: '.concat(lines[i + 1]) : x
  //     }).map((x, i) => {
  //       return x == 'Answer: ' || x == 'Answer:' ? 'Answer: '.concat(lines[i + 2]) : x
  //     })
  //     .filter((line) => /^Answer: [A-E][\)|\.]/i.test(line))
  //     .map((line) => line[8]);

  //   return { allAnswers, p };
  // };

  // findPatternUntilQuestion = (content) => {
  //   const lines = content.split(/\r?\n/);
  //   const occurrences = [];
  //   let currentIndex = 0;

  //   while (currentIndex < lines.length) {
  //     const currentLine = lines[currentIndex].trim();

  //     if (/^\d+(\.)?\)/.test(currentLine)) {
  //       const matchedLines = [];
  //       matchedLines.push(currentLine);

  //       for (let i = currentIndex + 1; i < lines.length; i++) {
  //         const nextLine = lines[i].trim();

  //         if (fs.existsSync(nextLine) && fs.lstatSync(nextLine).isFile()) {
  //           // Check if the next line is a file
  //           break;
  //         }

  //         if (nextLine.endsWith('?')) {
  //           matchedLines.push(nextLine);
  //           occurrences.push(matchedLines.join('\n'));
  //           currentIndex = i;
  //           break;
  //         } else {
  //           matchedLines.push(nextLine);
  //         }
  //       }
  //     } else {
  //       currentIndex++;
  //     }
  //   }

  //   return occurrences;
  // };

  // // Example usage
  // getAllQuestionBodies = function (filePath) {
  //   const fileContent = fs.readFileSync(filePath, 'utf-8');
  //   const lines = fileContent.split(/\r?\n/);
  //   const allQuestionBodies = [];
  //   let currentIndex = 0;

  //   while (currentIndex < lines.length) {
  //     const { questionBodies, currentIndex: newIndex } = this.findQuestionBodies(lines.slice(currentIndex), currentIndex);
  //     allQuestionBodies.push(...questionBodies);
  //     currentIndex += newIndex + 1; // Move to the next line after the current question body
  //   }

  //   return allQuestionBodies;
  // };


  // findExplanation = (lines, currentIndex) => {
  //   let explanationFound = false;
  //   let explanationLines = [];

  //   for (let i = 0; i < lines.length; i++) {
  //     const line = lines[i];

  //     if (explanationFound) {
  //       if (/^\d+\.?\)/.test(line)) {
  //         // Stop when encountering a line starting with a question number
  //         return {
  //           explanation: explanationLines.join('\n'),
  //           linesSpanned: i,
  //         };
  //       }
  //       explanationLines.push(line.trim());
  //     } else if (line.trim().startsWith('Explanation')) {
  //       // Start collecting lines after finding "Explanation"
  //       explanationFound = true;
  //       explanationLines.push(line.trim());
  //     }
  //   }

  //   // If no question number is found, consider the explanation until the end of the file
  //   return {
  //     explanation: explanationLines.join('\n'),
  //     linesSpanned: lines.length,
  //   };
  // };

  // getAllExplanations = function (filePath) {
  //   const fileContent = fs.readFileSync(filePath, 'utf-8');
  //   const lines = fileContent.split(/\r?\n/);
  //   const allExplanations = [];
  //   let currentIndex = 0;

  //   while (currentIndex < lines.length) {
  //     const { explanation, linesSpanned } = this.findExplanation(lines.slice(currentIndex), currentIndex);
  //     if (explanation) {
  //       allExplanations.push(explanation);
  //     }

  //     // Move the current index to the next line after the current explanation
  //     currentIndex += linesSpanned;
  //   }

  //   return allExplanations;
  // };


  // findPatterns(filePath) {
  //   const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
  //   const result = [];

  //   for (let i = 0; i <= lines.length - 5; i++) {
  //     const window = lines.slice(i, i + 5).map(line => line.toLowerCase());

  //     if (
  //       window[0].trim().toLowerCase().replace('.', ')').startsWith('a)') &&
  //       window[1].trim().toLowerCase().replace('.', ')').startsWith('b)') &&
  //       window[2].trim().toLowerCase().replace('.', ')').startsWith('c)') &&
  //       window[3].trim().toLowerCase().replace('.', ')').startsWith('d)')
  //     ) {
  //       if (window[4] && window[4].trim().toLowerCase().replace('.', ')').startsWith('e)')) {
  //         result.push(window);
  //       } else {
  //         result.push(window.slice(0, 4));
  //       }
  //     }
  //     else {
  //       if (/options: A\).*B\).*C\).*D\).*E\).*$/i.test(window[0])) {
  //         const regexPattern = /options: a\)(.*?)b\)(.*?)c\)(.*?)d\)(.*?)e\)(.*?$)/i;
  //         const match = regexPattern.exec(window[0]);
  //         result.push(match.slice(1, 6));
  //         console.log(match.slice(0, 6))
  //       }
  //     }
  //   }

  //   return result;
  // }




  // async seedFiles() {
  //   const directoryPath = 'src/question/PreClinical'; // Represents the current directory of this file

  //   let files = this.getAllTextFilesWithParentInfo(directoryPath)
  //   const fileContents = files.map((file1) => {
  //     const { itemPath: filePath, fileName: file, parentFolderName } = file1;
  //     // const filePath = path.join(directoryPath, file);
  //     // const parentFolderName = path.basename(directoryPath);
  //     const inter = this.getAllAnswers(filePath);
  //     const LcorrectAnswer = inter.allAnswers
  //     const Lanswers = this.findPatterns(filePath);
  //     const Lexplanations = this.getAllExplanations(filePath);
  //     // const LQuestions = this.findPatternUntilQuestion(filePath)
  //     const content = "999.)" + fs.readFileSync(filePath, 'utf-8') + '\n 999.)';
  //     // console.log(file)
  //     const text = content
  //     // Use regular expressions to find questions
  //     // const questionPattern = /(\d+\.)\)([\s\S]*?)(?=References:|$)/g;
  //     // const questionRegex = /(\d+\.)\)([\s\S]*?)(?=References:|$|\d+\))/g;
  //     const questionRegex = /(\d+\.\))([\s\S]*?)[A|a]\)/g;
  //     const answerRegex = /\nA\)([\s\S]*?)Explanation:/g;
  //     const refregex = /Explanation:\s*([\s\S]*?)(?=\d+\.\)|\Z)/g;

  //     const questions = [];
  //     let match;

  //     const matches = [];
  //     let matchr;
  //     let matcha;

  //     while ((matchr = refregex.exec(text)) !== null && (match = questionRegex.exec(text)) !== null) {
  //       const referenceText = matchr[1].trim();

  //       const questionNumber = match[1].trim();
  //       const questionText = match[2].trim();
  //       // const answers = matcha[1].trim();
  //       const separator = /[A-E]\)/g;

  //       const correctregex = /correct answer is ([A-E])\)/g;
  //       const correctAnswerMatch = correctregex.exec(referenceText)

  //       // const answerlist = answers.split(separator).map(x => x.trim()).filter(x => !x.includes('.)') && !x.includes('\r') && x !== "" && !x.includes('\n'))

  //       const charToNumber = {
  //         'A': 1,
  //         'B': 2,
  //         'C': 3,
  //         'D': 4,
  //         'E': 5,
  //       };
  //       matches.push({
  //         // choices: answerlist.map((singleAnswer, i) => ({
  //         //   text: singleAnswer,
  //         //   isCorrect: charToNumber[correctAnswerMatch?.[1] || 'A'] === i + 1,
  //         //   index: i
  //         // })),
  //         question: questionText, references: [referenceText]
  //       });
  //     }
  //     const maped = { 'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, }
  //     // dot, lowercase, newline
  //     return {
  //       name: file.replace(/\.txt$/, ''), parentDirectory: parentFolderName, filePath, questionCount: matches.length,
  //       // linesOfinterest: inter.p,
  //       answersCount: Lanswers.length, CorrectAnswerCount: LcorrectAnswer.length, expCount: Lexplanations.length,
  //       LcorrectAnswer: LcorrectAnswer.map((x, i) => String(i) + ' ' + x),
  //       questions: matches
  //         .map(x => x.question),
  //       // .map((y, i) => String(i) + ' ' + y.question.substring(0, 100)),
  //       // answers: Lanswers.map((x, i) => String(i) + x)
  //       answers: Lanswers.map((x, xi) => x.map((y, i) => ({
  //         text: y.substring(2)
  //         , isCorrect: maped[LcorrectAnswer[xi].toUpperCase()] == i + 1
  //         , index: i
  //       })))

  //       , explanations: Lexplanations.map((x) => x.replace(/Explanation:/g, ''))
  //       // // .map((y, i) => String(i) + ' ' + y)
  //       , correctAnswer: LcorrectAnswer.map((x) => maped[x.toUpperCase()])

  //     };
  //   });

  //   const created = { 'x': 0 }
  //   const createdTags = { 'y': 0 }
  //   // let t = await this.prisma.question.deleteMany({})
  //   // let g = await this.prisma.category.deleteMany({})
  //   // let c = await this.prisma.tag.deleteMany({})

  //   const tags = [...new Set(fileContents.map((e) => e.name))];
  //   const cats = [...new Set(fileContents.map((e) => e.parentDirectory))];



  //   const tagNames = tags.map((e) => ({ name: e }))
  //   const catNames = cats.map((e) => ({ name: e }))

  //   const duplicateTags = tags.filter((tag, index) => tags.indexOf(tag) !== index);
  //   const duplicateCats = cats.filter((cat, index) => cats.indexOf(cat) !== index);

  //   console.log("Duplicate tags:", duplicateTags);
  //   console.log("Duplicate cats:", duplicateCats);

  //   await this.prisma.tag.createMany({
  //     data: tagNames
  //   })

  //   await this.prisma.category.createMany({
  //     data: catNames
  //   }).then(() => console.log('created cats'))


  //   const categoryDict = await this.prisma.category.findMany({ select: { id: true, name: true } })
  //   const tagDict = await this.prisma.tag.findMany({})
  //   for (const e of fileContents) {


  //     const category = categoryDict.find((x) => x.name === e.parentDirectory)
  //     const tag = tagDict.find((x) => x.name === e.name) //uncomment

  //     const modQ = e.questions.map((question, i) => ({
  //       question: question,
  //       choices: e.answers[i],
  //       // correctAnswer: e.correctAnswer[i],
  //       references: e.explanations[i],
  //       categoryIds: [category.id],
  //       tagIds: [tag.id] //uncomment
  //     }))

  //     const qlist = e.questions

  //     const questions = await this.prisma.question.createMany({
  //       data: modQ
  //     }).then(() => console.log('created questions'))

  //     console.log('starting ', e.name)

  //     const qres = await this.prisma.question.findMany({
  //       where: {
  //         question: {
  //           in: qlist
  //         }
  //       }
  //     })
  //     const TquestionsIds = qres.map((q) => q.id)
  //     const CquestionsIds = qres.map((q) => q.id)


  //     const catQuestionIds = await this.prisma.category.findFirst({
  //       where: {
  //         id: category.id
  //       },
  //       select: {
  //         questionIDs: true
  //       }
  //     })


  //     const tagQuestionIds = await this.prisma.tag.findFirst({ //uncomment this block
  //       where: {
  //         id: tag.id
  //       },
  //       select: {
  //         questionIDs: true
  //       }
  //     })
  //     TquestionsIds.push(...tagQuestionIds.questionIDs)
  //     CquestionsIds.push(...catQuestionIds.questionIDs)

  //     await this.prisma.category.update({
  //       where: {
  //         id: category.id
  //       },
  //       data: {
  //         questionIDs: CquestionsIds
  //       }
  //     })

  //     // uncomment this block
  //     await this.prisma.tag.update({
  //       where: {
  //         id: tag.id
  //       },
  //       data: {
  //         questionIDs: TquestionsIds
  //       }
  //     })

  //   }

  //   return fileContents
  //     .filter(x => !(x["questionCount"] == x["answersCount"] && x["answersCount"] == x["CorrectAnswerCount"] && x["CorrectAnswerCount"] == x["expCount"]));
  // }

  async getQuestionById(id: string) {
    return await this.prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
  }

  async getQuestionsByCategory(categoryId: string) {
    const questions = await this.prisma.question.findMany({
      select: {
        choices: {
          select: {
            text: true,
          },
        },
      },
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
    });

    // shuffle choices
    questions.forEach(question => {
      question.choices = this.shuffleArray(question.choices);
    });

    return questions;
  }

  async updateQuestion(id: string, dto: UpdateQuestionDTO) {
    const { id: dummyId, ...rest } = dto;
    return await this.prisma.question.update({
      where: {
        id: id
      },
      data: {
        ...rest,
        choices: [...rest.choices.map(choice => ({ ...choice }))],
      }
    })
  }


  async deleteQuestions(ids: string[]) {
    return await this.prisma.question.deleteMany({
      where: {
        id: {
          in: ids,
        }
      }
    })
  }

  async deleteAll() {
    return this.prisma.question.deleteMany()
  }

  async getQuestionsByMultCategory(paginationDto: PaginationQueryDto, uid: string, categories: string[], tags: string[], revision?: boolean, history?: boolean, pageNumber?: number) {
    let questions: any;
    const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } })
    let premium = false;

    if (!date.lastPackageExpiry)
      premium = false
    else
      premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime()


    if (categories.length > 0 || tags.length > 0)
      questions = await this.prisma.question.findMany(
        {
          where: {
            categoryIds: categories.length === 0 ? undefined : {
              hasSome: categories
            },
            categories: premium ? {
              none: {
                name: {
                  contains: "trial"
                }
              }
            } : {
              some: {
                name: {
                  contains: "trial"
                }
              }
            },
            tagIds: tags.length === 0 ? undefined : {
              hasSome: tags
            },
            answers: !(revision || history) ? {
              none: {
                userId: uid,
                deleted: false
              }
            } : {
              some: {
                userId: uid,
                deleted: history ? undefined : false,
                isCorrect: history ? undefined : false
              }
            }
          },
          include: revision ? undefined : {
            answers: {
              where: {
                userId: uid,
                deleted: false,
              }
            },
            Comments: true,
            Reports: true,
            _count: {

            }
          },
          take: 30,
          skip: pageNumber * 30,
        })
    else
      questions = await this.prisma.question.findMany(
        {
          where: {
            categories: premium ? {
              none: {
                name: {
                  contains: "trial"
                }
              }
            } : {
              some: {
                name: {
                  contains: "trial"
                }
              }
            },
            answers: !(revision || history) ? {
              none: {
                userId: uid,
                deleted: false
              }
            } : {
              some: {
                userId: uid,
                deleted: history ? undefined : false,
                isCorrect: history ? undefined : false
              }
            }
          },
          include: revision ? undefined : {
            answers: {
              where: {
                userId: uid,
                deleted: false,
              }
            },
            Comments: true,
            Reports: true,
          },
          take: 30,
          skip: pageNumber * 30,
        })

    const statistics = await this.prisma.question.findMany({
      where:{
        id:{
          in: questions.map((q) => q.id)
        }
      },
      select: {
        id: true,
        answers: {
          where: {
            deleted: false
          },
          select: {
            user: {
              select: {
                country: true,
                university: true
              }
            }
          }
          // include: {
          //   user: {
          //     select: {
          //       country: true,
          //       university: true
          //     }
          //   }
          // }
        }
      },
    })


    this.questService.progressQuests("EXAM", uid)
    return { questions: questions, stats: statistics };
  }

  async getSaidQuestion(id: string) {
    if (id == 'none')
      return { status: 200, success: true }
    else
      return await this.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
          tags: true,
        },
      });
  }


  async getQuestions(search: SearchQDTO, pagen: number) {
    // const { page, perPage } = paginationQuery
    const page = pagen || 1;
    const perPage = 50;
    const skip = (page - 1) * perPage
    console.log('perPage', perPage)
    console.log('skip', skip)

    console.log('search', search)

    return await this.prisma.question.findMany({
      // TODO: make the search query will be more detailed and will be AND instead of an OR
      where: {
        question: !search.text ? undefined : {
          contains: search.text,
          mode: 'insensitive'
        },
        categories: !search.categories ? undefined : {
          some: {
            id: search.categories
          }

        },
        tags: !search.tags ? undefined : {
          some: {
            id: search.tags
          }
        },
      },
      include: {
        _count: {
          select: {
            Comments: true,
            Reports: true
          },
        },
        Comments: true,
        Reports: true,
        categories: true,
        tags: true,
      },
      orderBy: {
        Reports: {
          _count: 'desc'
        }
      },
      skip: skip,
      take: perPage,
    });
  }


  async initQuests() {
    await this.prisma.quest.deleteMany({})
    const users = await this.prisma.user.findMany({})
    for (const user of users) {
      await this.questService.initializeUserQuests(user.id)
    }
  }

  async getUserData(uid: string) {

    const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } })
    let premium = false;

    if (!date.lastPackageExpiry)
      premium = false
    else
      premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime()


    const statistics = await this.prisma.question.findMany({
      select: {
        id: true,
        answers: {
          where: {
            deleted: false,
            question: {
              categories: premium ? {
                none: {
                  name: {
                    contains: "trial"
                  }
                }
              } : {
                some: {
                  name: {
                    contains: "trial"
                  }
                }
              }
            }
          },
          select: {
            user: {
              select: {
                country: true,
                university: true
              }
            }
          }
        }
      },
    })
    const questions = await this.prisma.question.findMany({
      where: {
        categories: premium ? {
          none: {
            name: {
              contains: "trial"
            }
          }
        } : {
          some: {
            name: {
              contains: "trial"
            }
          }
        }
      },
      include: {
        answers: {
          where: {
            userId: uid,
            deleted: false,
          }
        }
      }
    })
    const tags = await this.prisma.tag.findMany({})
    const categories = await this.prisma.category.findMany({
      where: {
        name: premium ? {
          not: {
            contains: "trial"
          }
        } : {
          contains: "trial"
        }
      }
    })
    return {
      questions,
      tags,
      categories,
      stats: statistics
    }
  }

  private shuffleArray(array = []) {
    return array;
  }

  async addQuestion(dto: AddQuestionDto) {
    const { categoryIds, tagIds, choices, ...rest } = dto;
    return await this.prisma.question.create({
      data: {
        ...rest,
        categoryIds,
        tagIds,
        choices: [...choices.map(choice => ({ ...choice }))],
        categories: {
          connect: categoryIds.map(id => ({ id })),
        },
        tags: {
          connect: tagIds.map(id => ({ id })),
        }
      },

    })

  }
}
