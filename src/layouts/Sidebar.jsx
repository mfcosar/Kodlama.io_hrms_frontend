import React from 'react';
import { useState, useEffect, useCallback } from 'react'; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
import UserService from "../services/user.service";
//import ImageService from '../services/imageService';
//import ImageFromURL from "../components/ImageFromURL";
import EventBus from "../common/EventBus";
import { MenuItem, Input, Label, Menu } from 'semantic-ui-react';


export default function Sidebar() {
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [showCandidateMenu, setShowCandidateMenu] = useState(false);
    const [showEmployerMenu, setShowEmployerMenu] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [activeItem, setActiveItem] = useState('inbox');
    //state = { activeItem: 'inbox' }
    //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    }

    //const { activeItem } = this.state

    useEffect(() => {  
        const user = AuthService.getCurrentUser();

         if (user) {
            setCurrentUser(user); 
             setShowCandidateMenu(user.roles.includes("ROLE_CANDIDATE"));
             setShowAdminMenu(user.roles.includes("ROLE_ADMIN"));
             setShowEmployerMenu(user.roles.includes("ROLE_EMPLOYER"));
            //fetchProfilePhoto();
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
        setShowCandidateMenu(false);
        setShowEmployerMenu(false);
        setShowAdminMenu(false);
        setCurrentUser(undefined);
    };


    return (
<div>
    <div>
    {showAdminMenu && (
    <Menu vertical name="adminMenu">
        <MenuItem name='inbox' active={activeItem === 'inbox'} onClick={handleItemClick}  >
        <Link to={"/"}>Hrms </Link>
        </MenuItem>

        <MenuItem name='profile' active={activeItem === 'profile'} onClick={handleItemClick}  >
        <Link to={`/admin/profile/${currentUser.id}`}>Profile </Link>
        </MenuItem>

        {/*<MenuItem name='spam' active={activeItem === 'spam'} onClick={handleItemClick} >
        <Link to={"/signup"} className="nav-link">Sign Up</Link>
        </MenuItem>*/}
               
    </Menu>
    )}

    {showCandidateMenu && (
    <Menu vertical name="candidateMenu">
        <MenuItem name='inbox' active={activeItem === 'inbox'} onClick={handleItemClick}  >
        <Link to={"/"}>Hrms </Link>
        </MenuItem>

        <MenuItem name='profile' active={activeItem === 'profile'} onClick={handleItemClick}  >
        <Link to={`/candidate/profile/${currentUser.id}`}>Profile </Link>
        </MenuItem>

        {/*<MenuItem name='spam' active={activeItem === 'spam'} onClick={handleItemClick} >
        <Link to={"/signup"} className="nav-link">Sign Up</Link>
        </MenuItem>*/}
               
    </Menu>
    )}

    {showEmployerMenu && (
    <Menu vertical name="employerMenu">
        <MenuItem name='profile' active={activeItem === 'profile'} onClick={handleItemClick}  >
        <Link to={`/employer/profile/${currentUser.id}`}>Profile</Link>
        </MenuItem>

        <MenuItem name='listadvertisements' active={activeItem === 'listadvertisements'} onClick={handleItemClick}  >
        <Link to={`/employer/listadvertisements/${currentUser.id}`}>List Advertisements</Link>
        </MenuItem>

        <MenuItem name='newadvertisement' active={activeItem === 'newadvertisement'} onClick={handleItemClick}  >
        <Link to={`/employer/addadvertisement/${currentUser.id}`}>Add New Advertisement</Link>
        </MenuItem>

        {/*<MenuItem name='spam' active={activeItem === 'spam'} onClick={handleItemClick} >
        <Link to={"/signup"} className="nav-link">Sign Up</Link>
        </MenuItem>

        <MenuItem
          name='updates'
          active={activeItem === 'updates'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          Updates
        </MenuItem>*/}
        <MenuItem>
          <Input icon='search' placeholder='Search mail...' />
        </MenuItem>
    </Menu>
    )}
 
</div>
        <div>
            <nav className="ui vertical menu">
                <Link to={"/"} className="item">Hrms</Link>
                <div className="navbar-nav mr-auto">
                    <li className="item">
                        <Link to={"/home"} className="nav-link">Home</Link>
                    </li>


                    {showCandidateMenu && (
                        <li className="item">
                            <Link to={"/candidate"} className="nav-link">
                                Candidate Board
                            </Link>
                        </li>
                    )}

                    {showEmployerMenu && (
                        <li className="item">
                            <Link to={"/employer"} className="nav-link">
                                Employer Board
                            </Link>
                        </li>
                    )}
                    {showAdminMenu && (
                        <li className="item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}

                    {currentUser && (
                        <li className="item">
                            <Link to={"/user"} className="nav-link">
                                User
                            </Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        {/*<li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                <ImageFromURL imageUrl={profilePhoto} />
                            </Link>
                        </li> */
                        }

                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
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
        </div>
    </div>)
}