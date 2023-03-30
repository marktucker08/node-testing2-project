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

describe('test superhero model creates a new hero in the db', ()=> {
    test('add new hero successfully', async ()=> {
        const result = await Hero.create(hero1)
        const heros = await db('superheros')
        expect(heros).toHaveLength(1)
        expect(heros[0].name).toBe('Hulk')
        expect(result.superhero_id).toBe(1)
    })
    test('inserted name and age of hero', async () => {
        const hero = await Hero.create(hero2)
        expect(hero).toMatchObject({superhero_id: 1,...hero})
    })
})

describe('testing Delete endpoint', () => {
    test('Delete a hero', async ()=> {
        const [hero_id] = await db('superheros').insert(hero1)
        let heros = await db('superheros').where('superhero_id', hero_id).first()
        expect(heros).toBeTruthy()
        await request(server).delete('/api/heros/'+ hero_id)
        heros = await db('superheros').where('superhero_id', hero_id).first()
        expect(heros).toBeFalsy()
    })
    test('respond with deleted hero', async ()=> {
        await db('superheros').insert(hero1)
        let hero = await request(server).delete('/api/heros/1')
        expect(hero.body).toMatchObject(hero1)
    })
})
