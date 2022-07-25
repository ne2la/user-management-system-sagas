import React,{useEffect, useState} from 'react'
import {DatePicker,Button,Avatar,Typography,Modal} from "antd";
import 'antd/dist/antd.css';
import "./home.css"
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import Posts from '../posts/Posts';
import FormAddUser from '../form/FormAddUser';
import NavBar from '../../../components/navbar/NavBar';
import {doGetUsers,doGetUsersFailed} from "../actions/getUsersAction"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    getUsers_inProgress,
    getUsers_allUsers,
    getUsers_error
} from "../selectors/getUsersSelector";

const { Title, Paragraph, Text, Link } = Typography;

const Home = (props) => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const showModal = () => {
    // doGetUsers();
    setVisible(true);
    
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  // props.doGetUsers();

  useEffect(() => {

    props.doGetUsers();
    

  }, []) // Call dogetUsers => Delete,add,update

  const allUsers = props.getUsers_allUsers && props.getUsers_allUsers;
  // console.log("!!!!",allUsers)
  
  return (
    <>
    <NavBar/>
    <section className='sec1'>

    <div className='header'>
      
      <Typography>
        <Title strong={true} level={2} style={{color:'#3498db'}}> User Management </Title>
      </Typography>

      <Button onClick={showModal} type="primary" ghost shape="round" icon={<PlusOutlined />}> Add User </Button>

      <Modal
        title="Add a new User"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <FormAddUser/>
      </Modal>

    </div>

    <div className='sec2'>
      <Posts allUsers={allUsers}/>
    </div>

    </section>
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

  // doForgotPasswordFailed: (payload) => {
  //     dispatch(doForgotPasswordFailed(payload));
  // },

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);