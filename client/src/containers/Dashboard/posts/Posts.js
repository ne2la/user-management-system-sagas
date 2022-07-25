import React from 'react'
import Post from '../post/Post'
import { Col, Row } from 'antd';

const Posts = ({allUsers = []}) => {
  
  console.log("????",allUsers)

  return (

    <Row gutter={[12,36]} justify="left">

      {allUsers.length && allUsers.map((user) => (

        <Col span={6} key={user._id}> 
          <Post user={user}/>
        </Col>

      ))}

      

    </Row>
  )
}

export default Posts

