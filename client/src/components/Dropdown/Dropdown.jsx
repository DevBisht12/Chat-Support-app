import * as React from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Avatar from '@mui/joy/Avatar';
import { Link } from 'react-router-dom';

export default function BasicMenu({name}) {
  return (
    <Dropdown >
      <MenuButton sx={{border:0, padding:0}}>
      <Avatar>{name}</Avatar>
      </MenuButton>
      <Menu>
        <Link to='/user/dashboard'><MenuItem>Dashboard</MenuItem></Link>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}
