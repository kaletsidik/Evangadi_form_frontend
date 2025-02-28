import React from "react";
import classes from "./home.module.css";

const Home = () => {
  return (
    <div className={classes.home_container}>
      <h1 className={classes.about}>About</h1>
      <h1 className={classes.title}>Evangadi Networks</h1>
      <p className={classes.description}>
        No matter what stage of life you are in, whether you're just starting
        elementary school or being promoted to CEO of a Fortune 500 company, you
        have much to offer to those who are trying to follow in your footsteps.
      </p>
      <p className={classes.description}>
        Whether you are willing to share your knowledge or you are just looking
        to meet mentors of your own, please start by joining the network here.
      </p>
      <button className={classes.cta_button}>HOW IT WORKS</button>
    </div>
  );
};

export default Home;
