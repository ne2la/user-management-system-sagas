import React,{useState} from 'react'
import {Button,Typography,Modal,Form} from "antd";
import PlusOutlined from "@ant-design/icons/PlusOutlined"
import {doGetUsers} from "../actions/userAction"
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    getUsers_inProgress,
    getUsers_allUsers,
    getUsers_error,
    deleteUser_result,
    deleteUser_error,
} from "../selectors/userSelector";
import Posts from './posts/Posts';
import FormAddUser from './form/FormAddUser';
import NavBar from '../../../components/navbar/NavBar';
import "./home.css"

const { Title } = Typography;

const Home = () => {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [postData,setPostData] = useState({
    userName:'',userEmail:'',occupation:'',NIC:''
    ,userImage:''
  })

  const [form] = Form.useForm();
  
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
    form.resetFields();
    setVisible(false);
  };

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
          <FormAddUser postData={postData} setPostData={setPostData} setVisible={setVisible} form={form}/>
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
  deleteUser_error: deleteUser_error()
});

const mapDispatchToProps = (dispatch) => ({
  doGetUsers: () => {
      dispatch(doGetUsers());
},

});

export default connect(mapStateToProps,mapDispatchToProps)(Home);