import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../router";

const Navbar = () => (
  <header className="navbar">
    <div className="navbar__title navbar__item">To Do</div>
    <div className="navbar__item">
      <Link to={routes.about} style={{ textDecoration: "none" }}>
        About Us
      </Link>
    </div>
    <div className="navbar__item">Contact</div>
    <div className="navbar__item">Help</div>
  </header>
);

export default Navbar;
