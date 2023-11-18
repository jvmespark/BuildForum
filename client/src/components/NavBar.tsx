import './NavBar.css'
import Button from '@mui/material/Button';

//<Button variant="contained" className="headerFormR" href="/messages" disableElevation sx={{ mr: 2 }}> Chat </Button>

function NavBar() {
    let username = localStorage.getItem("username")
    let collegeName = "RPI";
    return (
        <div className="header">
            <a href={'/'} className='headerLogo'> Campus Brag: {collegeName}</a>
            { username ?
                (
                    <div>

                        <div className="headerUser">
                            <Button variant="contained" href={'/profile/'+ username} disableElevation > {username} </Button>
                        </div>
                        
                        <Button variant="contained" className="headerFormR" href="/submit" disableElevation sx={{ mr: 2 }}> Create Post </Button>
                    
                        <div className="App">
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <Button variant="contained" className="headerFormR" href="/login" disableElevation> Login </Button>
                    </div>
                )
            }
        </div>
    );
}

export default NavBar;