import './Wall.css';
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Wall() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      getPosts();
    }, []);
  
    const getPosts=async()=> {
      try {
        const response= await fetch('http://localhost:3001/posts')
        const json= await response.json()
        setPosts(json)
      } catch(err) {
        console.log(err)
      }
    }
    // if (owner of post) then let the delete option exist else dont reveal it
    function deletePost (id) {
      fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          getPosts();
        });
    }
    //let masterUser = localStorage.getItem("username") === post.username
    // add update users later
    if (posts) {
        return (
            <div className='wall'>
                {posts.map(post => 
                    <div className='wallPost' >
                    <a href={'/post/'+post.id+'/'+post.title.replace(/ /g,"_")}>
                        <h1 >{post.title}</h1>
                        <h3 >{post.description}</h3>
                        <a href={'/profile/'+post.username} className='posterName'>{post.username}</a>
                    </a>
                    {localStorage.getItem("username")===post.username ? 
                            <div className="delete">
                              <br></br>
                              <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => deletePost(post.id)} disableElevation>
                                Delete
                              </Button>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                )}
            </div>
        );
    }
} 

// <button onClick={() => deletePost(post.id)}>Delete</button>

export default Wall