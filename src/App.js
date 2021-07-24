import "./App.css"
import React, { useState, useEffect } from "react"
import firebase from "firebase"
import { Helmet } from "react-helmet"

import Button from "@material-ui/core/Button"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"

import UploadForm from "./components/UploadForm"
import ImageGrid from "./components/ImageGrid"
import Enhance from "./components/Enhance"

import logo from "./icons/logo.png"

function App() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [user, setUser] = useState({})

  const onLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // console.log(`login successful!`)
      })
      .catch(function (error) {
        console.log(`Something went wrong...`)
        console.log(error)
      })
  }

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log(`sign out successful`)
        setUser({})
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const isEmpty = (obj) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false
      }
    }
    return JSON.stringify(obj) === JSON.stringify({})
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log(`user signed in: `, user.displayName)
        setUser(user)
      } else {
        // console.log(`nobody has signed in yet...`)
      }
    })
  }, [])

  return (
    <div className="App">
      <Helmet>
        <title>Ha-pictures - Hakan Taskirmaz</title>
        <meta
          name="description"
          content="Ha-pictures. An app to upload pictures and view pictures."
        />
      </Helmet>
      {!isEmpty(user) ? (
        <div>
          <div className="header">
            <a href="#default" className="logo">
              <img className="logo_img" src={logo} alt="logo" />
            </a>
            <div className="header-right">
              <Button onClick={onLogout} color="secondary">
                <MeetingRoomIcon fontSize="large" />
              </Button>
            </div>
          </div>

          <div className="body">
            <UploadForm user={user.displayName} />
            <ImageGrid
              user={user.displayName}
              setSelectedImg={setSelectedImg}
            />
            {selectedImg && (
              <Enhance
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="sign_in">
          <Button onClick={onLogin} variant="contained">
            Login with google
          </Button>
        </div>
      )}
    </div>
  )
}

export default App
