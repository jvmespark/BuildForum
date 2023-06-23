// template for a post. main body, comments, etc
import React, {useState, useEffect} from 'react';
import './styles/Post.css';

import { useLocation } from 'react-router-dom'

function Post() {
    const location = useLocation();
    let id = ""
    for (let i = 6; i < location.pathname.length; i++) {
        if (location.pathname[i].toString() === "/") {
            break;
        }
        id += location.pathname[i].toString()
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostById(id);
      }, [id]);
  
    const getPostById=async(id)=> {
      try {
        const response= await fetch(`http://localhost:3001/posts/${id}`)
        const json= await response.json()
        setPosts(json)
      } catch(err) {
        console.log(err)
      }
    }

    if (posts[0]) {
        return (
            <div>
                <form action="/">
                    <input type="submit" value="Home" />
                </form>
                <div className='Post' >
                    <h1 >{posts[0].title}</h1>
                    <h3 >{posts[0].description}</h3>
                </div>
            </div>
        );
    }
}

export default Post;