// profile page for the user
import NavBar from './../components/NavBar'
import './styles/Profile.css'

function Profile() {
    let username = localStorage.getItem("username")
    return (
        <div>
            <NavBar/>   
            <div  className="profile">
                {username} <br></br>
                resume type profile page
            </div>
        </div>
    );
}

export default Profile;