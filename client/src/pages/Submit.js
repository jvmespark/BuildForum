// page to create a post and submit

import React, {useState, useEffect} from 'react';

function Submit() {
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
    function createPost() {
      let title = prompt('Enter title');
      let description = prompt('Enter description');
      fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          getPosts();
        });
    }
  
    return (
        <div>
            <form action="/">
                <input type="submit" value="Home" />
            </form>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}

export default Submit;