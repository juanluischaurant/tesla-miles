import React from 'react'
import './Navbar.css'
import logoUrl from '../../assets/logo.svg'
const Navbar = () => {
  return (
    <div className='navbar-container'>
      <img src={logoUrl} alt="tesla logo" />
    </div>
  )
}

export default Navbar
