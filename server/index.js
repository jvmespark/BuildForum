const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
let cors = require("cors");
app.use(cors());

const db = require('./psql_queries')
const s3 = require('./s3_queries')

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

// Comment queries
app.get('/comments', db.getComments)
app.get('/comments/get/:postParent', db.getCommentsOnPost)
app.get('/comments/:id', db.getCommentById)
app.post('/comments', db.createComment)
app.put('/comments/:id', db.updateComment)
app.delete('/comments/:id', db.deleteComment)

// Profile queries
app.get('/profiles', db.getProfiles)
app.get('/profiles/:id', db.getProfileById)
app.get('/profiles/get/:username', db.getProfileByUsername)
app.post('/profiles', db.createProfile)
app.put('/profiles/:id', db.updateProfile)
app.delete('/profiles/:id', db.deleteProfile)

// Media queries

/*
if (title) {
    fetch('http://localhost:3001/media', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file, contentType, serverPath, filename }),
    });
}
*/
app.post('/media', async (req, res) => {
    // json file sent in as req
    const { file, contentType, serverPath, filename } = req.body;
    console.log(serverPath)
    //s3.uploadFile(file, contentType, serverPath, filename);
})

/*
const deleteMedia = (id: number) => {
    fetch(`http://localhost:3001/media/${serverPath}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
    getMedia();
  };
*/
app.delete('/media/:serverPath', async (req, res) => {
    // serverpath sent in as param 
    s3.deleteFile(req.params.serverPath);
})

app.listen(port, () => {
    console.log(`server running on port ${port}.`)
})