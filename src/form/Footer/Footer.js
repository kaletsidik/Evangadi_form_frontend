import React from "react";
import classes from "./footer.module.css";
import Logo from "../img/evangadi.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_container}>
        {/* Left Section: Logo */}
        <div className={classes.footer_logo}>
          <div className={classes.logo_image}>
            <img src={Logo} alt="Evangadi logo" />
          </div>
          <div className={classes.social_icons}>
            <a href="#" aria-label="Facebook" className={classes.social_link}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram" className={classes.social_link}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube" className={classes.social_link}>
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        {/* Middle Section: Useful Links */}
        <div className={classes.footer_links}>
          <h3 className={classes.section_title}>Useful Link</h3>
          <ul className={classes.links_list}>
            <li>
              <a href="#" className={classes.link}>
                How it works
              </a>
            </li>
            <li>
              <a href="#" className={classes.link}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className={classes.link}>
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
        {/* Right Section: Contact Info */}
        <div className={classes.footer_contact}>
          <h3 className={classes.section_title}>Contact Info</h3>
          <div className={classes.contact_text}>
            <p className={classes.contact_text}>Evangadi Networks</p>
            <p>
              <a
                href="mailto:support@evangadi.com"
                className={classes.contact_link}
              >
                support@evangadi.com
              </a>
            </p>
            <p className={classes.contact_text}>+1-202-386-2702</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
