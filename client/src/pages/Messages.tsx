import { FC } from 'react';
import NavBar from '../components/NavBar';
import './styles/Messages.css';

const Messages: FC = () => {
    return (
        <div>
            <NavBar/>
            <div className="messages">
                <ul id="messages"></ul>
                <form id="form" action="">
                <input id="input" autoComplete="off" /><button>Send</button>
                </form>
            </div>
        </div>
    );
}

export default Messages;