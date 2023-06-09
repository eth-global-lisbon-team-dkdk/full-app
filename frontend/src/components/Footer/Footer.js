import React from "react";
import safeLogo from '../../images/safe.png';
import polygonLogo from '../../images/polygon.png';
import uniswapLogo from '../../images/uniswap.png';

export default function Footer() {

  return (
    <footer>
      <p className="footerItem" >Powered by</p>
      <img src={safeLogo} alt="Safe" className="footerItem" width="41.54" height="12" />
      <img src={uniswapLogo} alt="Uniswap" className="footerItem" width="55.04" height="30" />
      <img src={polygonLogo} alt="Polygon" className="footerItem" width="68.04" height="24" />
    </footer>
  );
}