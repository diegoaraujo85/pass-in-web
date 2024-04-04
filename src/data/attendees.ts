import {faker} from '@faker-js/faker'

export const attendees = Array.from({length: 212}).map(() => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const fullName = `${firstName} ${lastName}`
  return {
    id: faker.number.int({min: 10000, max: 20000}),
    name: fullName,
    email: faker.internet.email({firstName, lastName}).toLocaleLowerCase(),
    createdAt: faker.date.recent({days: 30}),
    checkedInAt: faker.date.recent({days: 7}),
  }
})