import {useState, useEffect} from 'react'
import { firebaseStorage, firebaseFirestore, timestamp } from '../firebase/config'

const useStorage = (file, user) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)  

  useEffect( () => {
    const storageReference = firebaseStorage.ref(`${user}/${file.name}`)
    const collectionReference = firebaseFirestore.collection(`${user}`)

    storageReference.put(file).on('state_changed', 
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage)      
      },
      (error) => {
        setError(error)
      },
      async () => {
        const url = await storageReference.getDownloadURL();
        const createdAt = timestamp()
        collectionReference.add({url, createdAt})
        setUrl(url)
      }
    )
  }, [file, user])

  return {progress, url, error}
}

export default useStorage