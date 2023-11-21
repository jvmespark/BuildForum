import './Wall.css';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Masonry from '@mui/lab/Masonry';

import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import configs from './configs.json'

const credentials = {
  region: configs.s3.region,
  credentials: {
    accessKeyId: configs.s3.accessKeyId,
    secretAccessKey: configs.s3.secretAccessKey
  }
};

const s3Client = new S3Client(credentials);

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

  const getServerPath = async (postid: number) => {
    return fetch(`http://localhost:3001/posts/${postid}`, {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data[0].media;
    })
  }

  const getFile = async (postid: number) => {
    var serverPath = await getServerPath(postid);
    //getUrlByFileName(serverPath, 'mimes.jpeg').then(function(data) {
    //  console.log(data);
    //  return data;
    //})
    try {
      const response = await fetch(`http://localhost:3001/media/${serverPath.replace('/','-')}`);
      console.log(response);
      return response
    } catch (err) {
      console.log(err);
    }
  };

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
        <Box sx={{ width: '100%'}}>
          <Masonry columns={3} spacing={3} sx={{ width: "auto" }}>
            {posts.map(post => (
              <div className='wallPost' key={post.id}>
                <a href={'/post/' + post.id + '/' + post.title.replace(/ /g, '_')}>
                  {/*
                  {localStorage.getItem('username') === post.username ? (
                    <Button
                      variant='contained'
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => deletePost(post.id)}
                      disableElevation
                      sx={{color:"white", position:"absolute", marginLeft:"180px"}}
                    >
                    </Button>
                    <EditIcon sx={{color:"white", position:"absolute", marginLeft:"180px"}}></EditIcon>
                  ) : (
                    <div></div>
                  )}
                  */}
                  <Chip label="event" size="small" sx={{backgroundColor:"blue"}}/>
                  <h1>{post.title}</h1>
                  <h3>{post.description}</h3>
                  <img src={getFile(post.id)} alt="post_media"></img>
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
          </Masonry>
        </Box>
      </div>
    );
  }
}

export default Wall;