import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CameraEnhanceIcon from '@material-ui/icons/CameraEnhance';

const UploadForm = ({user}) => {

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null)

  const types = ['image/png', 'image/jpeg']

  const changeHandler = (event) => {
    let selectedFile = event.target.files[0]
    if(selectedFile && types.includes(selectedFile.type)){
      setFile(selectedFile)
      setError("")
    }else{
      setFile(null)
      setError('Please select an image of type: PNG or JPEG')
    }    
  }

  return(
    <form>
      <label>
      <input type="file" onChange={changeHandler} hidden></input>
        <CameraEnhanceIcon style={{ fontSize: 50, cursor: 'pointer' }}/>
      </label>
      <div>
        {error && <div className="error">{error}</div>}
        {file&& <div className="file">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} user={user}/>}
      </div>
    </form>
  )
}

export default UploadForm;