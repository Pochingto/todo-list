const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log(`Connecting to ${url}`)

mongoose.connect(url)
    .then(result => {
        console.log(`Database connected successfully.`)
    })
    .catch(error => {
        console.log(`Database connection failed, error message: ${error.message}`)
    })

const itemSchema = new mongoose.Schema({
    item: {
        type: String, 
        minLength: 1, 
        required: true
    }, 
    status: String, 
    important: Boolean
})
itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        console.log('logging document: ', document, typeof(document))
        console.log('logging returnedObject', returnedObject, typeof(returnedObject))
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Item', itemSchema)