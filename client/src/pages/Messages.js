// page for direct message chatting
import NavBar from './../components/NavBar'
import './styles/Messages.css'

function Messages() {
    return (
        <div>
            <NavBar/>
            <div className="messages">
                messages here, or no messages
            </div>
        </div>
    );
}

export default Messages;