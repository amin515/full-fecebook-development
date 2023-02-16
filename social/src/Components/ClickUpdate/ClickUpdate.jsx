
import React from 'react';
import './ClickUpdate.css';
const ClickUpdate = ({save, hide, data, data2}) => {
  return (
    <><div className="quick-change">

       <textarea name="" placeholder={data.placeholder} onChange={(e) => data.setData(e.target.value)}>
      {data.data}
    </textarea>
    {data2 && <textarea name="" placeholder={data2.placeholder} onChange={(e) => data2.setData(e.target.value)}>
      {data2.data}
    </textarea>} 
    
    
    <div className="quick-change-content">
        <div style={{backgroundImage : `url('https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/HgfBXTEArfp.png')`}} className="bio-status"><span>Public</span></div>
        <div className="bio-btn">
            <button onClick={() => hide(false)}>Cancel</button>
            <button className='active-save-btn' onClick={save}>Save</button>
        </div>
    </div>
</div></>
  )
}

export default ClickUpdate;