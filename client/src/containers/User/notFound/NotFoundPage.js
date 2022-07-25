import React from 'react'
import "./NotFoundPage.css"
import {Link} from "react-router-dom"
import { Button } from "antd";

const NotFoundPage = () => {
  return (
    <>
      <div className="paper">

        <div id="notfound">
          <div className="notfound">
              <div className="notfound-404">
                  <h3>Oops! Posts not found</h3>
                  <h1><span>4</span><span>0</span><span>4</span></h1>
              </div>
              <h2>we are sorry, but the posts you requested were not found</h2>
              <a href='/' className="link">
                <Button type="primary" size='large'> Reload!! </Button>
              </a>
              
          </div>

          

        </div>

      </div>
        
    </>
  )
}

export default NotFoundPage


