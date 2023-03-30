const db = require('../data/db-config')

async function create(hero) {
    const [id] = await db('superheros').insert(hero)
    return db('superheros').where('superhero_id', id).first()
}

function getHeros() {
    return db('superheros')
}

async function deleteHero(id) {
    const hero = await db('superheros').where('superhero_id', id).first()
    await db('superheros').where('superhero_id', id).del()
    return hero;
}

module.exports = {
    create,
    getHeros,
    deleteHero
}