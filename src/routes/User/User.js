import React, { useEffect, useState } from "react";

import firebase from "firebase";
import "./User.css";

import img from "../../img/no_photo.jpg";
import pencil from "../../img/svg/pencil.svg";
import exit from "../../img/svg/exit.svg";
import imgchange from "../../img/svg/camera-reverse-outline.svg";

import { useNavigate } from "react-router-dom";

function User() {
    const [userData, setUserData] = useState("");
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = firebase.auth().currentUser;
        getUserData(user);
    }, [isUpdated]);

    async function getUserData(user) {
        const userRef = firebase.firestore().collection("users").doc(user.uid);

        await userRef.get().then((doc) => {
            setUserData({ ...doc.data(), id: user.uid });
        });
    }

    function getImageFile(event, where) {
        let fileToUpload = event.target.files[0];
        if (!fileToUpload) return;

        if (where === "banner") {
            const photoProfileStorageRef = firebase
                .storage()
                .ref(`users/${userData.id}/banner`);

            photoProfileStorageRef
                .put(fileToUpload)
                .on("state_changed", () =>
                    getUrlUploadedFromStorage(photoProfileStorageRef, "banner")
                );
        }
        if (where === "perfil") {
            const photoProfileStorageRef = firebase
                .storage()
                .ref(`users/${userData.id}/perfil`);

            photoProfileStorageRef
                .put(fileToUpload)
                .on("state_changed", () =>
                    getUrlUploadedFromStorage(photoProfileStorageRef, "perfil")
                );
        }
    }

    async function getUrlUploadedFromStorage(photoProfileStorageRef, where) {
        if (where === "banner") {
            const urlPhoto = await photoProfileStorageRef.getDownloadURL();
            const userRef = firebase
                .firestore()
                .collection("users")
                .doc(userData.id);

            await userRef.update({
                photoBanner: urlPhoto,
            });

            setUserData({
                ...userData,
                photoBanner: urlPhoto,
            });

            setIsUpdated(true);
        } else {
            const urlPhoto = await photoProfileStorageRef.getDownloadURL();
            const userRef = firebase
                .firestore()
                .collection("users")
                .doc(userData.id);

            await userRef.update({
                photoPerfil: urlPhoto,
            });

            setUserData({
                ...userData,
                photoPerfil: urlPhoto,
            });

            setIsUpdated(true);
        }
    }

    async function handleChangeUser() {
        const newUser = prompt("What is your name");
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(userData.id);
        if (newUser) {
            await userRef.update({
                user: newUser,
            });
            setUserData({
                ...userData,
                user: newUser,
            });
            setIsUpdated(true);
        }
    }

    async function handleChangePhrase() {
        const newPhrase = prompt("What is your new word of the day?");
        const userRef = firebase
            .firestore()
            .collection("users")
            .doc(userData.id);
        if (newPhrase) {
            await userRef.update({
                phrase: newPhrase,
            });

            setUserData({
                ...userData,
                phrase: newPhrase,
            });
            setIsUpdated(true);
        }
    }

    function handleSignOut() {
        firebase.auth().signOut();
        navigate("/");
    }

    return (
        <div className="container">
            <div className="user-container">
                <div className="user-banner">
                    <img
                        src={userData.photoBanner ? userData.photoBanner : img}
                        alt=""
                    />
                </div>
                <div className="user-config">
                    <img
                        src={userData.photoPerfil ? userData.photoPerfil : img}
                        alt=""
                    />
                </div>
                <div className="user-config-data">
                    <div>
                        <p>{userData.user ? userData.user : "Your user"}</p>
                        <img
                            src={pencil}
                            alt=""
                            onClick={() => handleChangeUser()}
                        />
                    </div>
                    <div>
                        <span>
                            {" "}
                            {userData.phrase
                                ? userData.phrase
                                : "Your word of the day"}
                        </span>
                        <img
                            src={pencil}
                            alt=""
                            onClick={() => handleChangePhrase()}
                        />
                    </div>
                    <div className="banner-change">
                        <div>
                            <label htmlFor="arquivo">Change banner</label>
                        </div>
                        <img src={imgchange} alt="" />
                        <div>
                            <input
                                id="arquivo"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => getImageFile(e, "banner")}
                            />
                        </div>
                    </div>
                    <div className="banner-change">
                        <div>
                            <label htmlFor="arquivo2">
                                Change profile image
                            </label>
                        </div>
                        <img src={imgchange} alt="" />
                        <div>
                            <input
                                id="arquivo2"
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => getImageFile(e, "perfil")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn-logout" onClick={() => handleSignOut()}>
                <span>Sign out</span>
                <img src={exit} alt="" />
            </button>
        </div>
    );
}

export default User;
