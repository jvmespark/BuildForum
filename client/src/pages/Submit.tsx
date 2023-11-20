import { FC, FormEvent } from 'react';
import { TextField, Button } from "@mui/material";
import NavBar from '../components/NavBar';
import './styles/Submit.css';
import {v4 as uuidv4} from 'uuid';

const Submit: FC = () => {

    const CreatePost = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData:any = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson)
        
        // modify psql schema for posts to include username
        // have a ' sign in to post ' if not signed in
        if (formJson.title) {
            let title: string = formJson.title;
            let description: string = formJson.description;
            let username: string | null = localStorage.getItem("username");
            let serverPath = "";

            if (formJson.media.size!=0) {
                let file = formJson.media;
                let contentType = formJson.media.type;
                let filename = formJson.media.name;
                serverPath = uuidv4()+'/'+filename; // store meta data into the psql associated with the post so u can get it back
                serverPath='test/'+filename;

                fetch('http://localhost:3001/media', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ file, contentType, serverPath, filename }),
            });
            }

            // change the schema to include media metadata
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
                <form onSubmit={CreatePost} encType="multipart/form-data">
                    <TextField name="title" id="title" type="text" label="Title" variant="filled" fullWidth />
                    <br></br>
                    <br></br>
                    <TextField name="description" id="desc" type="text" label="Text (Optional)" variant="filled" fullWidth />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        component="label"
                        >
                        Upload File
                        <input
                            name="media"
                            id="media"
                            type="file"
                            hidden
                        />
                    </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" type="submit" disableElevation>Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default Submit;