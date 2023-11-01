import React, { useEffect, useState } from 'react'
import { Button, TextField } from "@mui/material"
import { Link, useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios"

import "./Register.css"

const Register = () => {

    const history = useHistory();
    // state for inputs
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        file: ""
    });

    // error messages
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Validation function
    const validateInputs = () => {
        let isValid = true;

        if (inputs.name.trim().length < 3 && inputs.name.length !== 0 ) {
            setNameError('Name should have atleast 3 characters');
            console.log(inputs.name)
            isValid = false;
        } else {
            setNameError('');
        }

        if (!inputs.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) && inputs.email.length !== 0) {
            setEmailError('Invalid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (inputs.password.trim().length < 5 && inputs.password.length !== 0) {
            setPasswordError('Password should be at least 5 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    // handling input 
    function handleInputChange(e) {
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }))
    }

    // for validating inputs
    useEffect(()=>{
          validateInputs();
    },[inputs])

    // user registration
    async function handleRegister(e) {

        e.preventDefault();
        try {
            const userObj = {
                name : inputs.name,
                email : inputs.email,
                password : inputs.password
            }

            // sending user's data to backend
            const res = await axios.post("http://localhost:5000/user/register", userObj)

            // toast message
            if (res.data.status) {
                toast.success(res.data.message);
                history.push("/")
            }
            // if email is already exists
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("server side error")
            console.log(error)
        }
    }

    return (
        <div className='container'>
            <h1>Register</h1>
            <form className='form-control' onSubmit={handleRegister}>

                {/* name */}
                <TextField
                    className='text-field'
                    name='name'
                    label="Enter Name"
                    type='text'
                    variant='outlined'
                    value={inputs.name}
                    onChange={handleInputChange}
                    required
                />
                {nameError !== '' && <p className="error">{nameError}</p>}

                {/* email */}
                <TextField
                    className='text-field'
                    name='email'
                    label="Enter email"
                    type='email'
                    variant='outlined'
                    value={inputs.email}
                    onChange={handleInputChange}
                    required
                />
                {emailError !== '' && <p className="error">{emailError}</p>}

                {/* password */}
                <TextField
                    className='text-field'
                    name='password'
                    label="Enter password"
                    type='password'
                    variant='outlined'
                    value={inputs.password}
                    onChange={handleInputChange}
                    required
                />
                {passwordError !== '' && <p className="error">{passwordError}</p>}

                <Button type='submit' variant='contained'>Register</Button>
                <Link to="/" className="link-style">have an account! login here</Link>

            </form>
        </div>
    )
}

export default Register