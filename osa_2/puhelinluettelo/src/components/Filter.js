import React from 'react'

const FilterForm = ({handle_filter}) => {
    return(
    <div>
      filter shown with<input
      onChange={handle_filter}/>
    </div>
    )
  }

export default {FilterForm}