import React from 'react'

const Notification = ({message}) => {
    if (message === null) {
      return null
    }
    return ( 
      <div className="success">{message}</div>
    )
  }
  
  const ErrorNotification = ({message}) => {
    if (message === null) {
      return null
    }
    return ( 
      <div className="error">{message}</div>
    )
  }

export default {Notification, ErrorNotification}