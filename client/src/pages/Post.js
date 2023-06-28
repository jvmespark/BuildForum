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

    let postParent = ""
    if (posts[0]) {
        postParent = id + posts[0].title
    }

    const [comments, setComments] = useState([]);
    useEffect(() => {
        getCommentsByPost(postParent);
    }, [postParent]);

    const getCommentsByPost=async(postParent)=> {
        if (postParent !== "") {
            try {
                const response= await fetch(`http://localhost:3001/comments/get/${postParent}`)
                const json= await response.json()
                setComments(json)
            } catch(err) {
                console.log(err)
            }
        }
    }

    function CreateComment(e) {
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let comment = formJson.comment
        let postParent = id + posts[0].title
        let postername = localStorage.getItem("username")
        let date = new Date().toLocaleString()
        console.log(JSON.stringify({postParent, comment, postername, date}))
        // let supplemental materials like images and stuff = formJson.
        if (comment) {
            fetch('http://localhost:3001/comments', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({postParent, comment, postername, date}),
            })
        }
        
        document.getElementById('comment').value = ''
    }

    function deleteComment (id) {
        fetch(`http://localhost:3001/comments/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            getCommentsByPost(postParent);
          });
      }

    let username = localStorage.getItem("username")

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
                <div className="createComment">
                    {username ? 
                        <form onSubmit={CreateComment}>
                            <label>
                                    Comment as {username} <br></br>
                                    <input type="text" name="comment" id="comment"/>
                            </label>
                        </form>
                        :
                        <a href="/login">Login To Comment</a>
                    }
                </div>
                {comments[0] ? 
                    <div className="commentWall">
                        {comments.map(comment => 
                            <div className="comment">
                                <p>{comment.comment}</p>
                                <a href={'/profile/'+comment.postername}>- {comment.postername}</a>
                                <p>{comment.date}</p>
                                <button onClick={() => deleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                : 
                <p></p>
                }
            </div>
        );
    }
}
 
// delete comment option for the user <button onClick={() => deletePost(post.id)}>Delete</button>

export default Post;