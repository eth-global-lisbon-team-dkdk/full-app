import React from "react";
import safeLogo from '../../images/safe.png'; // Tell Webpack this JS file uses this image
import polygonLogo from '../../images/polygon.png'; // Tell Webpack this JS file uses this image

export default function Footer() {

  return (
    <footer>
      <p className="footerItem" >Powered by</p>
      <img src={safeLogo} alt="Safe" className="footerItem" width="41.54" height="12" />
      <img src={polygonLogo} alt="Polygon" className="footerItem" width="68.04" height="24" />
    </footer>
  );
}