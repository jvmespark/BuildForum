import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./pages/Messages";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Submit from "./pages/Submit";
import Post from "./pages/Post"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/post/*" element={<Post />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App