import { Card,Avatar,Collapse,Button,Tooltip, Spin} from 'antd';
import React from 'react';
import "./post.css";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {doDeleteUser} from "../actions/deleteUserAction"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    deleteUser_inProgress,
    deleteUser_result,
    deleteUser_error
} from "../selectors/deleteUserSelector";
import ModalComponent from '../../../components/modal/ModalComponent';
import {doGetUsers,doGetUsersFailed} from "../actions/getUsersAction"


const { Panel } = Collapse;
const { Meta } = Card;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Post = (props) => {

  // const onChange = (key) => {
  //   console.log(key);
  // };

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  const onClickDelete = () => {
    props.doDeleteUser({ id: props.user._id }) 
    props.doGetUsers()   
  } 

  // const errorMsg = props?.deleteUser_error?.message
  // console.log(errorMsg)

  // const result = props.deleteUser_result
  // console.log(result)

  return (

    <Card hoverable style={{width:"310px"}} className='card'>

        <Meta
            avatar={<Avatar src={props?.user?.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeUl9IZDN97pBQNgeunx6dD1df-4g7vkPFw&usqp=CAU"} size={64}/>}
            title={props.user.userName}
            description={props.user.occupation}
        />

        <Collapse style={{marginTop:"20px"}}>
          <Panel header="More Info...">
            <p> <b>NIC : </b> {props.user.NIC} </p>
            <p> <b>Address : </b> {props.user.address} </p>
            
            <p> <b>Gender : </b> {props.user.gender} </p>
            <p> <b>Mobile Number : </b> {props.user.mobileNumber} </p> 
            <p> <b>Email : </b> {props.user.userEmail} </p>
          </Panel>
        </Collapse>

        <div style={{marginTop:"20px",display:"flex",alignItems:"center",gap:"10px"}}>
{/* <p> <b>Date Of Birth : </b> {`${format(user.dateOfBirth, "MMM dd")}`} </p>  */} 
          <Tooltip title="Delete">
            <Button onClick={onClickDelete} shape="circle" icon={<DeleteOutlined/>} />
          </Tooltip>

          <Tooltip title="Update">
            <Button shape="circle" icon={<EditOutlined />} />
          </Tooltip>

          {props.deleteUser_inProgress && (
            <div style={{ margin: 10 }}>
              <Spin />
            </div>
          )}

          {props.deleteUser_result && (
            <ModalComponent type="info" data={props.deleteUser_result}/>
          )}

          { props.deleteUser_error && props.deleteUser_error.message && (
              <ModalComponent type="error" data={props.deleteUser_error.message}/>
              
          )}
          

        </div>

    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteUser_inProgress: deleteUser_inProgress(),
  deleteUser_error: deleteUser_error(),
  deleteUser_result: deleteUser_result(),
});

const mapDispatchToProps = (dispatch) => ({
  doDeleteUser: (payload) => {
      dispatch(doDeleteUser(payload));
},

doGetUsers: () => {
  dispatch(doGetUsers());
},

});

export default connect(mapStateToProps, mapDispatchToProps)(Post);