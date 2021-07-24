import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'

import CircularProgress from '@material-ui/core/CircularProgress';

const ProgressBar = ({file, setFile, user}) => {
  const {url, progress} = useStorage(file, user)

  useEffect(()=>{
    if(url){
      setFile(null)
    }
  }, [url, setFile])

  return(
    <div className="progress-bar">
      <CircularProgress variant="determinate" value={progress} />
    </div>
  )
}

export default ProgressBar