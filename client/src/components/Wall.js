import './Wall.css';
import React, {useState, useEffect} from 'react';

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
    // add update users later
    if (posts) {
        return (
            <div className='wall'>
                {posts.map(post => 
                    <div className='wallPost' >
                        <a href={'/post/'+post.id+'/'+post.title.replace(/ /g,"_")} key={post.id}>
                            <h1 >{post.title}</h1>
                        </a>
                        <h3 >{post.description}</h3>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </div>
                )}
            </div>
        );
    }
} 

export default Wall