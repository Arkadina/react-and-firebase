import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase";
import Loader from "../../components/Loader/Loader";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        connectUser(email, password);
    }

    function connectUser() {
        setIsLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("Usuário logado.");
                navigate("/");
            })
            .catch((err) => {
                console.error("Err: " + err);

                if (err && err.code) {
                    alert(err.code);
                } else {
                    alert("Unknown error!");
                }
                setIsLoading(false);
            });
    }

    return (
        <div className="register-form-container">
            <h1>Sign in</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    defaultValue=""
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <div className="link-div">
                    <p>
                        <Link to="/register" className="link-login">
                            Create new account
                        </Link>
                    </p>
                </div>
                <div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button type="submit">Log in</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Login;
