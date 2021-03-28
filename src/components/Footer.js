import React from "react";
import "../stylesheets/layout/_footer.scss";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <a
        className="footer__small"
        href="https://anaguerraabaroa.github.io/Codeflix/"
        title="Link to Codeflix Team website"
        target="_blank"
        rel="noreferrer"
      >
        <small className="footer__small--copy">@2020 Ana Guerra Abaroa</small>
      </a>
      <nav className="footer__menu" role="navigation">
        <ul className="footer__menu--logos">
          <li className="logo">
            <a
              href="https://github.com/anaguerraabaroa"
              title="Link to Ana Guerra Abaroa github"
              target="_blank"
              className="github"
              rel="noreferrer"
            >
              <i className="fab fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li className="logo">
            <a
              href="https://www.linkedin.com/in/anaguerraabaroa/"
              title="Link to Ana Guerra Abaroa linkedin"
              target="_blank"
              className="linkedin"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
          </li>
          <li className="log">
            <a
              href="https://twitter.com/anaguerraabaroa"
              title="Link to Ana Guerra Abaroa twitter"
              target="_blank"
              className="twitter"
              rel="noreferrer"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
