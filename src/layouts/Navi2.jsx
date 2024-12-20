import React from 'react';
import { MenuMenu, MenuItem, Button, Menu, Container} from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut } from '../store/actions/userActions'
import { toast } from 'react-toastify';
import AuthService from '../services/authService';
export default function Navi2() {

    const user = useSelector((state) => state.user.user); 
    const dispatch = useDispatch();

    let authService = new AuthService();
    const currentUser = authService.getCurrentUser();

    const exampleUser = { userName: "Torku A.S.", userEmail: "info@torku.com.tr", userType: "employer", userId: "3" }
    
    const handleLogin = (exampleUser) => {
        //alert("signIn : "+ exampleUser.userName);
        dispatch(signIn(exampleUser));
        toast.success(`${exampleUser.userName} : signed in user.userType: ${exampleUser.userType}`) //burda ` (back) kullanýlmalý ; sakýn ' kullanma
    };

    const handleLogout = () => {
        //alert("signOut");
        dispatch(signOut());
        toast.success('Signed out')
    };
    
    return (
        <div>
         <Menu inverted fixed="top">
         <Container> 
        <MenuItem name='home' />
        <MenuItem name='messages'/>
        <MenuMenu position='right'>
        {/*
        <div>
          
        {user ? (
                <div class="ui inverted segment">
                    <h4>Welcome, {user.userName} &nbsp;&nbsp;&nbsp; 
                    <button onClick={handleLogout}>Logout</button></h4>
                </div>
            ) : (<div class="ui inverted segment"><h4>Welcome &nbsp;&nbsp;&nbsp; 
                <button onClick={()=>handleLogin(user)}> Login </button></h4></div>
            )
        }
            
        </div> */}
        <div>
        { currentUser ? (
            <div class="ui inverted segment">
                    <h4>Welcome, {currentUser.username} &nbsp;&nbsp;&nbsp; </h4></div>
        ) : (<div class="ui inverted segment"><h4>Welcome *** </h4></div>
        )
        }
        </div>

        </MenuMenu>

        </Container>
        </Menu>

        </div>
    )
}