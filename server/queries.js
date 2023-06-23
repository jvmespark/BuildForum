const Pool = require('pg').Pool
const env = require('./env')
const pool = new Pool({
  user: env.user,
  host: env.host,
  database: env.database,
  password: env.password,
  port: env.port,
})

// USER QUERIES

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

// POST QUERIES

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
const getPostById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
const createPost = (request, response) => {
    const { title, description } = request.body
  
    pool.query('INSERT INTO posts (title, description) VALUES ($1, $2) RETURNING *', [title, description], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Post added with ID: ${results.rows[0].id}`)
    })
}
const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description } = request.body
  
    pool.query(
      'UPDATE posts SET title = $1, title = $2 WHERE id = $3',
      [title, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Post modified with ID: ${id}`)
      }
    )
}
const deletePost = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Post deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
}
