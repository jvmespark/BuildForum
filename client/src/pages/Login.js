// login page
function Login() {
    function LoginForm(e) {
        /*
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        let username = formJson.title
        let password = formJson.description

        if (username && password) {
            // check if the username exists and check the password
            // getUsers()
            //if not create the new user
            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            })
        }
        document.getElementById('username').value = ''
        document.getElementById('password').value = ''
        */
    }

    return (
        <div>
            <form action="/">
                <input type="submit" value="Home" />
            </form>
            <div className="login">
                <form onSubmit={LoginForm}>
                        <label>
                            Username: <br></br>
                            <input type="text" name="username" id="username"/>
                        </label>
                        <br></br>
                        <label>
                            Password: <br></br>
                            <input type="text" name="password" id="password"/>
                        </label>
                        <br></br>
                        <input type="submit" value="Login" />
                    </form>
            </div>
        </div>
    );
}

export default Login;