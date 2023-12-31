/*
  postgreSQL database queries
*/

const Pool = require('pg').Pool
const configs = require('./configs.json')

const pool = new Pool({
  user: configs.db.user,
  host: configs.db.host,
  database: configs.db.database,
  password: configs.db.password,
  port: configs.db.port,
})

// USER QUERIES

module.exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.createUser = (request, response) => {
    const { username, password } = request.body
  
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}
module.exports.updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { username, password } = request.body
  
    pool.query(
      'UPDATE users SET username = $1, password = $2 WHERE id = $3',
      [username, password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}
module.exports.deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

// POST QUERIES

module.exports.getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.getPostById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.createPost = (request, response) => {
    const { title, description, username, tags, serverPath } = request.body
  
    pool.query('INSERT INTO posts (title, description, username, tags, media) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, description, username, tags, serverPath], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Post added with ID: ${results.rows[0].id}`)
    })
}
module.exports.updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description, username } = request.body
  
    pool.query(
      'UPDATE posts SET title = $1, title = $2, username = $3 WHERE id = $3',
      [title, description, username, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Post modified with ID: ${id}`)
      }
    )
}
module.exports.deletePost = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM posts WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Post deleted with ID: ${id}`)
    })
}


// COMMENT QUERIES

module.exports.getComments = (request, response) => {
    pool.query('SELECT * FROM comments ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.getCommentsOnPost = (request, response) => {
    const postParent = request.params.postParent
    pool.query('SELECT * FROM comments WHERE postParent = $1 ORDER BY id ASC', [postParent], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports.getCommentById = (request, response) => {
    const id = parseInt(request.params.id)
    if (id === -1) {
        console.log("here")
    }
    else {
        pool.query('SELECT * FROM comments WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        })
    }
}
module.exports.createComment = (request, response) => {
    const { postParent, comment, postername, date } = request.body
  
    pool.query('INSERT INTO comments (postParent, comment, postername, date) VALUES ($1, $2, $3, $4) RETURNING *', [postParent, comment, postername, date], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Post added with ID: ${results.rows[0].id}`)
    })
}
module.exports.updateComment = (request, response) => {
    const id = parseInt(request.params.id)
    const { title, description } = request.body
  
    pool.query(
      'UPDATE comments SET postParent = $1, comment = $2 WHERE id = $3',
      [title, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Post modified with ID: ${id}`)
      }
    )
}
module.exports.deleteComment = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM comments WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Post deleted with ID: ${id}`)
    })
}

// PROFILE QUERIES

module.exports.getProfiles = (request, response) => {
  pool.query('SELECT * FROM profiles ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
module.exports.getProfileById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM profiles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
module.exports.createProfile = (request, response) => {
  const { username, photo, bio } = request.body

  pool.query('INSERT INTO profiles (username, photo, bio) VALUES ($1, $2, $3) RETURNING *', [username, photo, bio], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Post added with ID: ${results.rows[0].id}`)
  })
}
module.exports.updateProfile = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, photo, bio } = request.body

  pool.query(
    'UPDATE profiles SET username = $1, photo = $2, bio = $3 WHERE id = $3',
    [title, description, username, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Post modified with ID: ${id}`)
    }
  )
}
module.exports.deleteProfile = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM profiles WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Post deleted with ID: ${id}`)
  })
}
module.exports.getProfileByUsername = (request, response) => {
  const username = request.params.username
  pool.query('SELECT * FROM profiles WHERE username = $1 ORDER BY id ASC', [username], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}