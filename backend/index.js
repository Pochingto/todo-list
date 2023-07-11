require('dotenv').config()
const express = require('express')
const cors = require('cors')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const Item = require('./models/item')

app = express()
app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get("/api/items", (req, res, next) => {
    Item.find({})
        .then(result => res.json(result))
        .catch(error => next(error))
})

app.post("/api/item", (req, res, next) => {
    const body = req.body
    console.log(body)
    const newToDo = new Item({
        item: body.item,
        status: body.status || "todo",
        important: body.important || false
    })
    newToDo.save()
        .then(savedItem => {
            console.log(savedItem)
            res.json(savedItem)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({error:`unknown endpoint`})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(`name: ${error.name}`)
    console.error(`message: ${error.message}`)
    if (error.name === "ValidationError") {
        res.status(400).send({error: "Validation error!"})
    }

    next(error)
}

app.use(errorHandler)

const PORT = 3001 || process.env.PORT
app.listen(PORT)