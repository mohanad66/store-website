import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router'
import { CiHome ,CiShoppingCart } from "react-icons/ci";
import "./Navbar.css"

export default function Navbar({count=0}) {
  const location = useLocation()
  const [active,setActive] = useState("")
  return (
    <div className='navbar'>
      <ul>
        <Link className={location.pathname === "/" ? "a active" : "a"} to="/"><CiHome />&nbsp; Home</Link>
        <Link className={location.pathname === "/cart" ? "a active" : "a"} to="/cart"><CiShoppingCart />&nbsp; Cart &nbsp;<small>{count >99 ? "99+" : count}</small></Link>
      </ul>
    </div>
  )
}

