const db = require('../data/db-config')

async function create(hero) {
    const [id] = await db('superheros').insert(hero)
    return db('superheros').where('superhero_id', id)
}

function getHeros() {
    return db('superheros')
}

module.exports = {
    create,
    getHeros
}