import React  from 'react';
import { Card,Avatar,Collapse,Button,Tooltip,Modal, notification} from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
    deleteUser_inProgress,
    deleteUser_result,
    deleteUser_error
} from "../../selectors/userSelector";
import {doGetUsers,doUpdateUser,doDeleteUser} from "../../actions/userAction"
import "./post.css";

const { Panel } = Collapse;
const { Meta } = Card;
const { confirm } = Modal;

const Post = (props) => {

  const {setPostData,setVisible} = props;

  const getNotification = () => {
    notification["success"](
      {
        message: 'User Deleted Successfully',
        placement:"bottom"
      }
    )
  }

  const getNotificationFailed = (msg) => {
    notification["error"](
      {
        message: msg,
        placement:"bottom"
      }
    )
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this User?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
  
      onOk() {
        props.doDeleteUser({ id: props.user._id },{getNotification,getNotificationFailed})
  
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClickDelete = () => {
    showDeleteConfirm()
  } 

  const onClickUpdate = () => {
    
    setVisible(true)
    setPostData(props.user)
  }

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
            <p> <b>Email : </b> {props.user.userEmail} </p>
          </Panel>
        </Collapse>

        <div style={{marginTop:"20px",display:"flex",alignItems:"center",gap:"10px"}}>

          <Tooltip title="Delete">
            <Button onClick={onClickDelete} shape="circle" icon={<DeleteOutlined/>} />
          </Tooltip>

          <Tooltip title="Update">
            <Button onClick={onClickUpdate} shape="circle" icon={<EditOutlined />} />
          </Tooltip>

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

  doDeleteUser: (payload,callback) => {
      dispatch(doDeleteUser(payload,callback));
  },

  doGetUsers: () => {
    dispatch(doGetUsers());
  },

  doUpdateUser: (payload) => {
    dispatch(doUpdateUser(payload));
  },


});

export default connect(mapStateToProps, mapDispatchToProps)(Post);