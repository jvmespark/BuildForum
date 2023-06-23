const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
let cors = require("cors");
app.use(cors());

const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Default API response, what to put here?' })
  })

// User queries
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

// Post queries
app.get('/posts', db.getPosts)
app.get('/posts/:id', db.getPostById)
app.post('/posts', db.createPost)
app.put('/posts/:id', db.updatePost)
app.delete('/posts/:id', db.deletePost)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})