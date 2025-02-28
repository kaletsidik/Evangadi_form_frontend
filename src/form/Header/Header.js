import Logo from "../img/evangadi_cover.jpg";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={classes.header_container}>
      <div className={classes.header}>
        <div className={classes.logo}>
          <img src={Logo} alt="Evangadi logo" />
        </div>
        <div className={classes.nav_links}>
          <Link to="/">Home</Link>
          <Link t="#">How it works</Link>
          <Link to="/login">SIGN IN </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
