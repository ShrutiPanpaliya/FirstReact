import React from 'react';

import './Navbar.css'

function Navbar () {

  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <a href="/Chat" className="navbar-item">Chat</a>
      <a href="/Status" className="navbar-item">Status</a>
      <a href="/Call" className="navbar-item">Call</a>
  </section>
  )

}

export default Navbar;