import React from 'react'

const Enhance = ({ setSelectedImg, selectedImg })  => {

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }

  return(
    <div className="backdrop" onClick={handleClick}>
      <img src={selectedImg} alt="Enhanced_image"/>
    </div>
  )
}

export default Enhance;