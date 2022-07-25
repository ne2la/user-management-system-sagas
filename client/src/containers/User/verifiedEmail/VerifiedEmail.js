import { Button, Image, Typography } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation,useParams } from 'react-router-dom'
import NotFoundPage from '../notFound/NotFoundPage'
import "./verifiedemail.css"

const VerifiedEmail = () => {

    const location = useLocation();
    const token = location.pathname.split("/")[2]
    const dispatch = useDispatch();
    const param = useParams(); 
    const[validURL,setValidURL] = useState(false);
    
    // useEffect(() => {
    //   dispatch(confirmEmail(token))    
    // }, [])

    useEffect(() => {
      
      const verifyEmailURL = async () => {
        try {
          const url = `http://localhost:5000/user/confirmEmail/${param.id}/${param.token}`
          const {data} = await axios.put(url);
          console.log(data);
          setValidURL(true);
        } catch (error) {
          console.log(error)
          setValidURL(false);
        }
      }

      verifyEmailURL()

    }, [param])
    
  return (
    <>
    {validURL ? 
      <div className='containerVerEmail'>
        <div className='verEmailImage'>
          <Image
              width="100%"
              height="99%"
              preview = {false} 
              className='formImg'
              src='https://img.freepik.com/free-vector/verified-concept-illustration_114360-5138.jpg?t=st=1658337171~exp=1658337771~hmac=ba4b1b88213820090654d7d13a9e44573709ae88a698adc034881670287734f1&w=740'
          />
          <Typography style={{fontSize:"20px",fontWeight:"bold"}}> You have Successfully Registered </Typography>
          <Link to="/signin"> <Button style={{marginTop:"10px"}} type="primary" size="large"> Sign In </Button> </Link>
        </div>
      </div>
      :
      <div>
        <NotFoundPage/>
      </div>
    }
    
    </>
  )
}

export default VerifiedEmail