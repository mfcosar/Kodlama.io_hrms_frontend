import React from 'react';
import { MenuMenu, MenuItem, Button, Menu, Container} from 'semantic-ui-react'


export default function Navi() {
    return (
        <div>
         <Menu inverted fixed="top">
         <Container> 
        <MenuItem name='home' />
        <MenuItem name='messages'/>


        </Container>
        </Menu>

        </div>
    )
}