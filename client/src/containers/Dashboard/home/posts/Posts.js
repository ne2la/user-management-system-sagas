import React, { useEffect, useState } from 'react'
import { Col, Row, Spin } from 'antd';
import {doGetUsers} from "../../actions/userAction"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    getUsers_inProgress,
    getUsers_allUsers,
    getUsers_error
} from "../../selectors/userSelector";
import Post from "../post/Post"

const Posts = (props) => {

  const {getUsers_allUsers} = props
  const[allUsers,setAllUsers] = useState([]);

  useEffect(() => {
    props.doGetUsers();
  }, []) 

  useEffect(() => {

    setAllUsers(getUsers_allUsers)
    
  }, [getUsers_allUsers]) 

  return (
    <>
    <Row gutter={[12,36]} justify="left">

      {allUsers && allUsers.map((user) => (

        <Col span={6} key={user.id}> 
          <Post user={user} postData={props.postData} setPostData={props.setPostData} setVisible={props.setVisible}/>
        </Col>

      ))}

    </Row>

    {props.getUsers_inProgress && (
      <div style={{ margin: 10, marginLeft:"50%", marginTop:"5%" }}>
        <div>
          <Spin size="large"/>
        </div>
      </div>
    )}
    </>  
  )
}

const mapStateToProps = createStructuredSelector({
  getUsers_inProgress: getUsers_inProgress(),
  getUsers_error: getUsers_error(),
  getUsers_allUsers: getUsers_allUsers(),
});

const mapDispatchToProps = (dispatch) => ({
  doGetUsers: () => {
      dispatch(doGetUsers());
},

});

export default connect(mapStateToProps,mapDispatchToProps)(Posts);

