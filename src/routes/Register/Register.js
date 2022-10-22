import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import firebase from "firebase";
import Loader from "../../components/Loader/Loader";

import "./Register.css";

function Register() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        if (password === confirmPassword) {
            registerUser(email, password);
        }
    }

    function registerUser() {
        setIsLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                let currentUser = user.user;
                console.log("Usuário registrado com sucesso.");

                const userRef = firebase
                    .firestore()
                    .collection("users")
                    .doc(currentUser.uid);

                userRef.set({
                    email: currentUser.email,
                    emailVerified: currentUser.emailVerified,
                });

                setTimeout(() => {
                    setIsLoading(false);
                    navigate("/");
                }, 2000);
            })
            .catch((err) => {
                console.error("Err: " + err);
            });
    }

    return (
        <div className="register-form-container">
            <h1>Sign up</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    defaultValue=""
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    defaultValue=""
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    defaultValue=""
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>

                <div className="link-div">
                    <p>
                        <Link to="/" className="link-login">
                            Log in
                        </Link>
                    </p>
                </div>

                <div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button type="submit">Create account</button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Register;
