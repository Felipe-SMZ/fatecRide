import React from 'react';
import './Header.css';
import logo from '../../assets/images/Logo.png';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="app-title">FatecRide</h1>
      </div>
    </header>
  );
};

export default Header;
