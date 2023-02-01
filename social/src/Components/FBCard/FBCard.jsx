
import React from 'react'
import './FBCard.css'
const FBCard = ({children}) => {
  return (
    <div className='fb-card'>
        <div className="card-wrapper">
        {children}
        </div>
    </div>
  )
}

export default FBCard;