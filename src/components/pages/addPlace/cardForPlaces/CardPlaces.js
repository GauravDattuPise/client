import React, {useCallback, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useHistory } from "react-router-dom"
import { GlobalLoginState } from '../../../../App';

export default function CardPlaces({ title, description, address, placeId, userId }) {

    const userData = JSON.parse(localStorage.getItem("userData"))
    const storedUserId = userData.userId
    console.log(userId, storedUserId)
    const history = useHistory()

    const {isLogin, loginStateHandle} = React.useContext(GlobalLoginState);

    // deleting place
    async function handleDelete(placeId) {
        try {
            const userConfirmed = window.confirm("Are you sure want to delete place");
            if (userConfirmed) {
                const res = await axios.delete(`place/deletePlace/${placeId}`,
               
                {
                    headers : {
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${userData.token}`
                    }
                })

                if (res.data.status) {
                    toast.success(res.data.message);
                    window.location.reload();
                    // loginStateHandle(true);
                    // history.push("/getAllPlaces")
                } 
            }
        } catch (error) {
            toast.error("error in delete place")
            console.log("error in delete place", error)
        }
    }

    // updating place
    async function getPlaceId(placeId) {
        try {
            history.push(`/updatePlace/${placeId}`)
        } catch (error) {
            console.log("error in get placeId")
        }
    }

    const login = useCallback(()=>{
        loginStateHandle(true)
    })

    useEffect(()=>{
           login();
    },[isLogin])
    


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: "220px", width: "350px" }}
                component="img"
                alt="jai shri ram"
                height="140"
                image="https://images.news18.com/ibnlive/uploads/2023/10/vijaydashmi-2023-dussehra-celebration-2023-10-6b5f269fdcc12f6255cb769cfd1f231f-3x2.jpg?impolicy=website&width=510&height=356"
            />
            <CardContent sx={{ minHeight: "150px" }}>
                <Typography gutterBottom variant="h5" component="div">
                    Title : {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description : {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Address : {address}
                </Typography>

                {
                    storedUserId === userId &&
                    <CardActions>
                        <Button color='warning' variant='contained' onClick={() => getPlaceId(placeId)}>Update</Button>
                        <Button color='error' variant='contained' onClick={() => handleDelete(placeId)}>Delete</Button>
                    </CardActions>
                }
                {
                    storedUserId !== userId &&
                    <CardActions>
                        <Button color='warning' disabled variant='contained' >Update</Button>
                        <Button color='error' disabled variant='contained'>Delete</Button>
                    </CardActions>
                }
            </CardContent>
        </Card>
    );
}