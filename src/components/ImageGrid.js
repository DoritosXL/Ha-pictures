import React from "react"
import useFireStore from "../hooks/useFireStore"

const ImageGrid = ({user, setSelectedImg}) => {
  const { docs } = useFireStore(`${user}`)

  return (
    <div className="images">
      {docs &&
        docs.map((doc) => (
          <div
            className="image"
            key={doc.id}
            onClick={() => window.open(doc.url, "_blank")}
          >
            <img src={doc.url} alt="Firebase_image"/>
          </div>
        ))}
    </div>
  )
}

export default ImageGrid
