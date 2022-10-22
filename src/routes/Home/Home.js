import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import firebase from "firebase";
import Loader from "../../components/Loader/Loader";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        isLoggedIn();
    }, []);

    function isLoggedIn() {
        try {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    navigate("/user");
                } else {
                    navigate("/login");
                }
            });
        } catch (error) {
            navigate.push("/error");
        }
    }

    return (
        <div>
            <Loader />
        </div>
    );
}

export default Home;
