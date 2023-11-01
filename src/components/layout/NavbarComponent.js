import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import { GlobalLoginState } from '../../App';
import DashBoard from './DashBoard';
import "./NavbarComponent.css"
import { Typography } from '@mui/material';

export default function NavbarComponent() {

  const { isLogin } = useContext(GlobalLoginState);
  const history = useHistory();

  useEffect(()=>{

    if(isLogin === false){
      history.push("/")
    }

  },[isLogin])


  return (
    <Box sx={{ flexGrow: 1, padding: "0px", margin: "0px" }}>
      <AppBar position="static" style={{ background: "gray" }}>
        <Toolbar>
          <div style={{marginLeft : "auto"}}>
           {isLogin && <DashBoard/>}
          </div>
          {
            isLogin === false &&
            <Toolbar className='btn'>
              <Link to="/"><Button color='success' variant='contained'>Login</Button></Link>
            </Toolbar>
          }
          {
            isLogin === false &&
            <Link to="/register"><Button color='success' variant='contained'>Register</Button></Link>
          }
          {/* {
            isLogin === true &&
            <Toolbar className='btn'>
              <Link to="/addPlace"><Button color='success' variant='contained'>AddPlace</Button></Link>
            </Toolbar>
          }
          {
            isLogin === true &&
            <Link to="/getAllplaces"><Button sx={{ marginRight: "15px" }} color='success' variant='contained'>getPlaces</Button></Link>
          } */}
          {/* {
            isLogin === true &&
            <Link to="/">  <Button color='error' variant='contained'
              onClick={() => {
                loginStateHandle(false)
                localStorage.removeItem("userData")
              }}>logout</Button></Link>
          } */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
