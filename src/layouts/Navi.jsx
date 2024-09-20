import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { MenuMenu, MenuItem, Button, Menu, Container} from 'semantic-ui-react'


export default function Navi() {
    return (
        <div>
         <Menu inverted fixed="top">
         <Container> 
        <MenuItem name='home' />
        <MenuItem name='messages'/>

        <MenuMenu position='right'>
        <MenuItem>
            <Button primary><LogIn /></Button>
          </MenuItem>
       
        <MenuItem> Hesabiniz yoksa  
            <Button primary><SignUp /></Button>
          </MenuItem>
        </MenuMenu>
        </Container>
        </Menu>

        </div>
    )
}