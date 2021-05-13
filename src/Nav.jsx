import React, { useEffect, useState } from "react";
import netflixLogo from "./images/netflix.png";
import logo from "./images/logo.png";
import "./Nav.css";

const Nav = () => {

    const [show, handleShow] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
          if(window.scrollY > 100 ) {
              handleShow(true)
          } else {
              handleShow(false)
          }
      })
        return(window.removeEventListener("scroll", null));
    }, [])

    return(
        <>
        <div className={`logos ${show && "bg-black"} `}>
            <img className="netflix" src={netflixLogo} alt="netflix-logo"/>
            <img className="logo" src={logo} alt="logo" />
        </div>
        </>
    )
}

export default Nav;