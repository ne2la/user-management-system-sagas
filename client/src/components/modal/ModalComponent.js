import React from 'react'
import { Modal } from 'antd';

const ModalComponent = ({type,data}) => {

    const errorModal = () => {
        Modal.error({
        title: 'Error',
        content: (
            <div> 
            <p> {data} </p>
            </div>
        ),

        onOk() {},
        });
    };

    const infoModal = () => {
        Modal.info({
            title: 'Notification',
            content: (
            <div>
                <p>{data}</p>
            </div>
            ),
    
            onOk() {},
        });
    }; 

    if(type === "error"){
        errorModal();
    }else{
        infoModal();
    }
  
     

    
    
  
}

export default ModalComponent