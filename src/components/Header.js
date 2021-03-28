import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/layout/_header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" title="Go to home">
        <img
          className="header__logo"
          src="https://fontmeme.com/permalink/200909/84165089e106b0066fa661862435c23b.png"
          title="Codeflix logo"
          alt="Codeflix logo"
        />
      </Link>
      <h2 className="header__claim">Movies, Tv shows & chill!</h2>
    </header>
  );
};

export default Header;
