import React, { useState } from 'react'
import "./navbar.css"
import {Typography,Avatar,Button,Input} from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const NavBar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile"))); 

  const logout = () => {

    navigate("/signin");
    // setUser(null);
    localStorage.clear();
    window.location.reload();

  }

  return (
    <>
          <div className='container'>

            <Link to={"/"}>
              <img src={require("../../assests/images/iconHome.png")} style={{height:"60px", width:"60px"}}/>
            </Link>
            <Input className='search' size="middle" placeholder="Search..." prefix={<SearchOutlined />} />

            <div className='section2'>
                <Avatar size={40} src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png" />
                <Typography style={{fontWeight:"bold",fontSize:"20px",fontFamily:"serif",color:"#808080"}}> {user?.data?.result?.name}</Typography>
                <Button type="primary" ghost onClick={logout}>  Log Out </Button>
              

            </div>
        </div>
    </>
  )
}

export default NavBar