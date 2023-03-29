const express = require('express')
const Hero = require('./superheroModel')

const router = express.Router()

router.get('/', (req, res) => {
    Hero.getHeros()
        .then(heros => {
            res.json(heros)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/', (req, res) => {
    Hero.create(req.body)
        .then(newHero => {
            res.status(201).json('New Hero')
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router;