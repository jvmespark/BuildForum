// page to create a post and submit
import './styles/Submit.css';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import NavBar from './../components/NavBar'

function Submit() {

    function CreatePost(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let title = formJson.title
        let description = formJson.description
        let username = localStorage.getItem("username")
        // modify psql schema for posts to include username
        // have a ' sign in to post ' if not signed in
        if (title) {
            fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, description, username}),
            })
        }
        document.getElementById('title').value = ''
        document.getElementById('desc').value = ''

        window.location.replace(document.referrer);
    }
  
    return (
        <div>
            <NavBar/>
            <div className="submitBox">
                <form onSubmit={CreatePost}>
                    <TextField name="title" id="title" type="text" label="Title" variant="filled" fullWidth />
                    <br></br>
                    <br></br>
                    <TextField name="description" id="desc" type="text" label="Text (Optional)" variant="filled" fullWidth />
                    <br></br>
                    <br></br>
                    <Button variant="contained" type="submit" disableElevation>Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default Submit;