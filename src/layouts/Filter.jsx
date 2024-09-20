import React from 'react';
import { MenuItem, Menu } from 'semantic-ui-react'

export default function Filter() {
    return (
        <div>
          
        <Menu text vertical>
        <MenuItem header>Filter By</MenuItem>
        <MenuItem name='City'/>
        <MenuItem name='Job Title'/>
        <MenuItem name='Employer'/>
        <MenuItem name='Aktif Ilanlar'/>
      </Menu>

        </div>
    )
}