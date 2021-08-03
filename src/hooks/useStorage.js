import { useState, useEffect } from "react"
import {
  firebaseStorage,
  firebaseFirestore,
  timestamp
} from "../firebase/config"
import EXIF from "exif-js"

let Model
let ShutterSpeedValue
let ApertureValue
let realApertureValue
let ISOSpeedRatings
let WhiteBalance
let DateTimeOriginal
let FocalLength
let realFocalLength

const useStorage = (file, user) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const storageReference = firebaseStorage.ref(`${user}/${file.name}`)
    const collectionReference = firebaseFirestore.collection(`${user}`)

    storageReference.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        setProgress(percentage)
      },
      (error) => {
        setError(error)
      },
      async () => {
        const url = await storageReference.getDownloadURL()
        const createdAt = timestamp()
        EXIF.getData(file, function () {
          try {
            Model = EXIF.getTag(this, "Model")
            ShutterSpeedValue = EXIF.getTag(this, "ShutterSpeedValue")
            ApertureValue = EXIF.getTag(this, "ApertureValue")
            realApertureValue =
              ApertureValue.numerator / ApertureValue.denominator
            ISOSpeedRatings = EXIF.getTag(this, "ISOSpeedRatings")
            WhiteBalance = EXIF.getTag(this, "WhiteBalance")
            DateTimeOriginal = EXIF.getTag(this, "DateTimeOriginal")
            FocalLength = EXIF.getTag(this, "FocalLength")
            realFocalLength = FocalLength.numerator / FocalLength.denominator
          } catch (e) {
            console.log(
              `No metadata found in image: ${file.name}. referring to NA data`
            )
            Model = "NA"
            ShutterSpeedValue = "NA"
            ApertureValue = "NA"
            realApertureValue = "NA"
            ISOSpeedRatings = "NA"
            WhiteBalance = "NA"
            DateTimeOriginal = "NA"
            FocalLength = "NA"
            realFocalLength = "NA"
          }

          var exifData = EXIF.getAllTags(this)
          if (exifData) {
            console.log(
              `exifData:`, +
              url,
              createdAt,
              Model,
              ShutterSpeedValue,
              realApertureValue,
              ISOSpeedRatings,
              WhiteBalance,
              DateTimeOriginal,
              realFocalLength
            )
            collectionReference.add({
              url,
              createdAt,
              Model,
              ShutterSpeedValue,
              realApertureValue,
              ISOSpeedRatings,
              WhiteBalance,
              DateTimeOriginal,
              realFocalLength
            })
          } else {
            console.log("No EXIF data found in image '" + file.name + "'.")
          }
        })

        setUrl(url)
      }
    )
  }, [file, user])

  return { progress, url, error }
}

export default useStorage
