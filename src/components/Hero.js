import React from "react";
import hero from "../images/hero.png";
import "../stylesheets/components/_hero.scss";

const Hero = () => {
  return (
    <section className="hero">
      <img
        className="hero__image"
        src={hero}
        title="List of movies"
        alt="List of movies"
      />
    </section>
  );
};

export default Hero;
