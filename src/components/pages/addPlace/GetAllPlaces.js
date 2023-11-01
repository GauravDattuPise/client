
import React, { useContext, useEffect, useState } from 'react'
import CardPlaces from './cardForPlaces/CardPlaces'
import axios from 'axios';
import { CircularProgress, Grid } from '@mui/material';
import { GlobalLoginState } from '../../../App';
import {useHistory} from "react-router-dom"
import toast from "react-hot-toast"


const GetAllPlaces = () => {

  const {isLogin} = useContext(GlobalLoginState)

  const [allPlaces, setAllPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("all places are", allPlaces)
  const history = useHistory();

  useEffect(() => {
    if (isLogin === false) {
        history.push("/")
    }

}, [isLogin])


  useEffect(() => {   

    const getPlaces = async () => {
      try {
        const res = await axios.get("place/getAllPlaces");
        if (res.data.status) {
          setAllPlaces(res.data.places);

          // loading stopping
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error in getting all places", error.message)
      }
    }
    getPlaces();
  }, [])
  return (
    <div>
      {
        isLoading && <div>
          <CircularProgress sx={{ height: "200px", width: "400px", color: "red", marginTop: "100px" }} />
          <h2>Loading...</h2>
        </div>
      }
      <h1>Places</h1>
      <Grid container spacing={2}>
        {allPlaces.map((place) => (
          <Grid item key={place._id} xs={12} sm={6} md={4}>
            <CardPlaces
              title={place.title}
              description={place.description}
              address={place.address}
              placeId={place._id}
              userId={place.userId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default GetAllPlaces