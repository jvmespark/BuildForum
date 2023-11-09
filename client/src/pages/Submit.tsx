import { FC, FormEvent } from 'react';
import { TextField, Button } from "@mui/material";
import NavBar from '../components/NavBar';
import './styles/Submit.css';

const Submit: FC = () => {

    const CreatePost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData:any = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let title: string = formJson.title;
        let description: string = formJson.description;
        let username: string | null = localStorage.getItem("username");
        // modify psql schema for posts to include username
        // have a ' sign in to post ' if not signed in
        if (title) {
            fetch('http://localhost:3001/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, username }),
            });
        }
        (document.getElementById('title') as HTMLInputElement).value = '';
        (document.getElementById('desc') as HTMLInputElement).value = '';

        window.location.replace(document.referrer);
    }

    return (
        <div>
            <NavBar />
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