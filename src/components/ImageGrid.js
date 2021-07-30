import React from "react"
import useFireStore from "../hooks/useFireStore"

const ImageGrid = ({ user, setSelectedImg }) => {
  const { docs } = useFireStore(`${user}`)

  const returnImage = (doc) => {
    // const targets = document.querySelectorAll("img")

    // const lazyLoad = (target) => {
    //   const io = new IntersectionObserver((entries, observer) => {
    //     entries.forEach((entry) => {
    //       console.log(`something happend`)

    //       if (entry.isIntersecting) {
    //         const img = entry.target
    //         const src = img.getAttribute("data-lazy")

    //         img.setAttribute("src", src)
    //         img.classList.add()

    //         observer.disconnect()
    //       }
    //     })
    //   })
    //   io.observe(target)
    // }

    // targets.forEach(lazyLoad)

    // window.addEventListener('scroll', (event) => {
    //   targets.forEach(img => {
    //     console.log(`something happend`)
    //     const rect = img.getBoundingClientRect().top;
    //     if(rect <= window.innerHeight){
    //       const src = img.getAttribute('src');
    //       img.setAttribute('src', src);
    //       img.classList.add()
    //     }
    //   })
    // })

    // if(!doc.url){
    //   console.log(`loading`)
    //   return <div>loading</div>
    // }else{
      if (doc === docs[0] || doc === docs[1] || doc === docs[2]) {
        // console.log(`eager loading: ${doc.url}`)
          return <img src={doc.url} alt="Firebase_image" loading="eager" />
        
      } else {
        // console.log(`lazy loading: ${doc.url}`)
          return <img src={doc.url} alt="Firebase_image" loading="lazy" />
      }
    // }
    
  }

  return (
    <div className="images">
      {docs &&
        docs.map((doc) => (
          <div
            className="image"
            key={doc.id}
            onClick={() => window.open(doc.url, "_blank")}
          >
            {returnImage(doc)}
          </div>
        ))}
    </div>
  )
}

export default ImageGrid
