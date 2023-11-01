import React, { useContext, useEffect, useState } from 'react'

import { Button, TextField } from "@mui/material"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'

import "../register/Register.css"
import { GlobalLoginState } from '../../../App'

const Login = () => {

    const { loginStateHandle } = useContext(GlobalLoginState)

    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    // handle input change
    function handleInputChange(e) {
        setInputs((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }
    

    async function handleLogin(e) {
        try {
            e.preventDefault();

            const userObj = {
                email: inputs.email,
                password: inputs.password
            }

            const res = await axios.post("http://localhost:5000/user/login", userObj)
            const fetchedData = res.data.userData
            console.log(fetchedData)

            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 20); 

            // adding expiration field for localstorage
            fetchedData.expiration = expirationTime.toISOString();

            console.log(fetchedData)

            if (res.data.status) {
                toast.success(res.data.message);

                const userData = JSON.stringify(fetchedData);
                console.log(userData)
                localStorage.setItem("userData", userData)
                
                // changing login state
                loginStateHandle(true);
                history.push("/addPlace")
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("error in user login")
            console.log(error.message)
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form className='form-control' onSubmit={handleLogin}>

                {/* email */}
                <TextField
                    className='text-field'
                    name="email"
                    value={inputs.email}
                    label="Enter email"
                    type='email'
                    variant='outlined'
                    onChange={handleInputChange}
                    required
                />

                {/* password */}
                <TextField
                    className='text-field'
                    name="password"
                    value={inputs.password}
                    label="Enter password"
                    type='password'
                    variant='outlined'
                    onChange={handleInputChange}
                    required
                />

                <Button type='submit' variant='contained'>Login</Button>
                <Link to="/register" className="link-style">not an account! register here</Link >

            </form>
        </div>
    )
}

export default Login