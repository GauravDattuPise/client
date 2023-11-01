import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useHistory} from "react-router-dom"
import { GlobalLoginState } from '../../App';

export default function DashBoard(){

    const {loginStateHandle} = React.useContext(GlobalLoginState)

    const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const goToAddPlace = ()=>{
    handleClose();
    history.push("/addPlace")
  }

  const goToGetAllPlaces = ()=>{
    handleClose();
    history.push("/getAllPlaces")
  }

  const handleLogout =() => {
    handleClose();
    loginStateHandle(false)
    localStorage.removeItem("userData")
    history.push("/")
  }

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color : "white",  background : "green"}}
        variant='contained'
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
      >
        <MenuItem onClick={goToAddPlace}>Add Places</MenuItem>
        <MenuItem onClick={goToGetAllPlaces}>See Places</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}