import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <div>
      <footer className="bg-dark text-center text-lg-start">
        <div className="footercolor text-center p-3 text-white-50">
          © 2022 Copyright:
          <a className="text-white-50" href="#">
            Pre-PAES
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
