

import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useHistory } from 'react-router-dom';


const UpdatePlace = () => {

    // token from localstorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    const {token} = userData;

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        address: '',
    });

    const history = useHistory();
    const placeId = useParams().placeId;

    function handleInputChange(e){
        setInputs((preState)=>({
            ...preState,
            [e.target.name] : e.target.value
        }))
    }

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


    // getting place details to update
    async function getPlace() {
        try {
            const response = await axios.get(`http://localhost:5000/place/getPlace/${placeId}`);
            const place = response.data.placeData;

            if (place) {
                setInputs({
                    title: place.title, 
                    description: place.description,
                    address: place.address,
                });
            }
        console.log(place)

        } catch (error) {
            console.error('Error fetching place data:', error);
        }
    }
   

    // update place by id
    const updatePlace = async(e) => {
        e.preventDefault();
        try {
            const placeObject = {
                title : inputs.title,
                description : inputs.description,
                address : inputs.address
            }
              const response = await axios.patch(`http://localhost:5000/place/updatePlace/${placeId}`,
               placeObject,
               {
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
               }
               );
              if(response.data.status){
                toast.success(response.data.message);
                history.push("/getAllPlaces")
              }
        } catch (error) {
            console.error('Error in updating place data:', error); 
        }
    }
    useEffect(() => {
        getPlace();
    }, []);

    return (
        <div className='container'>
            <h1>UpdatePlace</h1>
            <form className='form-control' onSubmit={updatePlace}>

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

                <Button type='submit' variant='contained'>updatePlace</Button>

            </form>
        </div>
    )
}

export default UpdatePlace