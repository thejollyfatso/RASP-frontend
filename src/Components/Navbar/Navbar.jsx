import React from 'react';
import { Link } from 'react-router-dom'

const PAGES = [
  { label: 'Home', destination: '/'},
  { label: 'Games', destination: '/games'},
  { label: 'Users', destination: '/users'},
]

function Navbar() {

  const mapper = (page) => (
    <li><Link to={page.destination}><button>{page.label}</button></Link></li>
  );

  return (
    <nav>
      <ul className="wrapper">
        {PAGES.map(mapper)}
      </ul>
    </nav>
  )
}

export default Navbar;
