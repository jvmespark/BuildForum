import './Wall.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

import Masonry from '@mui/lab/Masonry';

interface Post {
  id: number;
  title: string;
  description: string;
  username: string;
}

function Wall() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const json = await response.json();
      setPosts(json);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = (id: number) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
    getPosts();
  };

  if (posts) {
    return (
      <div className='wall'>
        <Box sx={{ width: '100%', flexGrow: 1}}>
          <Grid container spacing={3} justifyContent="center">
            {posts.map(post => (
              <Grid xs={6}>
              <div className='wallPost' key={post.id}>
                <a href={'/post/' + post.id + '/' + post.title.replace(/ /g, '_')}>
                  <h1>{post.title}</h1>
                  <h3>{post.description}</h3>
                  <a href={'/profile/' + post.username} className='posterName'>
                    {post.username}
                  </a>
                </a>
                {localStorage.getItem('username') === post.username ? (
                  <div className='delete'>
                    <br></br>
                    <Button
                      variant='contained'
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => deletePost(post.id)}
                      disableElevation
                    >
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  }

    
/*
  if (posts) {
    return (
      <div className='wall'>
        {posts.map(post => (
          <div className='wallPost' key={post.id}>
            <a href={'/post/' + post.id + '/' + post.title.replace(/ /g, '_')}>
              <h1>{post.title}</h1>
              <h3>{post.description}</h3>
              <a href={'/profile/' + post.username} className='posterName'>
                {post.username}
              </a>
            </a>
            {localStorage.getItem('username') === post.username ? (
              <div className='delete'>
                <br></br>
                <Button
                  variant='contained'
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => deletePost(post.id)}
                  disableElevation
                >
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    );
  }
  */
}

export default Wall;