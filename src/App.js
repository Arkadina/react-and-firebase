import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home/Home";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";
import User from "./routes/User/User";

import "./config/db/firebaseConfig";

import "./App.css";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
