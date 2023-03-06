import PropTypes from 'prop-types';
import React, { useState } from "react";
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Images
import logodark from "../../../../assets/images/logo-dark.png";
import logolight from "../../../../assets/images/logo-light.png";

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "features", navheading: "Features" },
  { id: 3, idnm: "roadmap", navheading: "Roadmap" },
  { id: 4, idnm: "team", navheading: "Team" },
  { id: 5, idnm: "news", navheading: "News" },
  { id: 6, idnm: "faqs", navheading: "FAQs" },
];

const Navbar_Page = props => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map(item => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <nav
        className={"navbar navbar-expand-lg navigation fixed-top sticky " + props.navClass}
      >
        <Container>
          <Link className="navbar-logo" to="/">
            {props.imglight !== true ? (
          <h2 className="text-black fw-semibold hero-title mt-2">ChatGPT</h2>
            ) : (
              <h2 className="text-white fw-semibold hero-title mt-2">ChatGPT</h2>
            )}
          </Link>

          <NavbarToggler
            className="p-1"
            onClick={() => {
              setisOpenMenu();
            }}
          >
            <i className="fa fa-fw fa-bars" />
          </NavbarToggler>

         
        </Container>
      </nav>
    </React.Fragment>
  );
};

Navbar_Page.propTypes = {
  imglight: PropTypes.any,
  navClass: PropTypes.string
};

export default Navbar_Page;
