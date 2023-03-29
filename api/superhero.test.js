const request = require('supertest');
const db = require('../data/db-config')
const server = require('../server')
const Hero = require('./superheroModel')

const hero1 = { name: 'Hulk', age: 42 }
const hero2 = { name: 'Iron Man', age: 47 }


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db('superheros').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('correct env variable', () => {
    test('test env variable', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
})

