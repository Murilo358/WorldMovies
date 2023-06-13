import { useState } from "react";
import Logo from "../assets/Logo.png";
import { NavHashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import "../Css/Navbar.css";

function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const toggleNavbar = () => setCollapsed(!collapsed);

  const scrollWithOffset = (el) => {
    const offset = 150;
    const elementPosition = el.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };
  const scrollWithOffsetPages = (el) => {
    const offset = -200;
    const elementPosition = el.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar fixed="top" dark className="navbar__container">
        <NavbarBrand href="/" className="me-auto Navbar__logo">
          <img src={Logo} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/Watchlist">Sua WatchList</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <NavHashLink
                  className="navLink"
                  to="/#popular"
                  scroll={
                    location.pathname !== "/"
                      ? scrollWithOffsetPages
                      : scrollWithOffset
                  }
                >
                  Popular
                </NavHashLink>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <NavHashLink
                  className="navLink"
                  to="/#nowPlaying"
                  scroll={
                    location.pathname !== "/"
                      ? scrollWithOffsetPages
                      : scrollWithOffset
                  }
                >
                  Em cartaz
                </NavHashLink>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <NavHashLink
                  className="navLink"
                  to="/#topRated"
                  scroll={
                    location.pathname !== "/"
                      ? scrollWithOffsetPages
                      : scrollWithOffset
                  }
                >
                  Mais bem avaliados
                </NavHashLink>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <NavHashLink
                  className="navLink"
                  to="/#aboutUs"
                  scroll={
                    location.pathname !== "/"
                      ? scrollWithOffsetPages
                      : scrollWithOffset
                  }
                >
                  Sobre nós
                </NavHashLink>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
