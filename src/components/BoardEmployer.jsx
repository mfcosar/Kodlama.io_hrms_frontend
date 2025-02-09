import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from '../services/authService';
import EventBus from "../common/EventBus";

export default function BoardEmployer(){ 

    const [content, setContent] = useState("");
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        
        UserService.getEmployerBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []); //

    return (
        <div className="container">
            <header className="jumbotron"><strong>{currentUser.username}</strong>
                <h3>{content}</h3>
            </header>
        </div>
    );
};
