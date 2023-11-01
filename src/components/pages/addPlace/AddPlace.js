
import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField } from "@mui/material"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useHistory } from "react-router-dom"

import "../register/Register.css"
import { GlobalLoginState } from '../../../App'

const AddPlace = () => {

    const { isLogin } = useContext(GlobalLoginState)

    const history = useHistory();

    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        history.push("/")
    }

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        address: ""
    });

    // error messages
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [addressError, setAddressError] = useState("");

    // Validation function
    const validateInputs = () => {
        let isValid = true;

        if (inputs.title.trim().length < 3 && inputs.title.length !== 0) {
            setTitleError('title should have atleast 3 characters');
            console.log(inputs.title)
            isValid = false;
        } else {
            setTitleError('');
        }

        if (inputs.description.trim().length < 5 && inputs.description.length !== 0) {
            setDescriptionError('description should have atleast 5 characters');
            console.log(inputs.description)
            isValid = false;
        } else {
            setDescriptionError('');
        }

        if (inputs.address.trim().length < 5 && inputs.address.length !== 0) {
            setAddressError('address should be at least 5 characters');
            isValid = false;
        } else {
            setAddressError('');
        }

        return isValid;
    };

    // for validating inputs
    useEffect(() => {
        validateInputs();
    }, [inputs])

    useEffect(() => {
        if (isLogin === false) {
            history.push("/")
        }

    }, [isLogin])

    // handle input change
    function handleInputChange(e) {
        setInputs((preState) => ({
            ...preState,
            [e.target.name]: e.target.value
        }))
    }

    async function handleAddPlace(e) {
        try {
            e.preventDefault();

            const placeObject = {
                title: inputs.title,
                description: inputs.description,
                address: inputs.address,
            }

            const res = await axios.post("place/AddPlace",
                placeObject,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userData.token}`
                    }
                }
            );

            if (res.data.status) {
                toast.success(res.data.message);
                history.push("/getAllPlaces")
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("server error in AddPlace")
            console.log(error.message)
        }
    }

    return (
        <div className='container'>
            <h1>AddPlace</h1>
            <form className='form-control' onSubmit={handleAddPlace}>

                {/* title */}
                <TextField
                    className='text-field'
                    name="title"
                    value={inputs.title}
                    label="Enter title"
                    type='text'
                    variant='outlined'
                    onChange={handleInputChange}
                    required
                />
                {titleError !== "" && <p className='error'>{titleError}</p>}

                {/* description */}
                <TextField
                    className='text-field'
                    name="description"
                    value={inputs.description}
                    label="Enter description"
                    type='text'
                    variant='outlined'
                    onChange={handleInputChange}
                    required
                />
                {descriptionError !== "" && <p className='error'>{descriptionError}</p>}


                {/* address */}
                <TextField
                    className='text-field'
                    name="address"
                    value={inputs.address}
                    label="Enter address"
                    type='text'
                    variant='outlined'
                    onChange={handleInputChange}
                    required
                />
                {addressError !== "" && <p className='error'>{addressError}</p>}


                <Button type='submit' variant='contained'>AddPlace</Button>

            </form>
        </div>
    )
}

export default AddPlace