import React, { useState, useEffect } from 'react';
import './styles/Post.css';
import NavBar from '../components/NavBar';
import { TextField } from "@mui/material";
import { useLocation } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  description: string;
}

interface Comment {
  id: string;
  comment: string;
  postername: string;
  date: string;
}

function Post() {
  const location = useLocation();
  let id = "";
  for (let i = 6; i < location.pathname.length; i++) {
    if (location.pathname[i].toString() === "/") {
      break;
    }
    id += location.pathname[i].toString();
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPostById(id);
  }, [id]);

  const getPostById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${id}`);
      const json = await response.json();
      setPosts(json);
    } catch (err) {
      console.log(err);
    }
  };

  let postParent = "";
  if (posts[0]) {
    postParent = id + posts[0].title;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    getCommentsByPost(postParent);
  }, [postParent]);

  const getCommentsByPost = async (postParent: string) => {
    if (postParent !== "") {
      try {
        const response = await fetch(`http://localhost:3001/comments/get/${postParent}`);
        const json = await response.json();
        setComments(json);
      } catch (err) {
        console.log(err);
      }
    }
  };

  function CreateComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let comment = formJson.comment;
    let postParent = id + posts[0].title;
    let postername = localStorage.getItem("username");
    let date = new Date().toLocaleString();
    console.log(JSON.stringify({ postParent, comment, postername, date }));
    // let supplemental materials like images and stuff = formJson.
    if (comment) {
      fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postParent, comment, postername, date }),
      });
    }

    (document.getElementById('comment') as HTMLInputElement).value='';
  }

  function deleteComment(id: string) {
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
        getCommentsByPost(postParent);
      });
  }

  let username = localStorage.getItem("username");

  if (posts[0]) {
    return (
      <div>
        <NavBar />
        <div className='postBox'>
          <div className='Post' >
            <h1 >{posts[0].title}</h1>
            <h3 >{posts[0].description}</h3>
          </div>
          <hr className="solid"></hr>
          <div className="createComment">
            {username ?
              <form onSubmit={CreateComment}>
                Comment as <a className='createCommentUsername' href={'/profile/' + username}>{username}</a><br></br><br></br>
                <TextField name="comment" id="comment" type="text" label="" variant="filled" sx={{ width: 1 / 2 }} />
              </form>
              :
              <a href="/login" className='login'>Login To Comment</a>
            }
          </div>
          <br></br>
          {comments[0] ?
            <div className="commentWall">
              {comments.map(comment =>
                <div className="comment" key={comment.id}>
                  <a href={'/profile/' + comment.postername} className='posterName'>{comment.postername}</a>
                  <p>{comment.comment}</p>
                  <p className='commentDate'>{comment.date}</p>
                  <button onClick={() => deleteComment(comment.id)}>Delete</button>
                </div>
              )}
            </div>
            :
            <p></p>
          }
        </div>
      </div>
    );
  }
}

export default Post;