
import React from 'react';
import './ToolTip.css';
const ToolTip = ({data, surname, pwword, reactingle}) => {
  
  return (
    <div>
     
        <div className={`tooltip-box ${surname ? "surnameTooltip": ""} ${pwword ? "pwordAndPhone" : ""}`}>
        <div className={`divider1 ${reactingle ? "divider2" : "" }`}></div>
             <div className="tooltip_wrapper">
              <div className="tooltip_content">
                <p>{data}</p>
             </div>
            </div>
           </div>
    </div>
    
  )
}

export default ToolTip
