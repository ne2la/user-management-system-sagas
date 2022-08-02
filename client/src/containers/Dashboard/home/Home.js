import React,{useState} from 'react'
import {Button,Typography,Modal,Form, Alert, notification} from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import {doGetUsers,doAddUser,doAddUserFailed,doUpdateUser} from "../actions/userAction"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    getUsers_inProgress,
    getUsers_allUsers,
    getUsers_error,
    deleteUser_result,
    deleteUser_error,
    addUser_error,
    addUser_inProgress,
    addUser_result,
} from "../selectors/userSelector";
import Posts from './posts/Posts';
import NavBar from '../../../components/navbar/NavBar';
import FormUser from './form/FormUser';
import "./home.css"

const { Title } = Typography;

const Home = (props) => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const showModal = () => {
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
    setVisible(false);
  };

  const [postData,setPostData] = useState(null)

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
          footer={null}
        >
          <FormUser postData={postData} setPostData={setPostData} setVisible={setVisible}/>
  
        </Modal>

      </div>

      <div className='sec2'>

        <Posts postData={postData} setPostData={setPostData} setVisible={setVisible}/>
      
      </div>

    </section>
    </>
    
  )
}

const mapStateToProps = createStructuredSelector({
  getUsers_inProgress: getUsers_inProgress(),
  getUsers_error: getUsers_error(),
  getUsers_allUsers: getUsers_allUsers(),
  deleteUser_result: deleteUser_result(),
  deleteUser_error: deleteUser_error(),
  addUser_inProgress: addUser_inProgress(),
  addUser_error: addUser_error(),
  addUser_result: addUser_result(),
});

const mapDispatchToProps = (dispatch) => ({
  doGetUsers: () => {
      dispatch(doGetUsers());
},

doAddUser: (payload,callback) => {
  dispatch(doAddUser(payload,callback));
},

doAddUserFailed: (payload) => {
  dispatch(doAddUserFailed(payload));
},

doUpdateUser: (payload,callback) => {
  dispatch(doUpdateUser(payload,callback));
}

});

export default connect(mapStateToProps,mapDispatchToProps)(Home);