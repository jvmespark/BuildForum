// page to create a post and submit
import './styles/Submit.css';

function Submit() {

    function CreatePost(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let title = formJson.title
        let description = formJson.description
        if (title) {
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, description}),
        })
        }
        document.getElementById('title').value = ''
        document.getElementById('desc').value = ''

        window.location.replace(document.referrer);
    }
  
    return (
        <div>
            <form action="/">
                <input type="submit" value="Home" />
            </form>
            <div className="submitBox">
                <form onSubmit={CreatePost}>
                    <label>
                        Title: <br></br>
                        <input type="text" name="title" id="title"/>
                    </label>
                    <br></br>
                    <label>
                        Description: <br></br>
                        <input type="text" name="description" id="desc"/>
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Submit;