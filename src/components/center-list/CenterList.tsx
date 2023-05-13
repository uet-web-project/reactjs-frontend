import React from 'react'
import "./styles.css"
import CenterInformation from '../center-information/CenterInformation'

function CenterList() {
  return (
    <div className="center-list-container">
        <div className="secondary-font center-list-header">Centers under this department</div>
        <CenterInformation/>
    </div>
  )
}

export default CenterList