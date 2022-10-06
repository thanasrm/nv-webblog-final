const { Movie } = require('../models')
module.exports = {
    // get all Movie
    async index(req, res) {
        try {
            const Movies = await Movie.findAll()
            res.send(Movies)
        } catch (err) {
            res.status(500).send({
                error: 'The Movies information was incorrect'
            })
        }
    },
    // create Movie
    async create(req, res) {
        console.log(JSON.stringify(req.body))
        try {
            const Movie = await Movie.create(req.body)
            res.send(Movie.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create Movie incorrect'
            })
        }
    },
    // edit Movie, suspend, active
    async put(req, res) {
        try {
            await Movie.update(req.body, {
                where: {
                    id: req.params.MovieId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update Movie incorrect'
            })
        }
    },
    
// delete Movie
async remove(req, res) {
        try {
            const Movie = await Movie.findOne({
                where: {
                    id: req.params.MovieId
                }
            })
            if (!Movie) {
                return res.status(403).send({
                    error: 'The Movie information was incorrect'
                })
            }
            await Movie.destroy()
            res.send(Movie)
        } catch (err) {
            res.status(500).send({
                error: 'The Movie information was incorrect'
            })
        }
    },
    // get Movie by id
    async show(req, res) {
        try {
            const Movie = await Movie.findByPk(req.params.MovieId)
            res.send(Movie)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'The Movie information was incorrect'
            })
        }
    }
}