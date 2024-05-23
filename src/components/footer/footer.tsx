"use client";
import { useMedia } from "react-use";
import FooterDesktop from "./footer-desktop";
import FooterMobile from "./footer-mobile";

const Footer = () => {
  const isMobile = useMedia("(max-width: 1000px)", false);

  if (isMobile) {
    return <FooterMobile />;
  }

  return <FooterDesktop />;
};

export default Footer;
