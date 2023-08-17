import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer>
      <p>Copyright © {date}</p>
    </footer>
  );
};

export default Footer;
