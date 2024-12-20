import React from 'react';
import { useState, useEffect, useCallback } from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
import UserService from "../services/user.service";
import ImageService from '../services/imageService';
import ImageFromURL from "../components/ImageFromURL";
import EventBus from "../common/EventBus";


export default function Navi() {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showCandidateBoard, setShowCandidateBoard] = useState(false);
    //const [showAdminBoard, setShowAdminBoard] = useState(false);
    //const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [profilePhoto, setProfilePhoto] = useState("");

    

    useEffect(() => {  
        const user = AuthService.getCurrentUser();

         if (user) {
            setCurrentUser(user); 
            setShowCandidateBoard(user.roles.includes("ROLE_CANDIDATE"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            fetchProfilePhoto();
        }
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []); 

    const logOut = () => {
        AuthService.logout();
        setShowCandidateBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    const fetchProfilePhoto = useCallback(async () => {
        
        try {
            if (currentUser) {
                let imageService = new ImageService();
                
                const response = await imageService.getImageUrlByCandidateId(currentUser.id);
                //alert("after getImageUrl: " + response.data);

                if (response.status === 200) {
                    //const imageBlob = response.data;
                    const imageUrl = response.data; // URL.createObjectURL(imageBlob);
                    //alert("fetch: "+ imageUrl); //çalýþtý
                    setProfilePhoto(imageUrl);
                }
            }
        } catch (error) {
            console.error(
                "An error occurred while retrieving the profile photo.",
                error.response
            );
        }
    }, [currentUser]);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Hrms
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>


                    {showCandidateBoard && (
                        <li className="nav-item">
                            <Link to={"/candidate"} className="nav-link">
                                Candidate Board
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                <ImageFromURL imageUrl={profilePhoto} />
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
                            {/*<AuthVerify logOut={logOut} />*/}
                        </li>
                    </div> 
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/signup"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </nav>
            
        </div>)
}