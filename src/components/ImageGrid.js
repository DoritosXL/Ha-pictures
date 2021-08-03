import React from "react"
import useFireStore from "../hooks/useFireStore"

const ImageGrid = ({ user, setSelectedImg }) => {
  const { docs } = useFireStore(`${user}`)

  const returnImage = (doc) => {
    if (doc === docs[0] || doc === docs[1] || doc === docs[2]) {
      // console.log(`eager loading: ${doc.url}`)
      return <img src={doc.url} alt="Firebase_image" loading="eager" />
    } else {
      // console.log(`lazy loading: ${doc.url}`)
      return <img src={doc.url} alt="Firebase_image" loading="lazy" />
    }
  }

  const returnData = (doc) => {
    return (
      <>
        <p>SS: {typeof(doc.ShutterSpeedValue) === 'number' ? doc.ShutterSpeedValue.toFixed(2) : doc.ShutterSpeedValue}</p>
        <p className="align_right">A: {typeof(doc.realApertureValue) === 'number' ? doc.realApertureValue.toFixed(2) : doc.realApertureValue}</p>
        <p>ISO: {doc.ISOSpeedRatings}</p>
        <p className="align_right">FL: {doc.realFocalLength}</p>
      </>
    )
  }

  return (
    <div className="images">
      {docs &&
        docs.map((doc) => (
          <div key={doc.id}>
            <div
              className="image"
              onClick={() => window.open(doc.url, "_blank")}
            >
              {returnImage(doc)}
            </div>

            <div className="image_metadata">{returnData(doc)}</div>
          </div>
        ))}
    </div>
  )
}

export default ImageGrid
